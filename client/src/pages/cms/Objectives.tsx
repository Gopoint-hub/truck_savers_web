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
  const [editingObjective, setEditingObjective] = useState<number | null>(null);
  
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
      setEditingObjective(null);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Metas y Objetivos</h1>
          <p className="text-gray-400 mt-1">Gestión de objetivos comerciales por línea de negocio</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2D6E39]">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Objetivo
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Objetivo</DialogTitle>
              <DialogDescription className="text-gray-400">
                Define una nueva meta comercial
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateObjective}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceProduct">Servicio/Producto</Label>
                  <Input
                    id="serviceProduct"
                    name="serviceProduct"
                    placeholder="Ej: Alineaciones, Cambios de aceite..."
                    className="bg-gray-900 border-gray-700"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetValue">Meta (texto)</Label>
                    <Input
                      id="targetValue"
                      name="targetValue"
                      placeholder="Ej: 150 / mes"
                      className="bg-gray-900 border-gray-700"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="targetNumeric">Meta (número)</Label>
                    <Input
                      id="targetNumeric"
                      name="targetNumeric"
                      type="number"
                      placeholder="150"
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Período</Label>
                  <Select name="period" defaultValue="monthly">
                    <SelectTrigger className="bg-gray-900 border-gray-700">
                      <SelectValue placeholder="Seleccionar período" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-700">
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="weekly">Semanal</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                      <SelectItem value="quarterly">Trimestral</SelectItem>
                      <SelectItem value="yearly">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessLineId">Línea de Negocio</Label>
                    <Select name="businessLineId">
                      <SelectTrigger className="bg-gray-900 border-gray-700">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        {businessLines?.map((bl) => (
                          <SelectItem key={bl.id} value={bl.id.toString()}>
                            {bl.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="locationId">Ubicación</Label>
                    <Select name="locationId">
                      <SelectTrigger className="bg-gray-900 border-gray-700">
                        <SelectValue placeholder="Seleccionar..." />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        {locations?.map((loc) => (
                          <SelectItem key={loc.id} value={loc.id.toString()}>
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
                  className="border-gray-600"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#368A45] hover:bg-[#2D6E39]"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-[#368A45]" />
              <div>
                <div className="text-2xl font-bold text-white">{objectives?.length || 0}</div>
                <p className="text-xs text-gray-400">Objetivos Totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {objectives?.filter(o => o.isActive).length || 0}
                </div>
                <p className="text-xs text-gray-400">Objetivos Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="text-2xl font-bold text-white">
                  {objectives?.filter(o => {
                    const progress = calculateProgress(o.currentProgress, o.targetNumeric);
                    return progress >= 100;
                  }).length || 0}
                </div>
                <p className="text-xs text-gray-400">Metas Alcanzadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Objectives List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Lista de Objetivos</CardTitle>
          <CardDescription className="text-gray-400">
            Haz clic en el progreso para actualizarlo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Cargando objetivos...</div>
          ) : objectives && objectives.length > 0 ? (
            <div className="space-y-4">
              {objectives.map((objective) => {
                const progress = calculateProgress(objective.currentProgress, objective.targetNumeric);
                return (
                  <div
                    key={objective.id}
                    className="p-4 bg-gray-900 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-medium">{objective.serviceProduct}</h3>
                          <Badge variant={objective.isActive ? "default" : "secondary"} className={objective.isActive ? "bg-green-600" : "bg-gray-600"}>
                            {objective.isActive ? "Activo" : "Inactivo"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          Meta: {objective.targetValue} • {getPeriodLabel(objective.period)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-white"
                          onClick={() => {
                            updateObjective.mutate({
                              id: objective.id,
                              isActive: !objective.isActive,
                            });
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                          onClick={() => {
                            if (confirm("¿Estás seguro de eliminar este objetivo?")) {
                              deleteObjective.mutate({ id: objective.id });
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div 
                      className="cursor-pointer"
                      onClick={() => handleUpdateProgress(objective.id, objective.currentProgress || 0)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progreso</span>
                        <span className="text-sm text-white">
                          {objective.currentProgress || 0} / {objective.targetNumeric || objective.targetValue} ({progress}%)
                        </span>
                      </div>
                      <Progress 
                        value={progress} 
                        className="h-3 bg-gray-700"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No hay objetivos configurados. Crea el primero.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
