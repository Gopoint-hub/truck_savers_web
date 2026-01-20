import { trpc } from "@/lib/trpc";
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, CheckCircle, Clock, AlertTriangle, Trash2, MessageCircle, User, GripVertical } from "lucide-react";
import { toast } from "sonner";

// Definición de status con colores para Kanban
const STATUS_CONFIG = {
  pendiente: {
    label: "Pendiente",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-300",
    textColor: "text-amber-700",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-900",
    headerBg: "bg-amber-500",
    icon: AlertTriangle,
  },
  en_progreso: {
    label: "En Progreso",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
    textColor: "text-blue-700",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-900",
    headerBg: "bg-blue-500",
    icon: Clock,
  },
  esperando_respuesta: {
    label: "Esperando Respuesta",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-300",
    textColor: "text-purple-700",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-900",
    headerBg: "bg-purple-500",
    icon: MessageCircle,
  },
  completada: {
    label: "Completada",
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    textColor: "text-green-700",
    badgeBg: "bg-green-100",
    badgeText: "text-green-900",
    headerBg: "bg-green-500",
    icon: CheckCircle,
  },
};

type StatusKey = keyof typeof STATUS_CONFIG;
const KANBAN_COLUMNS: StatusKey[] = ["pendiente", "en_progreso", "esperando_respuesta", "completada"];

