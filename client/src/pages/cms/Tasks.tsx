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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, CheckCircle, Clock, AlertTriangle, Trash2, List, LayoutGrid, XCircle, User } from "lucide-react";
import { toast } from "sonner";

// Definición de status con colores
const STATUS_CONFIG = {
  pendiente: {
    label: "Pendiente",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    headerBg: "bg-amber-500",
    icon: AlertTriangle,
  },
  en_progreso: {
    label: "En Progreso",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    headerBg: "bg-blue-500",
    icon: Clock,
  },
  completada: {
    label: "Completada",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-700",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
    headerBg: "bg-green-500",
    icon: CheckCircle,
  },
  cancelada: {
    label: "Cancelada",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    textColor: "text-gray-500",
    badgeBg: "bg-gray-100",
    badgeText: "text-gray-600",
    headerBg: "bg-gray-400",
    icon: XCircle,
  },
};

type StatusKey = keyof typeof STATUS_CONFIG;

export default function CmsTasks() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list");
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>("");
  
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
  const { data: users } = trpc.users.list.useQuery();
  
  // Para Kanban, necesitamos todas las tareas sin filtro de status
  const { data: allTasks } = trpc.tasks.list.useQuery(
    filterPriority === "all" 
      ? undefined 
      : { priority: filterPriority !== "all" ? filterPriority : undefined }
  );
  
  const createTask = trpc.tasks.create.useMutation({
    onSuccess: () => {
      utils.tasks.list.invalidate();
      utils.tasks.stats.invalidate();
      utils.dashboard.stats.invalidate();
      setIsCreateOpen(false);
      setNewTaskAssignee("");
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
      assignedTo: newTaskAssignee ? parseInt(newTaskAssignee) : undefined,
    });
  };

  const handleStatusChange = (taskId: number, newStatus: string) => {
    updateTask.mutate({
      id: taskId,
      status: newStatus as "pendiente" | "en_progreso" | "completada" | "cancelada",
    });
  };

  const handleAssigneeChange = (taskId: number, assigneeId: string) => {
    updateTask.mutate({
      id: taskId,
      assignedTo: assigneeId === "unassigned" ? undefined : parseInt(assigneeId),
    });
  };

  const getStatusConfig = (status: string) => {
    return STATUS_CONFIG[status as StatusKey] || STATUS_CONFIG.pendiente;
  };

  const getStatusBadge = (status: string) => {
    const config = getStatusConfig(status);
    return (
      <Badge className={`${config.badgeBg} ${config.badgeText} text-[10px] px-1.5 py-0 border-0`}>
        {config.label}
      </Badge>
    );
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

  const getUserById = (userId: number | null | undefined) => {
    if (!userId || !users) return null;
    return users.find(u => u.id === userId);
  };

  const getAssigneeAvatar = (assignedTo: number | null | undefined) => {
    const user = getUserById(assignedTo);
    if (!user) {
      return (
        <div className="flex items-center gap-1 text-gray-400">
          <User className="h-3 w-3" />
          <span className="text-[10px]">Sin asignar</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1">
        <Avatar className="h-5 w-5 border border-gray-200">
          <AvatarFallback className="text-[8px] bg-[#368A45] text-white">
            {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <span className="text-[10px] text-gray-600 truncate max-w-[60px]">
          {user.name?.split(' ')[0] || user.email?.split('@')[0]}
        </span>
      </div>
    );
  };

  // Filtrar tareas por asignado
  const filteredTasks = tasks?.filter(task => {
    if (filterAssignee === "all") return true;
    if (filterAssignee === "unassigned") return !task.assignedTo;
    return task.assignedTo === parseInt(filterAssignee);
  });

  // Agrupar tareas por status para Kanban
  const getTasksByStatus = (taskList: typeof tasks) => ({
    pendiente: taskList?.filter(t => t.status === "pendiente") || [],
    en_progreso: taskList?.filter(t => t.status === "en_progreso") || [],
    completada: taskList?.filter(t => t.status === "completada") || [],
    cancelada: taskList?.filter(t => t.status === "cancelada") || [],
  });

  const filteredAllTasks = allTasks?.filter(task => {
    if (filterAssignee === "all") return true;
    if (filterAssignee === "unassigned") return !task.assignedTo;
    return task.assignedTo === parseInt(filterAssignee);
  });

  const tasksByStatus = getTasksByStatus(filteredAllTasks);

  return (
    <div className="space-y-4 overflow-x-hidden max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Pendientes</h1>
          <p className="text-gray-500 text-sm mt-0.5">Gestión de tareas del área de marketing</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Toggle Vista */}
          <div className="flex items-center bg-gray-100 rounded-md p-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={`h-7 px-2 ${viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("kanban")}
              className={`h-7 px-2 ${viewMode === "kanban" ? "bg-white shadow-sm" : "hover:bg-gray-200"}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </Button>
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
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="priority" className="text-sm">Prioridad</Label>
                      <Select name="priority" defaultValue="media">
                        <SelectTrigger className="bg-white border-gray-200 text-sm h-9">
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          <SelectItem value="alta" className="text-sm">Alta</SelectItem>
                          <SelectItem value="media" className="text-sm">Media</SelectItem>
                          <SelectItem value="baja" className="text-sm">Baja</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="assignee" className="text-sm">Asignar a</Label>
                      <Select value={newTaskAssignee} onValueChange={setNewTaskAssignee}>
                        <SelectTrigger className="bg-white border-gray-200 text-sm h-9">
                          <SelectValue placeholder="Sin asignar" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200">
                          <SelectItem value="unassigned" className="text-sm">Sin asignar</SelectItem>
                          {users?.map((user) => (
                            <SelectItem key={user.id} value={user.id.toString()} className="text-sm">
                              {user.name || user.email || `Usuario ${user.id}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
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
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-gray-900">{stats?.total || 0}</div>
            <p className="text-[10px] text-gray-400">Total</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200 shadow-sm">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-amber-600">{stats?.pendiente || 0}</div>
            <p className="text-[10px] text-amber-500">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200 shadow-sm">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-blue-600">{stats?.en_progreso || 0}</div>
            <p className="text-[10px] text-blue-500">En Progreso</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200 shadow-sm">
          <CardContent className="p-3">
            <div className="text-lg font-bold text-green-600">{stats?.completada || 0}</div>
            <p className="text-[10px] text-green-500">Completadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {viewMode === "list" && (
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[120px] bg-white border-gray-200 text-sm h-8">
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
        )}
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[120px] bg-white border-gray-200 text-sm h-8">
            <SelectValue placeholder="Prioridad" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all" className="text-sm">Todas</SelectItem>
            <SelectItem value="alta" className="text-sm">Alta</SelectItem>
            <SelectItem value="media" className="text-sm">Media</SelectItem>
            <SelectItem value="baja" className="text-sm">Baja</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterAssignee} onValueChange={setFilterAssignee}>
          <SelectTrigger className="w-[140px] bg-white border-gray-200 text-sm h-8">
            <SelectValue placeholder="Asignado a" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all" className="text-sm">Todos</SelectItem>
            <SelectItem value="unassigned" className="text-sm">Sin asignar</SelectItem>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()} className="text-sm">
                {user.name || user.email || `Usuario ${user.id}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Vista Lista */}
      {viewMode === "list" && (
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-gray-900 text-sm font-semibold">Lista de Tareas</CardTitle>
            <CardDescription className="text-gray-500 text-xs">
              {filteredTasks?.length || 0} tareas encontradas
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {isLoading ? (
              <div className="text-center py-6 text-gray-400 text-sm">Cargando tareas...</div>
            ) : filteredTasks && filteredTasks.length > 0 ? (
              <div className="space-y-2">
                {filteredTasks.map((task) => {
                  const statusConfig = getStatusConfig(task.status || 'pendiente');
                  const StatusIcon = statusConfig.icon;
                  return (
                    <div
                      key={task.id}
                      className={`flex flex-col gap-2 p-2.5 rounded-md border transition-colors ${statusConfig.bgColor} ${statusConfig.borderColor} hover:opacity-90`}
                    >
                      <div className="flex items-start gap-2 flex-1 min-w-0 overflow-hidden">
                        <div className="mt-0.5 flex-shrink-0">
                          <StatusIcon className={`h-3.5 w-3.5 ${statusConfig.textColor}`} />
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
                      <div className="flex flex-wrap items-center gap-2 ml-5">
                        {getStatusBadge(task.status || 'pendiente')}
                        {getPriorityBadge(task.priority || 'media')}
                        
                        {/* Assignee selector */}
                        <Select
                          value={task.assignedTo?.toString() || "unassigned"}
                          onValueChange={(value) => handleAssigneeChange(task.id, value)}
                        >
                          <SelectTrigger className="w-[110px] bg-white border-gray-200 text-[10px] h-6 gap-1">
                            {getAssigneeAvatar(task.assignedTo)}
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200">
                            <SelectItem value="unassigned" className="text-xs">Sin asignar</SelectItem>
                            {users?.map((user) => (
                              <SelectItem key={user.id} value={user.id.toString()} className="text-xs">
                                {user.name || user.email || `Usuario ${user.id}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Status selector */}
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
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-400 text-sm">
                No hay tareas que mostrar
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Vista Kanban */}
      {viewMode === "kanban" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max">
            {(["pendiente", "en_progreso", "completada", "cancelada"] as StatusKey[]).map((status) => {
              const config = STATUS_CONFIG[status];
              const tasksInColumn = tasksByStatus[status];
              const StatusIcon = config.icon;
              
              return (
                <div key={status} className="w-[280px] flex-shrink-0">
                  {/* Header de columna */}
                  <div className={`${config.headerBg} text-white rounded-t-lg px-3 py-2 flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <StatusIcon className="h-4 w-4" />
                      <span className="font-medium text-sm">{config.label}</span>
                    </div>
                    <Badge className="bg-white/20 text-white text-xs">
                      {tasksInColumn.length}
                    </Badge>
                  </div>
                  
                  {/* Contenido de columna */}
                  <div className={`${config.bgColor} ${config.borderColor} border border-t-0 rounded-b-lg p-2 min-h-[400px] space-y-2`}>
                    {isLoading ? (
                      <div className="text-center py-4 text-gray-400 text-xs">Cargando...</div>
                    ) : tasksInColumn.length > 0 ? (
                      tasksInColumn.map((task) => (
                        <div
                          key={task.id}
                          className="bg-white rounded-md border border-gray-200 p-2.5 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className={`text-xs font-medium line-clamp-2 break-words flex-1 ${
                              task.status === 'completada' ? 'text-gray-400 line-through' : 'text-gray-900'
                            }`}>
                              {task.title}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-400 hover:text-red-500 hover:bg-red-50 h-5 w-5 flex-shrink-0"
                              onClick={() => {
                                if (confirm("¿Estás seguro de eliminar esta tarea?")) {
                                  deleteTask.mutate({ id: task.id });
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          {task.description && (
                            <p className="text-[10px] text-gray-400 line-clamp-2 break-words mb-2">
                              {task.description}
                            </p>
                          )}
                          
                          {/* Assignee */}
                          <div className="mb-2">
                            <Select
                              value={task.assignedTo?.toString() || "unassigned"}
                              onValueChange={(value) => handleAssigneeChange(task.id, value)}
                            >
                              <SelectTrigger className="w-full bg-gray-50 border-gray-200 text-[9px] h-6">
                                {getAssigneeAvatar(task.assignedTo)}
                              </SelectTrigger>
                              <SelectContent className="bg-white border-gray-200">
                                <SelectItem value="unassigned" className="text-xs">Sin asignar</SelectItem>
                                {users?.map((user) => (
                                  <SelectItem key={user.id} value={user.id.toString()} className="text-xs">
                                    {user.name || user.email || `Usuario ${user.id}`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="flex items-center justify-between gap-2">
                            {getPriorityBadge(task.priority || 'media')}
                            <Select
                              value={task.status || 'pendiente'}
                              onValueChange={(value) => handleStatusChange(task.id, value)}
                            >
                              <SelectTrigger className="w-[80px] bg-gray-50 border-gray-200 text-[9px] h-5">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-gray-200">
                                <SelectItem value="pendiente" className="text-xs">Pendiente</SelectItem>
                                <SelectItem value="en_progreso" className="text-xs">En Progreso</SelectItem>
                                <SelectItem value="completada" className="text-xs">Completada</SelectItem>
                                <SelectItem value="cancelada" className="text-xs">Cancelada</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-400 text-xs">
                        Sin tareas
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
