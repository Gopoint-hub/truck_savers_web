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
  const [editingNewsletter, setEditingNewsletter] = useState<number | null>(null);
  
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

  const updateNewsletter = trpc.newsletters.update.useMutation({
    onSuccess: () => {
      utils.newsletters.list.invalidate();
      setEditingNewsletter(null);
      toast.success("Newsletter actualizado");
    },
    onError: (error) => {
      toast.error("Error al actualizar: " + error.message);
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
        return <Badge className="bg-green-600">Enviado</Badge>;
      case "scheduled":
        return <Badge className="bg-blue-600">Programado</Badge>;
      case "cancelled":
        return <Badge variant="secondary" className="bg-gray-600">Cancelado</Badge>;
      default:
        return <Badge variant="outline" className="border-gray-600">Borrador</Badge>;
    }
  };

  const getStatusIcon = (status: string | null) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "scheduled":
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Mail className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Newsletter</h1>
          <p className="text-gray-400 mt-1">Gestión de campañas de email marketing</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2D6E39]">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Campaña
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Campaña</DialogTitle>
              <DialogDescription className="text-gray-400">
                Crea un nuevo newsletter para enviar a tus suscriptores
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateNewsletter}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Asunto del Email</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Ej: Promoción especial de enero"
                    className="bg-gray-900 border-gray-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Contenido</Label>
                  <Textarea
                    id="content"
                    name="content"
                    placeholder="Escribe el contenido del newsletter..."
                    className="bg-gray-900 border-gray-700 min-h-[200px]"
                    required
                  />
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-sm text-gray-400">
                    <strong className="text-white">Destinatarios:</strong> {subscriberStats?.active || 0} suscriptores activos
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  className="border-gray-600"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#368A45] hover:bg-[#2D6E39]"
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Mail className="h-8 w-8 text-[#368A45]" />
              <div>
                <div className="text-2xl font-bold text-white">{newsletters?.length || 0}</div>
                <p className="text-xs text-gray-400">Total Campañas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Edit className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {newsletters?.filter(n => n.status === 'draft').length || 0}
                </div>
                <p className="text-xs text-gray-400">Borradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Send className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {newsletters?.filter(n => n.status === 'sent').length || 0}
                </div>
                <p className="text-xs text-gray-400">Enviados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-white">{subscriberStats?.active || 0}</div>
                <p className="text-xs text-gray-400">Suscriptores Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Newsletters List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Campañas de Newsletter</CardTitle>
          <CardDescription className="text-gray-400">
            Gestiona tus campañas de email marketing
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Cargando newsletters...</div>
          ) : newsletters && newsletters.length > 0 ? (
            <div className="space-y-4">
              {newsletters.map((newsletter) => (
                <div
                  key={newsletter.id}
                  className="p-4 bg-gray-900 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      {getStatusIcon(newsletter.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-medium truncate">
                            {newsletter.subject}
                          </h3>
                          {getStatusBadge(newsletter.status)}
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {newsletter.content}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>
                            Creado: {new Date(newsletter.createdAt).toLocaleDateString('es-MX', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          {newsletter.sentAt && (
                            <span>
                              Enviado: {new Date(newsletter.sentAt).toLocaleDateString('es-MX', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          )}
                          {newsletter.recipientCount && newsletter.recipientCount > 0 && (
                            <span>
                              {newsletter.recipientCount} destinatarios
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {newsletter.status === 'draft' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[#368A45] text-[#368A45] hover:bg-[#368A45] hover:text-white"
                          onClick={() => {
                            toast.info("Función de envío próximamente disponible");
                          }}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Enviar
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        onClick={() => {
                          if (confirm("¿Estás seguro de eliminar este newsletter?")) {
                            deleteNewsletter.mutate({ id: newsletter.id });
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Mail className="h-12 w-12 mx-auto mb-4 text-gray-600" />
              <p>No hay newsletters creados</p>
              <p className="text-sm mt-1">Crea tu primera campaña para comenzar</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-gray-800 border-gray-700 border-dashed">
        <CardContent className="pt-6">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              <strong className="text-white">Nota:</strong> El envío de newsletters requiere configuración adicional de servicios de email.
              Contacta al administrador para habilitar esta funcionalidad.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
