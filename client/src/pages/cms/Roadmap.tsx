import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus,
  ChevronDown,
  ChevronRight,
  Pencil,
  Trash2,
  GripVertical
} from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeliverableStatus = "pendiente" | "en_progreso" | "completado";

const statusConfig: Record<DeliverableStatus, { label: string; icon: React.ElementType; color: string; bgColor: string }> = {
  pendiente: { label: "Pendiente", icon: Circle, color: "text-gray-500", bgColor: "bg-gray-100" },
  en_progreso: { label: "En Progreso", icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-50" },
  completado: { label: "Completado", icon: CheckCircle2, color: "text-green-600", bgColor: "bg-green-50" },
};

const stageColors = [
  { value: "#368A45", label: "Verde (Principal)" },
  { value: "#3B82F6", label: "Azul" },
  { value: "#8B5CF6", label: "Púrpura" },
  { value: "#F59E0B", label: "Naranja" },
  { value: "#EF4444", label: "Rojo" },
  { value: "#6B7280", label: "Gris" },
];

export default function Roadmap() {
  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>({});
  const [isAddStageOpen, setIsAddStageOpen] = useState(false);
  const [isAddDeliverableOpen, setIsAddDeliverableOpen] = useState(false);
  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);
  const [deleteStageId, setDeleteStageId] = useState<number | null>(null);
  const [newStage, setNewStage] = useState({ name: "", description: "", color: "#368A45" });
  const [newDeliverable, setNewDeliverable] = useState({ name: "", description: "" });

  const { data: stages = [], isLoading: stagesLoading, refetch: refetchStages } = trpc.roadmap.stages.list.useQuery();
  const { data: deliverables = [], isLoading: deliverablesLoading, refetch: refetchDeliverables } = trpc.roadmap.deliverables.list.useQuery();

  const createStageMutation = trpc.roadmap.stages.create.useMutation({
    onSuccess: () => {
      refetchStages();
      setIsAddStageOpen(false);
      setNewStage({ name: "", description: "", color: "#368A45" });
      toast.success("Etapa creada");
    },
    onError: () => toast.error("Error al crear etapa"),
  });

  const deleteStageMutation = trpc.roadmap.stages.delete.useMutation({
    onSuccess: () => {
      refetchStages();
      refetchDeliverables();
      setDeleteStageId(null);
      toast.success("Etapa eliminada");
    },
    onError: () => toast.error("Error al eliminar etapa"),
  });

  const createDeliverableMutation = trpc.roadmap.deliverables.create.useMutation({
    onSuccess: () => {
      refetchDeliverables();
      setIsAddDeliverableOpen(false);
      setNewDeliverable({ name: "", description: "" });
      setSelectedStageId(null);
      toast.success("Entregable creado");
    },
    onError: () => toast.error("Error al crear entregable"),
  });

  const updateDeliverableMutation = trpc.roadmap.deliverables.update.useMutation({
    onSuccess: () => {
      refetchDeliverables();
      toast.success("Estado actualizado");
    },
    onError: () => toast.error("Error al actualizar"),
  });

  // Agrupar entregables por etapa
  const deliverablesByStage = useMemo(() => {
    const grouped: Record<number, typeof deliverables> = {};
    deliverables.forEach(d => {
      if (!grouped[d.stageId]) {
        grouped[d.stageId] = [];
      }
      grouped[d.stageId].push(d);
    });
    return grouped;
  }, [deliverables]);

  // Estadísticas
  const stats = useMemo(() => {
    const total = deliverables.length;
    const completado = deliverables.filter(d => d.status === 'completado').length;
    const percentage = total > 0 ? Math.round((completado / total) * 100) : 0;
    return { total, completado, percentage, stages: stages.length };
  }, [deliverables, stages]);

  const toggleStage = (stageId: number) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageId]: prev[stageId] === undefined ? false : !prev[stageId],
    }));
  };

  const handleStatusChange = (id: number, status: DeliverableStatus) => {
    updateDeliverableMutation.mutate({ id, status });
  };

  const handleAddStage = () => {
    if (!newStage.name.trim()) {
      toast.error("El nombre es requerido");
      return;
    }
    createStageMutation.mutate({
      name: newStage.name.trim(),
      description: newStage.description.trim() || undefined,
      color: newStage.color,
      sortOrder: stages.length,
    });
  };

  const handleAddDeliverable = () => {
    if (!newDeliverable.name.trim() || !selectedStageId) {
      toast.error("Completa todos los campos");
      return;
    }
    const stageDeliverables = deliverablesByStage[selectedStageId] || [];
    createDeliverableMutation.mutate({
      stageId: selectedStageId,
      name: newDeliverable.name.trim(),
      description: newDeliverable.description.trim() || undefined,
      status: "pendiente",
      sortOrder: stageDeliverables.length,
    });
  };

  const openAddDeliverable = (stageId: number) => {
    setSelectedStageId(stageId);
    setIsAddDeliverableOpen(true);
  };

  const isLoading = stagesLoading || deliverablesLoading;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-48" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Roadmap del Proyecto</h1>
          <p className="text-gray-600 mt-1">Fases y entregables del proyecto</p>
        </div>
        <Dialog open={isAddStageOpen} onOpenChange={setIsAddStageOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2D6E39]">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Etapa
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Nueva Etapa del Roadmap</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Nombre de la Etapa</Label>
                <Input
                  placeholder="Ej: Etapa 1 - Frontend + SEO"
                  value={newStage.name}
                  onChange={(e) => setNewStage(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Descripción (opcional)</Label>
                <Textarea
                  placeholder="Descripción de la etapa..."
                  value={newStage.description}
                  onChange={(e) => setNewStage(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Color</Label>
                <Select value={newStage.color} onValueChange={(v) => setNewStage(prev => ({ ...prev, color: v }))}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: newStage.color }} />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {stageColors.map(color => (
                      <SelectItem key={color.value} value={color.value} className="text-gray-900">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: color.value }} />
                          {color.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                onClick={handleAddStage} 
                className="w-full bg-[#368A45] hover:bg-[#2D6E39]"
                disabled={createStageMutation.isPending}
              >
                {createStageMutation.isPending ? "Creando..." : "Crear Etapa"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.percentage}%</div>
            <div className="text-sm text-gray-600">Progreso Total</div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#368A45] transition-all duration-500"
                style={{ width: `${stats.percentage}%` }}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.stages}</div>
            <div className="text-sm text-gray-600">Etapas</div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Entregables</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-700">{stats.completado}</div>
            <div className="text-sm text-green-600">Completados</div>
          </CardContent>
        </Card>
      </div>

      {/* Stages */}
      <div className="space-y-4">
        {stages.map((stage, index) => {
          const stageDeliverables = deliverablesByStage[stage.id] || [];
          const completed = stageDeliverables.filter(d => d.status === 'completado').length;
          const total = stageDeliverables.length;
          const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
          const isExpanded = expandedStages[stage.id] !== false;

          return (
            <Collapsible key={stage.id} open={isExpanded} onOpenChange={() => toggleStage(stage.id)}>
              <Card className="bg-white border-gray-200 overflow-hidden">
                <CollapsibleTrigger asChild>
                  <CardHeader 
                    className="cursor-pointer hover:bg-gray-50 transition-colors py-4"
                    style={{ borderLeft: `4px solid ${stage.color || '#368A45'}` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-900">
                            {stage.name}
                          </CardTitle>
                          {stage.description && (
                            <p className="text-sm text-gray-600 mt-0.5">{stage.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-700">
                            {completed}/{total} entregables
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full transition-all duration-300"
                                style={{ width: `${percentage}%`, backgroundColor: stage.color || '#368A45' }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-700 w-12 text-right">
                              {percentage}%
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteStageId(stage.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4">
                    <div className="space-y-2">
                      {stageDeliverables.map(deliverable => {
                        const config = statusConfig[(deliverable.status ?? 'pendiente') as DeliverableStatus];
                        const StatusIcon = config.icon;
                        return (
                          <div 
                            key={deliverable.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                              <StatusIcon className={`h-5 w-5 ${config.color} shrink-0`} />
                              <div className="min-w-0">
                                <span className="text-sm text-gray-800 block truncate">
                                  {deliverable.name}
                                </span>
                                {deliverable.description && (
                                  <span className="text-xs text-gray-500 block truncate">
                                    {deliverable.description}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Select 
                              value={deliverable.status ?? 'pendiente'} 
                              onValueChange={(value) => handleStatusChange(deliverable.id, value as DeliverableStatus)}
                            >
                              <SelectTrigger className={`w-36 h-8 text-xs ${config.bgColor} border-0`}>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-gray-200">
                                <SelectItem value="pendiente" className="text-gray-900">
                                  <div className="flex items-center gap-2">
                                    <Circle className="h-3 w-3 text-gray-500" />
                                    Pendiente
                                  </div>
                                </SelectItem>
                                <SelectItem value="en_progreso" className="text-gray-900">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3 text-yellow-600" />
                                    En Progreso
                                  </div>
                                </SelectItem>
                                <SelectItem value="completado" className="text-gray-900">
                                  <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                                    Completado
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        );
                      })}
                      <Button
                        variant="ghost"
                        className="w-full mt-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-dashed border-gray-300"
                        onClick={() => openAddDeliverable(stage.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar Entregable
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>

      {stages.length === 0 && (
        <Card className="bg-white border-gray-200">
          <CardContent className="p-12 text-center">
            <div className="text-gray-500 mb-4">
              No hay etapas en el roadmap
            </div>
            <Button 
              onClick={() => setIsAddStageOpen(true)}
              className="bg-[#368A45] hover:bg-[#2D6E39]"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear primera etapa
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialog para agregar entregable */}
      <Dialog open={isAddDeliverableOpen} onOpenChange={setIsAddDeliverableOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Nuevo Entregable</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-gray-700">Nombre del Entregable</Label>
              <Input
                placeholder="Ej: Arquitectura SEO por ciudad"
                value={newDeliverable.name}
                onChange={(e) => setNewDeliverable(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-700">Descripción (opcional)</Label>
              <Textarea
                placeholder="Descripción del entregable..."
                value={newDeliverable.description}
                onChange={(e) => setNewDeliverable(prev => ({ ...prev, description: e.target.value }))}
                className="bg-white border-gray-300 text-gray-900"
              />
            </div>
            <Button 
              onClick={handleAddDeliverable} 
              className="w-full bg-[#368A45] hover:bg-[#2D6E39]"
              disabled={createDeliverableMutation.isPending}
            >
              {createDeliverableMutation.isPending ? "Creando..." : "Crear Entregable"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert para eliminar etapa */}
      <AlertDialog open={deleteStageId !== null} onOpenChange={() => setDeleteStageId(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">¿Eliminar esta etapa?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Esta acción eliminará la etapa y todos sus entregables. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-700">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteStageId && deleteStageMutation.mutate({ id: deleteStageId })}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
