import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Plus, CheckCircle, Clock, AlertTriangle, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function CmsTasks() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  
  const utils = trpc.useUtils();
  const { data: tasks, isLoading } = trpc.tasks.list.useQuery(
    filterStatus === "all" && filterPriority === "all" 
      ? undefined 
      : {
          status: filterStatus !== "all" ? filterStatus : undefined,
          priority: filterPriority !== "all" ? filterPriority : undefined,
        }
  );
  const { data: stats } = trpc.tasks.stats.useQuery();
  
  const createTask = trpc.tasks.create.useMutation({
    onSuccess: () => {
      utils.tasks.list.invalidate();
      utils.tasks.stats.invalidate();
      utils.dashboard.stats.invalidate();
      setIsCreateOpen(false);
      toast.success("Tarea creada exitosamente");
    },
    onError: (error) => {
      toast.error("Error al crear tarea: " + error.message);
    },
  });

  const updateTask = trpc.tasks.update.useMutation({
    onSuccess: () => {
      utils.tasks.list.invalidate();
      utils.tasks.stats.invalidate();
      utils.dashboard.stats.invalidate();
      toast.success("Tarea actualizada");
    },
    onError: (error) => {
      toast.error("Error al actualizar: " + error.message);
    },
  });

  const deleteTask = trpc.tasks.delete.useMutation({
    onSuccess: () => {
      utils.tasks.list.invalidate();
      utils.tasks.stats.invalidate();
      utils.dashboard.stats.invalidate();
      toast.success("Tarea eliminada");
    },
    onError: (error) => {
      toast.error("Error al eliminar: " + error.message);
    },
  });

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createTask.mutate({
      title: formData.get("title") as string,
      description: formData.get("description") as string || undefined,
      priority: formData.get("priority") as "alta" | "media" | "baja",
      status: "pendiente",
    });
  };

  const handleStatusChange = (taskId: number, newStatus: string) => {
    updateTask.mutate({
      id: taskId,
      status: newStatus as "pendiente" | "en_progreso" | "completada" | "cancelada",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completada":
        return <CheckCircle className="h-3.5 w-3.5 text-green-500" />;
      case "en_progreso":
        return <Clock className="h-3.5 w-3.5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-3.5 w-3.5 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "alta":
        return <Badge variant="destructive" className="text-[10px] px-1.5 py-0">Alta</Badge>;
      case "media":
        return <Badge className="bg-yellow-500 text-white text-[10px] px-1.5 py-0">Media</Badge>;
      case "baja":
        return <Badge variant="secondary" className="bg-gray-200 text-gray-600 text-[10px] px-1.5 py-0">Baja</Badge>;
      default:
        return <Badge variant="outline" className="text-[10px] px-1.5 py-0">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-4 overflow-x-hidden max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Pendientes</h1>
          <p className="text-gray-500 text-sm mt-0.5">Gestión de tareas del área de marketing</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2D6E39] text-sm h-8">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base">Crear Nueva Tarea</DialogTitle>
              <DialogDescription className="text-gray-500 text-sm">
                Agrega una nueva tarea al sistema de pendientes
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTask}>
              <div className="space-y-3 py-3">
                <div className="space-y-1.5">
                  <Label htmlFor="title" className="text-sm">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Descripción de la tarea"
                    className="bg-white border-gray-200 text-sm h-9"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-sm">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Detalles adicionales..."
                    className="bg-white border-gray-200 text-sm min-h-[60px]"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="priority" className="text-sm">Prioridad</Label>
                  <Select name="priority" defaultValue="media">
                    <SelectTrigger className="bg-white border-gray-200 text-sm h-9">
                      <SelectValue placeholder="Seleccionar prioridad" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="alta" className="text-sm">Alta</SelectItem>
                      <SelectItem value="media" className="text-sm">Media</SelectItem>
                      <SelectItem value="baja" className="text-sm">Baja</SelectItem>
                    </SelectContent>
                  </Select>
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
                  disabled={createTask.isPending}
                >
                  {createTask.isPending ? "Creando..." : "Crear Tarea"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-gray-900">{stats?.total || 0}</div>
            <p className="text-[10px] text-gray-400">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-yellow-500">{stats?.pendiente || 0}</div>
            <p className="text-[10px] text-gray-400">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-blue-500">{stats?.en_progreso || 0}</div>
            <p className="text-[10px] text-gray-400">En Progreso</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-green-500">{stats?.completada || 0}</div>
            <p className="text-[10px] text-gray-400">Completadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[140px] bg-white border-gray-200 text-sm h-8">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all" className="text-sm">Todos</SelectItem>
            <SelectItem value="pendiente" className="text-sm">Pendiente</SelectItem>
            <SelectItem value="en_progreso" className="text-sm">En Progreso</SelectItem>
            <SelectItem value="completada" className="text-sm">Completada</SelectItem>
            <SelectItem value="cancelada" className="text-sm">Cancelada</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[140px] bg-white border-gray-200 text-sm h-8">
            <SelectValue placeholder="Prioridad" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all" className="text-sm">Todas</SelectItem>
            <SelectItem value="alta" className="text-sm">Alta</SelectItem>
            <SelectItem value="media" className="text-sm">Media</SelectItem>
            <SelectItem value="baja" className="text-sm">Baja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-gray-900 text-sm font-semibold">Lista de Tareas</CardTitle>
          <CardDescription className="text-gray-500 text-xs">
            {tasks?.length || 0} tareas encontradas
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {isLoading ? (
            <div className="text-center py-6 text-gray-400 text-sm">Cargando tareas...</div>
          ) : tasks && tasks.length > 0 ? (
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100 transition-colors gap-2"
                >
                  <div className="flex items-start gap-2 flex-1 min-w-0 overflow-hidden">
                    <div className="mt-0.5 flex-shrink-0">
                      {getStatusIcon(task.status || 'pendiente')}
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p className={`text-xs font-medium line-clamp-2 break-words ${
                        task.status === 'completada' ? 'text-gray-400 line-through' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-[10px] text-gray-400 line-clamp-1 break-words mt-0.5">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-5 sm:ml-0">
                    {getPriorityBadge(task.priority || 'media')}
                    <Select
                      value={task.status || 'pendiente'}
                      onValueChange={(value) => handleStatusChange(task.id, value)}
                    >
                      <SelectTrigger className="w-[90px] bg-white border-gray-200 text-[10px] h-6">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="pendiente" className="text-xs">Pendiente</SelectItem>
                        <SelectItem value="en_progreso" className="text-xs">En Progreso</SelectItem>
                        <SelectItem value="completada" className="text-xs">Completada</SelectItem>
                        <SelectItem value="cancelada" className="text-xs">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-500 hover:bg-red-50 h-6 w-6 flex-shrink-0"
                      onClick={() => {
                        if (confirm("¿Estás seguro de eliminar esta tarea?")) {
                          deleteTask.mutate({ id: task.id });
                        }
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-400 text-sm">
              No hay tareas que mostrar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
