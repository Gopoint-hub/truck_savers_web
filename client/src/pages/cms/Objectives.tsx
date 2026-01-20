import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Trash2, Edit, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export default function CmsObjectives() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  const utils = trpc.useUtils();
  const { data: objectives, isLoading } = trpc.objectives.list.useQuery();
  const { data: businessLines } = trpc.businessLines.list.useQuery();
  const { data: locations } = trpc.locations.list.useQuery();
  
  const createObjective = trpc.objectives.create.useMutation({
    onSuccess: () => {
      utils.objectives.list.invalidate();
      utils.dashboard.stats.invalidate();
      setIsCreateOpen(false);
      toast.success("Objetivo creado exitosamente");
    },
    onError: (error) => {
      toast.error("Error al crear objetivo: " + error.message);
    },
  });

  const updateObjective = trpc.objectives.update.useMutation({
    onSuccess: () => {
      utils.objectives.list.invalidate();
      utils.dashboard.stats.invalidate();
      toast.success("Objetivo actualizado");
    },
    onError: (error) => {
      toast.error("Error al actualizar: " + error.message);
    },
  });

  const deleteObjective = trpc.objectives.delete.useMutation({
    onSuccess: () => {
      utils.objectives.list.invalidate();
      utils.dashboard.stats.invalidate();
      toast.success("Objetivo eliminado");
    },
    onError: (error) => {
      toast.error("Error al eliminar: " + error.message);
    },
  });

  const handleCreateObjective = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const businessLineId = formData.get("businessLineId");
    const locationId = formData.get("locationId");
    
    createObjective.mutate({
      serviceProduct: formData.get("serviceProduct") as string,
      targetValue: formData.get("targetValue") as string,
      targetNumeric: parseInt(formData.get("targetNumeric") as string) || undefined,
      period: formData.get("period") as "daily" | "weekly" | "monthly" | "quarterly" | "yearly",
      businessLineId: businessLineId ? parseInt(businessLineId as string) : undefined,
      locationId: locationId ? parseInt(locationId as string) : undefined,
    });
  };

  const handleUpdateProgress = (objectiveId: number, currentProgress: number) => {
    const newProgress = prompt("Nuevo progreso:", currentProgress.toString());
    if (newProgress !== null) {
      updateObjective.mutate({
        id: objectiveId,
        currentProgress: parseInt(newProgress) || 0,
      });
    }
  };

  const getPeriodLabel = (period: string | null) => {
    switch (period) {
      case "daily": return "Diario";
      case "weekly": return "Semanal";
      case "monthly": return "Mensual";
      case "quarterly": return "Trimestral";
      case "yearly": return "Anual";
      default: return period || "N/A";
    }
  };

  const calculateProgress = (current: number | null, target: number | null) => {
    if (!target || target === 0) return 0;
    return Math.min(Math.round(((current || 0) / target) * 100), 100);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Metas y Objetivos</h1>
          <p className="text-gray-600 text-sm mt-0.5">Gestión de objetivos comerciales por línea de negocio</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2D6E39] text-sm h-8">
              <Plus className="h-3.5 w-3.5 mr-1.5" />
              Nuevo Objetivo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-base">Crear Nuevo Objetivo</DialogTitle>
              <DialogDescription className="text-gray-600 text-sm">
                Define una nueva meta comercial
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateObjective}>
              <div className="space-y-3 py-3">
                <div className="space-y-1.5">
                  <Label htmlFor="serviceProduct" className="text-sm">Servicio/Producto</Label>
                  <Input
                    id="serviceProduct"
                    name="serviceProduct"
                    placeholder="Ej: Alineaciones, Cambios de aceite..."
                    className="bg-white border-gray-200 text-sm h-9"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="targetValue" className="text-sm">Meta (texto)</Label>
                    <Input
                      id="targetValue"
                      name="targetValue"
                      placeholder="Ej: 150 / mes"
                      className="bg-white border-gray-200 text-sm h-9"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="targetNumeric" className="text-sm">Meta (número)</Label>
                    <Input
                      id="targetNumeric"
                      name="targetNumeric"
                      type="number"
                      placeholder="150"
                      className="bg-white border-gray-200 text-sm h-9"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="period" className="text-sm">Período</Label>
                  <Select name="period" defaultValue="monthly">
                    <SelectTrigger className="bg-white border-gray-200 text-sm h-9">
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="daily" className="text-sm">Diario</SelectItem>
                      <SelectItem value="weekly" className="text-sm">Semanal</SelectItem>
                      <SelectItem value="monthly" className="text-sm">Mensual</SelectItem>
                      <SelectItem value="quarterly" className="text-sm">Trimestral</SelectItem>
                      <SelectItem value="yearly" className="text-sm">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="businessLineId" className="text-sm">Línea de Negocio</Label>
                    <Select name="businessLineId">
                      <SelectTrigger className="bg-white border-gray-200 text-sm h-9">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {businessLines?.map((bl) => (
                          <SelectItem key={bl.id} value={bl.id.toString()} className="text-sm">
                            {bl.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="locationId" className="text-sm">Ubicación</Label>
                    <Select name="locationId">
                      <SelectTrigger className="bg-white border-gray-200 text-sm h-9">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {locations?.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id.toString()} className="text-sm">
                            {loc.name}
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
                  disabled={createObjective.isPending}
                >
                  {createObjective.isPending ? "Creando..." : "Crear Objetivo"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#368A45]" />
              <div>
                <div className="text-lg font-bold text-gray-900">{objectives?.length || 0}</div>
                <p className="text-[10px] text-gray-600 font-medium">Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {objectives?.filter(o => o.isActive).length || 0}
                </div>
                <p className="text-[10px] text-gray-600 font-medium">Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-lg font-bold text-gray-900">
                  {objectives?.filter(o => {
                    const progress = calculateProgress(o.currentProgress, o.targetNumeric);
                    return progress >= 100;
                  }).length || 0}
                </div>
                <p className="text-[10px] text-gray-600 font-medium">Alcanzadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Objectives List */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-gray-900 text-sm font-semibold">Lista de Objetivos</CardTitle>
          <CardDescription className="text-gray-600 text-xs">
            Haz clic en el progreso para actualizarlo
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {isLoading ? (
            <div className="text-center py-6 text-gray-500 text-sm">Cargando objetivos...</div>
          ) : objectives && objectives.length > 0 ? (
            <div className="space-y-2">
              {objectives.map((objective) => {
                const progress = calculateProgress(objective.currentProgress, objective.targetNumeric);
                return (
                  <div
                    key={objective.id}
                    className="p-2.5 bg-gray-50 rounded-md border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="text-gray-900 font-medium text-xs truncate">{objective.serviceProduct}</h3>
                          <Badge 
                            variant={objective.isActive ? "default" : "secondary"} 
                            className={`text-[10px] px-1 py-0 ${objective.isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"}`}
                          >
                            {objective.isActive ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-gray-600 font-medium">
                          Meta: {objective.targetValue} • {getPeriodLabel(objective.period)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-gray-600 h-6 w-6"
                          onClick={() => {
                            updateObjective.mutate({
                              id: objective.id,
                              isActive: !objective.isActive,
                            });
                          }}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-500 hover:bg-red-50 h-6 w-6"
                          onClick={() => {
                            if (confirm("¿Estás seguro de eliminar este objetivo?")) {
                              deleteObjective.mutate({ id: objective.id });
                            }
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div 
                      className="cursor-pointer"
                      onClick={() => handleUpdateProgress(objective.id, objective.currentProgress || 0)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-gray-600 font-medium">Progreso</span>
                        <span className="text-[10px] text-gray-700 font-medium">
                          {objective.currentProgress || 0} / {objective.targetNumeric || objective.targetValue} ({progress}%)
                        </span>
                      </div>
                      <Progress 
                        value={progress} 
                        className="h-1.5 bg-gray-100"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              No hay objetivos configurados. Crea el primero.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