export default function CmsTasks() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterAssignee, setFilterAssignee] = useState<string>("all");
  const [newTaskAssignee, setNewTaskAssignee] = useState<string>("");
  const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<StatusKey | null>(null);
  
  const utils = trpc.useUtils();
  const { data: tasks, isLoading } = trpc.tasks.list.useQuery(
    filterPriority === "all" 
      ? undefined 
      : { priority: filterPriority !== "all" ? filterPriority : undefined }
  );
  const { data: stats } = trpc.tasks.stats.useQuery();
  const { data: users } = trpc.users.list.useQuery();
  
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

  const handleStatusChange = (taskId: number, newStatus: StatusKey) => {
    updateTask.mutate({
      id: taskId,
      status: newStatus,
    });
  };

  const handleAssigneeChange = (taskId: number, assigneeId: string) => {
    updateTask.mutate({
      id: taskId,
      assignedTo: assigneeId === "unassigned" ? undefined : parseInt(assigneeId),
    });
  };

  const handlePriorityChange = (taskId: number, newPriority: string) => {
    updateTask.mutate({
      id: taskId,
      priority: newPriority as "alta" | "media" | "baja",
    });
  };

  // Drag & Drop handlers
  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", taskId.toString());
  };

  const handleDragOver = (e: React.DragEvent, status: StatusKey) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e: React.DragEvent, newStatus: StatusKey) => {
    e.preventDefault();
    if (draggedTaskId) {
      handleStatusChange(draggedTaskId, newStatus);
      toast.success(`Tarea movida a ${STATUS_CONFIG[newStatus].label}`);
    }
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "alta":
        return <Badge variant="destructive" className="bg-red-600 text-white text-[10px] px-1.5 py-0 font-semibold">Alta</Badge>;
      case "media":
        return <Badge className="bg-yellow-500 text-gray-900 text-[10px] px-1.5 py-0 font-semibold">Media</Badge>;
      case "baja":
        return <Badge variant="secondary" className="bg-gray-300 text-gray-800 text-[10px] px-1.5 py-0 font-semibold">Baja</Badge>;
      default:
        return <Badge variant="outline" className="text-[10px] px-1.5 py-0">{priority}</Badge>;
    }
  };

  const getPrioritySelector = (taskId: number, currentPriority: string) => {
    return (
      <Select
        value={currentPriority || 'media'}
        onValueChange={(value) => handlePriorityChange(taskId, value)}
      >
        <SelectTrigger className="w-[70px] bg-white border-gray-300 text-[9px] h-5">
          {getPriorityBadge(currentPriority || 'media')}
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200">
          <SelectItem value="alta" className="text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Alta
            </span>
          </SelectItem>
          <SelectItem value="media" className="text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              Media
            </span>
          </SelectItem>
          <SelectItem value="baja" className="text-xs">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span>
              Baja
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    );
  };

  const getUserById = (userId: number | null | undefined) => {
    if (!userId || !users) return null;
    return users.find(u => u.id === userId);
  };

  const getAssigneeAvatar = (assignedTo: number | null | undefined) => {
    const user = getUserById(assignedTo);
    if (!user) {
      return (
        <div className="flex items-center gap-1 text-gray-500">
          <User className="h-3 w-3" />
          <span className="text-[10px] font-medium">Sin asignar</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-1">
        <Avatar className="h-5 w-5 border border-gray-300">
          <AvatarFallback className="text-[8px] bg-[#368A45] text-white font-semibold">
            {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <span className="text-[10px] text-gray-700 truncate max-w-[60px] font-medium">
          {user.name?.split(' ')[0] || user.email?.split('@')[0]}
        </span>
      </div>
    );
  };

  // Filtrar tareas
  const filteredTasks = tasks?.filter(task => {
    if (filterAssignee === "all") return true;
    if (filterAssignee === "unassigned") return !task.assignedTo;
    return task.assignedTo === parseInt(filterAssignee);
  });

  // Agrupar tareas por status para Kanban
  const getTasksByStatus = (taskList: typeof tasks) => ({
    pendiente: taskList?.filter(t => t.status === "pendiente") || [],
    en_progreso: taskList?.filter(t => t.status === "en_progreso") || [],
    esperando_respuesta: taskList?.filter(t => t.status === "esperando_respuesta") || [],
    completada: taskList?.filter(t => t.status === "completada") || [],
  });

  const tasksByStatus = getTasksByStatus(filteredTasks);

  return (
    <div className="space-y-4 overflow-x-hidden max-w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Pendientes</h1>
          <p className="text-gray-600 text-sm mt-0.5">Arrastra las tareas entre columnas para cambiar su estado</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2D6E39] text-sm h-8 text-white font-semibold">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Nueva Tarea
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-gray-900 font-bold">Nueva Tarea</DialogTitle>
              <DialogDescription className="text-gray-600">
                Crea una nueva tarea para el equipo de marketing
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-800 font-semibold">Título</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                  placeholder="Describe la tarea..."
                />
              </div>
              <div>
                <Label htmlFor="description" className="text-gray-800 font-semibold">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                  placeholder="Detalles adicionales..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="priority" className="text-gray-800 font-semibold">Prioridad</Label>
                  <Select name="priority" defaultValue="media">
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="alta" className="text-gray-900">Alta</SelectItem>
                      <SelectItem value="media" className="text-gray-900">Media</SelectItem>
                      <SelectItem value="baja" className="text-gray-900">Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-800 font-semibold">Asignar a</Label>
                  <Select value={newTaskAssignee} onValueChange={setNewTaskAssignee}>
                    <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                      <SelectValue placeholder="Sin asignar" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="unassigned" className="text-gray-900">Sin asignar</SelectItem>
                      {users?.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()} className="text-gray-900">
                          {user.name || user.email || `Usuario ${user.id}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-[#368A45] hover:bg-[#2D6E39] text-white font-semibold" disabled={createTask.isPending}>
                  {createTask.isPending ? "Creando..." : "Crear Tarea"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-3">
            <p className="text-xs text-gray-600 font-medium">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-3">
            <p className="text-xs text-amber-700 font-medium">Pendientes</p>
            <p className="text-2xl font-bold text-amber-900">{stats?.pendiente || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-3">
            <p className="text-xs text-blue-700 font-medium">En Progreso</p>
            <p className="text-2xl font-bold text-blue-900">{stats?.en_progreso || 0}</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-3">
            <p className="text-xs text-green-700 font-medium">Completadas</p>
            <p className="text-2xl font-bold text-green-900">{stats?.completada || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[120px] bg-white border-gray-300 text-gray-800 h-8 text-sm">
            <SelectValue placeholder="Prioridad" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all" className="text-sm text-gray-900">Todas</SelectItem>
            <SelectItem value="alta" className="text-sm text-gray-900">Alta</SelectItem>
            <SelectItem value="media" className="text-sm text-gray-900">Media</SelectItem>
            <SelectItem value="baja" className="text-sm text-gray-900">Baja</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterAssignee} onValueChange={setFilterAssignee}>
          <SelectTrigger className="w-[140px] bg-white border-gray-300 text-gray-800 h-8 text-sm">
            <SelectValue placeholder="Asignado" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all" className="text-sm text-gray-900">Todos</SelectItem>
            <SelectItem value="unassigned" className="text-sm text-gray-900">Sin asignar</SelectItem>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()} className="text-sm text-gray-900">
                {user.name || user.email || `Usuario ${user.id}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {KANBAN_COLUMNS.map((status) => {
            const config = STATUS_CONFIG[status];
            const tasksInColumn = tasksByStatus[status];
            const StatusIcon = config.icon;
            const isDropTarget = dragOverColumn === status;
            
            return (
              <div 
                key={status} 
                className="w-[300px] flex-shrink-0"
                onDragOver={(e) => handleDragOver(e, status)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, status)}
              >
                {/* Header de columna */}
                <div className={`${config.headerBg} text-white rounded-t-lg px-3 py-2 flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <StatusIcon className="h-4 w-4" />
                    <span className="font-semibold text-sm">{config.label}</span>
                  </div>
                  <Badge className="bg-white/20 text-white text-xs font-semibold">
                    {tasksInColumn.length}
                  </Badge>
                </div>
                
                {/* Contenido de columna */}
                <div className={`${config.bgColor} ${config.borderColor} border border-t-0 rounded-b-lg p-2 min-h-[500px] space-y-2 transition-all ${
                  isDropTarget ? 'ring-2 ring-offset-2 ring-blue-400 bg-blue-50' : ''
                }`}>
                  {isLoading ? (
                    <div className="text-center py-4 text-gray-500 text-xs">Cargando...</div>
                  ) : tasksInColumn.length > 0 ? (
                    tasksInColumn.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white rounded-md border border-gray-200 p-2.5 shadow-sm hover:shadow-md transition-all cursor-grab active:cursor-grabbing ${
                          draggedTaskId === task.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-semibold line-clamp-2 break-words ${
                              task.status === 'completada' ? 'text-gray-500 line-through' : 'text-gray-900'
                            }`}>
                              {task.title}
                            </p>
                            {task.description && (
                              <p className="text-[10px] text-gray-600 line-clamp-2 break-words mt-1">
                                {task.description}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 h-5 w-5 flex-shrink-0"
                            onClick={() => {
                              if (confirm("¿Estás seguro de eliminar esta tarea?")) {
                                deleteTask.mutate({ id: task.id });
                              }
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {/* Assignee */}
                        <div className="mb-2">
                          <Select
                            value={task.assignedTo?.toString() || "unassigned"}
                            onValueChange={(value) => handleAssigneeChange(task.id, value)}
                          >
                            <SelectTrigger className="w-full bg-gray-50 border-gray-300 text-[9px] h-6">
                              {getAssigneeAvatar(task.assignedTo)}
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-200">
                              <SelectItem value="unassigned" className="text-xs text-gray-900">Sin asignar</SelectItem>
                              {users?.map((user) => (
                                <SelectItem key={user.id} value={user.id.toString()} className="text-xs text-gray-900">
                                  {user.name || user.email || `Usuario ${user.id}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between gap-2">
                          {getPrioritySelector(task.id, task.priority || 'media')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 text-xs border-2 border-dashed border-gray-300 rounded-lg">
                      Arrastra tareas aquí
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
