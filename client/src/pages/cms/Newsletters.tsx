import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Mail,
  Plus,
  Send,
  Clock,
  FileText,
  Sparkles,
  Eye,
  Trash2,
  Copy,
  MoreHorizontal,
  Users,
  MousePointerClick,
  MailOpen,
  Loader2,
  Calendar,
  RefreshCw,
  CheckSquare,
  Mic,
  MicOff,
  Square,
} from "lucide-react";

// Zonas horarias
const TIMEZONES = {
  houston: { name: "Houston (CST)", offset: "America/Chicago" },
  mexico: { name: "Ciudad de México (CST)", offset: "America/Mexico_City" },
  colombia: { name: "Bogotá (COT)", offset: "America/Bogota" },
};

// Función para formatear hora en zona horaria
function formatInTimezone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
    hour12: true,
  }).format(date);
}

export default function Newsletters() {
  const [activeTab, setActiveTab] = useState<"list" | "create" | "stats">("list");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);

  // Estado para creación con IA
  const [aiPrompt, setAiPrompt] = useState("");
  const [editInstructions, setEditInstructions] = useState("");
  const [generatedContent, setGeneratedContent] = useState<{
    subject: string;
    previewText: string;
    htmlContent: string;
    plainContent: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Estado para programación
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [selectedNewsletterId, setSelectedNewsletterId] = useState<number | null>(null);

  // Estado para grabación de voz
  const [isRecordingPrompt, setIsRecordingPrompt] = useState(false);
  const [isRecordingEdit, setIsRecordingEdit] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Queries
  const { data: newsletters, refetch: refetchNewsletters } = trpc.newsletters.list.useQuery();
  const { data: subscribers } = trpc.subscribers.list.useQuery();

  // Mutations
  const generateWithAI = trpc.newsletters.generateWithAI.useMutation({
    onSuccess: (data) => {
      setGeneratedContent(data);
      setIsGenerating(false);
      toast.success("Newsletter generado con IA");
    },
    onError: (error) => {
      setIsGenerating(false);
      toast.error(`Error: ${error.message}`);
    },
  });

  const saveNewsletter = trpc.newsletters.saveAIGenerated.useMutation({
    onSuccess: () => {
      toast.success("Newsletter guardado");
      refetchNewsletters();
      resetCreateForm();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const sendNewsletter = trpc.newsletters.send.useMutation({
    onSuccess: (data) => {
      toast.success(`Newsletter enviado a ${data.sent} suscriptores`);
      refetchNewsletters();
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const updateNewsletter = trpc.newsletters.update.useMutation({
    onSuccess: () => {
      toast.success("Newsletter actualizado");
      refetchNewsletters();
      setShowScheduleDialog(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const bulkDelete = trpc.newsletters.bulkDelete.useMutation({
    onSuccess: (data) => {
      toast.success(`${data.deleted} newsletters eliminados`);
      setSelectedIds([]);
      refetchNewsletters();
    },
  });

  const bulkDuplicate = trpc.newsletters.bulkDuplicate.useMutation({
    onSuccess: () => {
      toast.success("Newsletters duplicados");
      setSelectedIds([]);
      refetchNewsletters();
    },
  });

  const deleteNewsletter = trpc.newsletters.delete.useMutation({
    onSuccess: () => {
      toast.success("Newsletter eliminado");
      refetchNewsletters();
    },
  });

  // Voice mutations
  const uploadAudio = trpc.voice.uploadAudio.useMutation();
  const transcribeAudio = trpc.voice.transcribe.useMutation();

  // Voice recording functions
  const startRecording = async (target: 'prompt' | 'edit') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        stream.getTracks().forEach(track => track.stop());
        await processAudio(audioBlob, target);
      };

      mediaRecorder.start();
      if (target === 'prompt') {
        setIsRecordingPrompt(true);
      } else {
        setIsRecordingEdit(true);
      }
      toast.info("Grabando... Habla ahora");
    } catch (error) {
      toast.error("No se pudo acceder al micrófono");
      console.error(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecordingPrompt(false);
      setIsRecordingEdit(false);
    }
  };

  const processAudio = async (audioBlob: Blob, target: 'prompt' | 'edit') => {
    setIsTranscribing(true);
    try {
      // Convert blob to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
      });
      reader.readAsDataURL(audioBlob);
      const audioBase64 = await base64Promise;

      // Upload to S3
      const { url: audioUrl } = await uploadAudio.mutateAsync({
        audioBase64,
        mimeType: 'audio/webm',
      });

      // Transcribe
      const result = await transcribeAudio.mutateAsync({
        audioUrl,
        language: 'es',
        prompt: 'Transcribe el contenido para un newsletter de marketing',
      });

      // Update the appropriate field
      if (target === 'prompt') {
        setAiPrompt(prev => prev ? `${prev} ${result.text}` : result.text);
      } else {
        setEditInstructions(prev => prev ? `${prev} ${result.text}` : result.text);
      }
      toast.success("Transcripción completada");
    } catch (error) {
      toast.error("Error al transcribir el audio");
      console.error(error);
    } finally {
      setIsTranscribing(false);
    }
  };

  // Handlers
  const handleGenerateWithAI = () => {
    if (!aiPrompt.trim()) {
      toast.error("Por favor ingresa un prompt");
      return;
    }
    setIsGenerating(true);
    generateWithAI.mutate({
      prompt: aiPrompt,
      previousContent: generatedContent?.htmlContent,
      editInstructions: editInstructions || undefined,
    });
  };

  const handleRequestChanges = () => {
    if (!editInstructions.trim()) {
      toast.error("Por favor describe los cambios que deseas");
      return;
    }
    setIsGenerating(true);
    generateWithAI.mutate({
      prompt: aiPrompt,
      previousContent: generatedContent?.htmlContent,
      editInstructions,
    });
    setEditInstructions("");
  };

  const handleSaveAsDraft = () => {
    if (!generatedContent) return;
    saveNewsletter.mutate({
      subject: generatedContent.subject,
      previewText: generatedContent.previewText,
      content: generatedContent.plainContent,
      htmlContent: generatedContent.htmlContent,
      aiPrompt,
      status: "draft",
    });
  };

  const handleSendNow = () => {
    if (!generatedContent) return;
    saveNewsletter.mutate(
      {
        subject: generatedContent.subject,
        previewText: generatedContent.previewText,
        content: generatedContent.plainContent,
        htmlContent: generatedContent.htmlContent,
        aiPrompt,
        status: "draft",
      },
      {
        onSuccess: () => {
          refetchNewsletters().then((result) => {
            const latest = result.data?.[0];
            if (latest) {
              sendNewsletter.mutate({ id: latest.id });
            }
          });
        },
      }
    );
  };

  const handleSchedule = () => {
    if (!selectedNewsletterId || !scheduleDate || !scheduleTime) {
      toast.error("Por favor selecciona fecha y hora");
      return;
    }
    const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}:00`);
    updateNewsletter.mutate({
      id: selectedNewsletterId,
      status: "scheduled",
      scheduledAt,
    });
  };

  const resetCreateForm = () => {
    setAiPrompt("");
    setEditInstructions("");
    setGeneratedContent(null);
    setActiveTab("list");
  };

  const handleSelectAll = () => {
    if (selectedIds.length === newsletters?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(newsletters?.map((n) => n.id) || []);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Stats
  const activeSubscribers = subscribers?.filter((s) => s.isActive).length || 0;
  const totalNewsletters = newsletters?.length || 0;
  const sentNewsletters = newsletters?.filter((n) => n.status === "sent").length || 0;
  const draftNewsletters = newsletters?.filter((n) => n.status === "draft").length || 0;

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      draft: "bg-gray-100 text-gray-700",
      scheduled: "bg-blue-100 text-blue-700",
      sending: "bg-yellow-100 text-yellow-700",
      sent: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    const labels: Record<string, string> = {
      draft: "Borrador",
      scheduled: "Programado",
      sending: "Enviando",
      sent: "Enviado",
      cancelled: "Cancelado",
    };
    return <Badge className={styles[status] || ""}>{labels[status] || status}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletter con IA</h1>
          <p className="text-gray-600">Crea y gestiona campañas de email marketing con inteligencia artificial</p>
        </div>
        <Button onClick={() => setActiveTab("create")} className="bg-[#368A45] hover:bg-[#2D6E39]">
          <Plus className="w-4 h-4 mr-2" />
          Crear con IA
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalNewsletters}</p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{draftNewsletters}</p>
              <p className="text-sm text-gray-600">Borradores</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Send className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{sentNewsletters}</p>
              <p className="text-sm text-gray-600">Enviados</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{activeSubscribers}</p>
              <p className="text-sm text-gray-600">Suscriptores activos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-green-600" />
        <p className="text-green-700">
          <strong>Servicio de email activo:</strong> Los newsletters se envían desde newsletter@thetrucksavers.com a todos los suscriptores activos.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList>
          <TabsTrigger value="list">Lista de Campañas</TabsTrigger>
          <TabsTrigger value="create">Crear con IA</TabsTrigger>
          <TabsTrigger value="stats">Métricas</TabsTrigger>
        </TabsList>

        {/* Lista de Newsletters */}
        <TabsContent value="list" className="space-y-4">
          {selectedIds.length > 0 && (
            <div className="bg-gray-50 border rounded-lg p-3 flex items-center gap-4">
              <span className="text-sm text-gray-600">{selectedIds.length} seleccionados</span>
              <Button variant="outline" size="sm" onClick={() => bulkDuplicate.mutate({ ids: selectedIds })}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicar
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => {
                  if (confirm(`¿Eliminar ${selectedIds.length} newsletters?`)) {
                    bulkDelete.mutate({ ids: selectedIds });
                  }
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </Button>
            </div>
          )}

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.length === newsletters?.length && (newsletters?.length || 0) > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Asunto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-center">Enviados</TableHead>
                  <TableHead className="text-center">Aperturas</TableHead>
                  <TableHead className="text-center">Clics</TableHead>
                  <TableHead className="text-center">Tasa Apertura</TableHead>
                  <TableHead className="text-center">CTR</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newsletters?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-12">
                      <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">No hay newsletters creados</p>
                      <p className="text-gray-400 text-sm">Crea tu primera campaña con IA</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  newsletters?.map((newsletter) => {
                    const recipientCount = newsletter.recipientCount || 0;
                    const openRate = recipientCount > 0 ? ((newsletter.openCount || 0) / recipientCount * 100).toFixed(1) : "-";
                    const clickRate = recipientCount > 0 ? ((newsletter.clickCount || 0) / recipientCount * 100).toFixed(1) : "-";

                    return (
                      <TableRow key={newsletter.id}>
                        <TableCell>
                          <Checkbox checked={selectedIds.includes(newsletter.id)} onCheckedChange={() => handleSelectOne(newsletter.id)} />
                        </TableCell>
                        <TableCell className="font-medium max-w-xs truncate">{newsletter.subject}</TableCell>
                        <TableCell>{getStatusBadge(newsletter.status || 'draft')}</TableCell>
                        <TableCell className="text-center">{recipientCount}</TableCell>
                        <TableCell className="text-center">{newsletter.openCount || 0}</TableCell>
                        <TableCell className="text-center">{newsletter.clickCount || 0}</TableCell>
                        <TableCell className="text-center">{openRate !== "-" ? `${openRate}%` : "-"}</TableCell>
                        <TableCell className="text-center">{clickRate !== "-" ? `${clickRate}%` : "-"}</TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {newsletter.sentAt
                            ? new Date(newsletter.sentAt).toLocaleDateString("es-MX")
                            : newsletter.scheduledAt
                            ? `Prog: ${new Date(newsletter.scheduledAt).toLocaleDateString("es-MX")}`
                            : new Date(newsletter.createdAt).toLocaleDateString("es-MX")}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.info("Vista previa próximamente")}>
                                <Eye className="w-4 h-4 mr-2" />
                                Ver
                              </DropdownMenuItem>
                              {newsletter.status === "draft" && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedNewsletterId(newsletter.id);
                                      setShowScheduleDialog(true);
                                    }}
                                  >
                                    <Clock className="w-4 h-4 mr-2" />
                                    Programar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      if (confirm("¿Enviar este newsletter ahora?")) {
                                        sendNewsletter.mutate({ id: newsletter.id });
                                      }
                                    }}
                                  >
                                    <Send className="w-4 h-4 mr-2" />
                                    Enviar ahora
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem onClick={() => bulkDuplicate.mutate({ ids: [newsletter.id] })}>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => {
                                  if (confirm("¿Eliminar este newsletter?")) {
                                    deleteNewsletter.mutate({ id: newsletter.id });
                                  }
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Crear con IA */}
        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#368A45]" />
                  Genera tu Newsletter con IA
                </CardTitle>
                <CardDescription>
                  Describe el contenido que deseas y la IA creará un email profesional con el branding de The Truck Savers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">Describe tu newsletter</label>
                    <Button
                      type="button"
                      variant={isRecordingPrompt ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => isRecordingPrompt ? stopRecording() : startRecording('prompt')}
                      disabled={isTranscribing || isRecordingEdit}
                      className="flex items-center gap-2"
                    >
                      {isTranscribing ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Transcribiendo...</>
                      ) : isRecordingPrompt ? (
                        <><Square className="w-4 h-4" /> Detener</>
                      ) : (
                        <><Mic className="w-4 h-4" /> Dictar</>
                      )}
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Ejemplo: Crea un newsletter promocionando la inspección gratuita 'La Bailada' para camiones. Incluye un video de YouTube: https://youtube.com/watch?v=xxx. Agrega un botón de WhatsApp para agendar cita."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Puedes incluir en tu prompt:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Links de YouTube (se convertirán en thumbnails clicables)</li>
                    <li>• Solicitar imágenes generadas por IA</li>
                    <li>• Botones con links específicos</li>
                    <li>• Promociones, descuentos, servicios</li>
                  </ul>
                </div>

                <Button onClick={handleGenerateWithAI} disabled={isGenerating || !aiPrompt.trim()} className="w-full bg-[#368A45] hover:bg-[#2D6E39]">
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generar Newsletter
                    </>
                  )}
                </Button>

                {generatedContent && (
                  <div className="border-t pt-4 space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-medium text-gray-700">¿Quieres hacer cambios?</label>
                        <Button
                          type="button"
                          variant={isRecordingEdit ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => isRecordingEdit ? stopRecording() : startRecording('edit')}
                          disabled={isTranscribing || isRecordingPrompt}
                          className="flex items-center gap-2"
                        >
                          {isTranscribing ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Transcribiendo...</>
                          ) : isRecordingEdit ? (
                            <><Square className="w-4 h-4" /> Detener</>
                          ) : (
                            <><Mic className="w-4 h-4" /> Dictar</>
                          )}
                        </Button>
                      </div>
                      <Textarea
                        placeholder="Describe los cambios: 'Cambia el título', 'Agrega más información sobre...', 'Quita la imagen', etc."
                        value={editInstructions}
                        onChange={(e) => setEditInstructions(e.target.value)}
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                    <Button variant="outline" onClick={handleRequestChanges} disabled={isGenerating || !editInstructions.trim()} className="w-full">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Aplicar Cambios
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Previsualización
                </CardTitle>
                {generatedContent && (
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-gray-500">Asunto:</span>
                      <p className="font-medium">{generatedContent.subject}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Preview:</span>
                      <p className="text-sm text-gray-600">{generatedContent.previewText}</p>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {generatedContent ? (
                  <div className="border rounded-lg overflow-hidden bg-white">
                    <iframe srcDoc={generatedContent.htmlContent} className="w-full h-[500px]" title="Preview" />
                  </div>
                ) : (
                  <div className="h-[500px] flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed">
                    <div className="text-center">
                      <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">La previsualización aparecerá aquí</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {generatedContent && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    Se enviará a {activeSubscribers} suscriptores activos
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleSaveAsDraft}>
                      <FileText className="w-4 h-4 mr-2" />
                      Guardar Borrador
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleSaveAsDraft();
                        setTimeout(() => {
                          const latest = newsletters?.[0];
                          if (latest) {
                            setSelectedNewsletterId(latest.id);
                            setShowScheduleDialog(true);
                          }
                        }, 500);
                      }}
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      Programar Envío
                    </Button>
                    <Button className="bg-[#368A45] hover:bg-[#2D6E39]" onClick={handleSendNow} disabled={sendNewsletter.isPending}>
                      {sendNewsletter.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                      Enviar Ahora
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Métricas */}
        <TabsContent value="stats" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Métricas</CardTitle>
              <CardDescription>Rendimiento de tus campañas de email</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-900">{newsletters?.reduce((acc, n) => acc + (n.recipientCount || 0), 0) || 0}</p>
                  <p className="text-sm text-gray-600">Total Enviados</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <MailOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-blue-600">{newsletters?.reduce((acc, n) => acc + (n.openCount || 0), 0) || 0}</p>
                  <p className="text-sm text-gray-600">Total Aperturas</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <MousePointerClick className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-green-600">{newsletters?.reduce((acc, n) => acc + (n.clickCount || 0), 0) || 0}</p>
                  <p className="text-sm text-gray-600">Total Clics</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <CheckSquare className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-purple-600">{sentNewsletters}</p>
                  <p className="text-sm text-gray-600">Campañas Enviadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalle por Campaña</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaña</TableHead>
                    <TableHead className="text-center">Enviados</TableHead>
                    <TableHead className="text-center">Aperturas</TableHead>
                    <TableHead className="text-center">Clics</TableHead>
                    <TableHead className="text-center">Tasa Apertura</TableHead>
                    <TableHead className="text-center">CTR</TableHead>
                    <TableHead>Fecha Envío</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newsletters?.filter((n) => n.status === "sent").length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        No hay campañas enviadas aún
                      </TableCell>
                    </TableRow>
                  ) : (
                    newsletters?.filter((n) => n.status === "sent").map((newsletter) => {
                      const recipientCount = newsletter.recipientCount || 0;
                      const openRate = recipientCount > 0 ? ((newsletter.openCount || 0) / recipientCount * 100).toFixed(1) : "0";
                      const clickRate = recipientCount > 0 ? ((newsletter.clickCount || 0) / recipientCount * 100).toFixed(1) : "0";

                      return (
                        <TableRow key={newsletter.id}>
                          <TableCell className="font-medium max-w-xs truncate">{newsletter.subject}</TableCell>
                          <TableCell className="text-center">{recipientCount}</TableCell>
                          <TableCell className="text-center">{newsletter.openCount || 0}</TableCell>
                          <TableCell className="text-center">{newsletter.clickCount || 0}</TableCell>
                          <TableCell className="text-center">
                            <Badge className={parseFloat(openRate) > 20 ? "bg-green-100 text-green-700" : parseFloat(openRate) > 10 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}>
                              {openRate}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={parseFloat(clickRate) > 5 ? "bg-green-100 text-green-700" : parseFloat(clickRate) > 2 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}>
                              {clickRate}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {newsletter.sentAt ? new Date(newsletter.sentAt).toLocaleDateString("es-MX", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "-"}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de Programación */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Programar Envío
            </DialogTitle>
            <DialogDescription>Selecciona la fecha y hora para enviar el newsletter</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
              <Input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hora (Houston, CST)</label>
              <Input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
            </div>

            {scheduleDate && scheduleTime && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Hora en otras zonas:</p>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Houston (CST):</span>
                    <span className="font-medium">{formatInTimezone(new Date(`${scheduleDate}T${scheduleTime}:00`), TIMEZONES.houston.offset)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ciudad de México:</span>
                    <span className="font-medium">{formatInTimezone(new Date(`${scheduleDate}T${scheduleTime}:00`), TIMEZONES.mexico.offset)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bogotá:</span>
                    <span className="font-medium">{formatInTimezone(new Date(`${scheduleDate}T${scheduleTime}:00`), TIMEZONES.colombia.offset)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowScheduleDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSchedule} disabled={!scheduleDate || !scheduleTime || updateNewsletter.isPending} className="bg-[#368A45] hover:bg-[#2D6E39]">
              {updateNewsletter.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Clock className="w-4 h-4 mr-2" />}
              Programar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
