import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Send, Trash2, Edit, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function CmsNewsletters() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const utils = trpc.useUtils();
  const { data: newsletters, isLoading } = trpc.newsletters.list.useQuery();
  const { data: subscriberStats } = trpc.subscribers.stats.useQuery();
  
  const createNewsletter = trpc.newsletters.create.useMutation({
    onSuccess: () => {
      utils.newsletters.list.invalidate();
      setIsCreateOpen(false);
      toast.success("Newsletter creado exitosamente");
    },
    onError: (error) => {
      toast.error("Error al crear newsletter: " + error.message);
    },
  });

  const deleteNewsletter = trpc.newsletters.delete.useMutation({
    onSuccess: () => {
      utils.newsletters.list.invalidate();
      toast.success("Newsletter eliminado");
    },
    onError: (error) => {
      toast.error("Error al eliminar: " + error.message);
    },
  });

  const handleCreateNewsletter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createNewsletter.mutate({
      subject: formData.get("subject") as string,
      content: formData.get("content") as string,
      status: "draft",
    });
  };

  const getStatusBadge = (status: string | null) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-green-500 text-white text-[10px] px-1.5 py-0">Enviado</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-500 text-white text-[10px] px-1.5 py-0">Programado</Badge>;
      case "cancelled":
        return <Badge className="bg-gray-200 text-gray-500 text-[10px] px-1.5 py-0">Cancelado</Badge>;
      default:
        return <Badge variant="outline" className="border-gray-300 text-gray-500 text-[10px] px-1.5 py-0">Borrador</Badge>;
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Mail className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-gray-500 text-sm mt-0.5">Gestión de campañas de email marketing</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2D6E39] text-sm h-8">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Nueva Campaña
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-base">Crear Nueva Campaña</DialogTitle>
              <DialogDescription className="text-gray-500 text-sm">
                Crea un nuevo newsletter para enviar a tus suscriptores
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateNewsletter}>
              <div className="space-y-3 py-3">
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-sm">Asunto del Email</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Ej: Promoción especial de enero"
                    className="bg-white border-gray-200 text-sm h-9"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="content" className="text-sm">Contenido</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Escribe el contenido del newsletter..."
                    className="bg-white border-gray-200 text-sm min-h-[150px]"
                    required
                  />
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500">
                    <strong className="text-gray-700">Destinatarios:</strong> {subscriberStats?.active || 0} suscriptores activos
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  className="border-gray-200 text-sm h-8"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#368A45] hover:bg-[#2D6E39] text-sm h-8"
                  disabled={createNewsletter.isPending}
                >
                  {createNewsletter.isPending ? "Creando..." : "Guardar Borrador"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-[#368A45]" />
              <div>
                <div className="text-lg font-bold text-gray-900">{newsletters?.length || 0}</div>
                <p className="text-[10px] text-gray-400">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {newsletters?.filter(n => n.status === 'draft').length || 0}
                </div>
                <p className="text-[10px] text-gray-400">Borradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Send className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {newsletters?.filter(n => n.status === 'sent').length || 0}
                </div>
                <p className="text-[10px] text-gray-400">Enviados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-lg font-bold text-gray-900">{subscriberStats?.active || 0}</div>
                <p className="text-[10px] text-gray-400">Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Newsletters List */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-gray-900 text-sm font-semibold">Campañas de Newsletter</CardTitle>
          <CardDescription className="text-gray-500 text-xs">
            Gestiona tus campañas de email marketing
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {isLoading ? (
            <div className="text-center py-6 text-gray-400 text-sm">Cargando newsletters...</div>
          ) : newsletters && newsletters.length > 0 ? (
            <div className="space-y-2">
              {newsletters.map((newsletter) => (
                <div
                  key={newsletter.id}
                  className="p-2.5 bg-gray-50 rounded-md border border-gray-100"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1 min-w-0">
                      {getStatusIcon(newsletter.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="text-gray-900 font-medium text-xs truncate">
                            {newsletter.subject}
                          </h3>
                          {getStatusBadge(newsletter.status)}
                        </div>
                        <p className="text-[10px] text-gray-400 line-clamp-1">
                          {newsletter.content}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
                          <span>
                            {new Date(newsletter.createdAt).toLocaleDateString('es-MX', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </span>
                          {newsletter.recipientCount && newsletter.recipientCount > 0 && (
                            <span>{newsletter.recipientCount} dest.</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {newsletter.status === 'draft' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white text-[10px] h-6 px-2"
                          onClick={() => {
                            toast.info("Función de envío próximamente disponible");
                          }}
                        >
                          <Send className="h-3 w-3 mr-1" />
                          Enviar
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-500 hover:bg-red-50 h-6 w-6"
                        onClick={() => {
                          if (confirm("¿Estás seguro de eliminar este newsletter?")) {
                            deleteNewsletter.mutate({ id: newsletter.id });
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-400">
              <Mail className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No hay newsletters creados</p>
              <p className="text-xs mt-0.5">Crea tu primera campaña para comenzar</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-amber-50 border-amber-200 border-dashed">
        <CardContent className="p-3">
          <p className="text-xs text-amber-700">
            <strong>Nota:</strong> El envío de newsletters requiere configuración adicional de servicios de email.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
