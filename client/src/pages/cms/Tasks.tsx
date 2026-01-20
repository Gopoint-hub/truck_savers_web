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
import { Plus, CheckCircle, Clock, AlertTriangle, Trash2, Edit } from "lucide-react";
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
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "en_progreso":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "alta":
        return <Badge variant="destructive">Alta</Badge>;
      case "media":
        return <Badge className="bg-yellow-600">Media</Badge>;
      case "baja":
        return <Badge variant="secondary" className="bg-gray-600">Baja</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Pendientes</h1>
          <p className="text-gray-400 mt-1">Gestión de tareas del área de marketing</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2D6E39]">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Crear Nueva Tarea</DialogTitle>
              <DialogDescription className="text-gray-400">
                Agrega una nueva tarea al sistema de pendientes
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTask}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Descripción de la tarea"
                    className="bg-gray-900 border-gray-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descripción (opcional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Detalles adicionales..."
                    className="bg-gray-900 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Prioridad</Label>
                  <Select name="priority" defaultValue="media">
                    <SelectTrigger className="bg-gray-900 border-gray-700">
                      <SelectValue placeholder="Seleccionar prioridad" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="baja">Baja</SelectItem>
                    </SelectContent>
                  </Select>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-white">{stats?.total || 0}</div>
            <p className="text-xs text-gray-400">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-yellow-500">{stats?.pendiente || 0}</div>
            <p className="text-xs text-gray-400">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-blue-500">{stats?.en_progreso || 0}</div>
            <p className="text-xs text-gray-400">En Progreso</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="text-2xl font-bold text-green-500">{stats?.completada || 0}</div>
            <p className="text-xs text-gray-400">Completadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pendiente">Pendiente</SelectItem>
            <SelectItem value="en_progreso">En Progreso</SelectItem>
            <SelectItem value="completada">Completada</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
            <SelectValue placeholder="Filtrar por prioridad" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">Todas las prioridades</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
            <SelectItem value="media">Media</SelectItem>
            <SelectItem value="baja">Baja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Lista de Tareas</CardTitle>
          <CardDescription className="text-gray-400">
            {tasks?.length || 0} tareas encontradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Cargando tareas...</div>
          ) : tasks && tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-900 rounded-lg hover:bg-gray-850 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {getStatusIcon(task.status || 'pendiente')}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        task.status === 'completada' ? 'text-gray-500 line-through' : 'text-white'
                      }`}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getPriorityBadge(task.priority || 'media')}
                    <Select
                      value={task.status || 'pendiente'}
                      onValueChange={(value) => handleStatusChange(task.id, value)}
                    >
                      <SelectTrigger className="w-[140px] bg-gray-800 border-gray-700 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en_progreso">En Progreso</SelectItem>
                        <SelectItem value="completada">Completada</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      onClick={() => {
                        if (confirm("¿Estás seguro de eliminar esta tarea?")) {
                          deleteTask.mutate({ id: task.id });
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No hay tareas que mostrar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
