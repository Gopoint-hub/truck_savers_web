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
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronRight
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

type ChecklistStatus = "pendiente" | "en_progreso" | "completado";

const statusConfig: Record<ChecklistStatus, { label: string; icon: React.ElementType; color: string; bgColor: string }> = {
  pendiente: { label: "Pendiente", icon: Circle, color: "text-gray-500", bgColor: "bg-gray-100" },
  en_progreso: { label: "En Progreso", icon: Clock, color: "text-yellow-600", bgColor: "bg-yellow-50" },
  completado: { label: "Completado", icon: CheckCircle2, color: "text-green-600", bgColor: "bg-green-50" },
};

export default function SeoChecklist() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedAreas, setExpandedAreas] = useState<Record<string, boolean>>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({ area: "", item: "" });

  const { data: checklist = [], isLoading, refetch } = trpc.seoChecklist.list.useQuery();
  
  const updateMutation = trpc.seoChecklist.update.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Estado actualizado");
    },
    onError: () => {
      toast.error("Error al actualizar");
    },
  });

  const createMutation = trpc.seoChecklist.create.useMutation({
    onSuccess: () => {
      refetch();
      setIsAddDialogOpen(false);
      setNewItem({ area: "", item: "" });
      toast.success("Item agregado");
    },
    onError: () => {
      toast.error("Error al agregar item");
    },
  });

  // Agrupar items por área
  const groupedItems = useMemo(() => {
    const filtered = checklist.filter(item => {
      const matchesSearch = item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.area.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    const grouped: Record<string, typeof checklist> = {};
    filtered.forEach(item => {
      if (!grouped[item.area]) {
        grouped[item.area] = [];
      }
      grouped[item.area].push(item);
    });
    return grouped;
  }, [checklist, searchTerm, statusFilter]);

  // Estadísticas
  const stats = useMemo(() => {
    const total = checklist.length;
    const completado = checklist.filter(i => i.status === 'completado').length;
    const en_progreso = checklist.filter(i => i.status === 'en_progreso').length;
    const pendiente = checklist.filter(i => i.status === 'pendiente').length;
    const percentage = total > 0 ? Math.round((completado / total) * 100) : 0;
    return { total, completado, en_progreso, pendiente, percentage };
  }, [checklist]);

  // Áreas únicas para el formulario
  const uniqueAreas = useMemo(() => {
    return Array.from(new Set(checklist.map(item => item.area)));
  }, [checklist]);

  const toggleArea = (area: string) => {
    setExpandedAreas(prev => ({
      ...prev,
      [area]: !prev[area],
    }));
  };

  const handleStatusChange = (id: number, status: ChecklistStatus) => {
    updateMutation.mutate({ id, status });
  };

  const handleAddItem = () => {
    if (!newItem.area.trim() || !newItem.item.trim()) {
      toast.error("Completa todos los campos");
      return;
    }
    createMutation.mutate({
      area: newItem.area.trim(),
      item: newItem.item.trim(),
      status: "pendiente",
    });
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Checklist SEO</h1>
          <p className="text-gray-600 mt-1">Verificación técnica del sitio web</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2D6E39]">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Item
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Agregar Item al Checklist</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Área</Label>
                <Input
                  placeholder="Ej: Arquitectura, SEO Técnico, Navegación..."
                  value={newItem.area}
                  onChange={(e) => setNewItem(prev => ({ ...prev, area: e.target.value }))}
                  list="areas-list"
                  className="bg-white border-gray-300 text-gray-900"
                />
                <datalist id="areas-list">
                  {uniqueAreas.map(area => (
                    <option key={area} value={area} />
                  ))}
                </datalist>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Item</Label>
                <Input
                  placeholder="Descripción del item a verificar"
                  value={newItem.item}
                  onChange={(e) => setNewItem(prev => ({ ...prev, item: e.target.value }))}
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>
              <Button 
                onClick={handleAddItem} 
                className="w-full bg-[#368A45] hover:bg-[#2D6E39]"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Agregando..." : "Agregar"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-700">{stats.completado}</div>
            <div className="text-sm text-green-600">Completados</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-700">{stats.en_progreso}</div>
            <div className="text-sm text-yellow-600">En Progreso</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-700">{stats.pendiente}</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-gray-300 text-gray-900"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300 text-gray-900">
            <Filter className="h-4 w-4 mr-2 text-gray-500" />
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all" className="text-gray-900">Todos los estados</SelectItem>
            <SelectItem value="pendiente" className="text-gray-900">Pendiente</SelectItem>
            <SelectItem value="en_progreso" className="text-gray-900">En Progreso</SelectItem>
            <SelectItem value="completado" className="text-gray-900">Completado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Checklist by Area */}
      <div className="space-y-3">
        {Object.entries(groupedItems).map(([area, items]) => {
          const areaCompleted = items.filter(i => i.status === 'completado').length;
          const areaTotal = items.length;
          const areaPercentage = Math.round((areaCompleted / areaTotal) * 100);
          const isExpanded = expandedAreas[area] !== false; // Default to expanded

          return (
            <Collapsible key={area} open={isExpanded} onOpenChange={() => toggleArea(area)}>
              <Card className="bg-white border-gray-200 overflow-hidden">
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                        <CardTitle className="text-base font-semibold text-gray-900">
                          {area}
                        </CardTitle>
                        <span className="text-sm text-gray-500">
                          ({areaCompleted}/{areaTotal})
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#368A45] transition-all duration-300"
                            style={{ width: `${areaPercentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 w-12 text-right">
                          {areaPercentage}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-3">
                    <div className="space-y-2">
                      {items.map(item => {
                        const config = statusConfig[item.status as ChecklistStatus];
                        const StatusIcon = config.icon;
                        return (
                          <div 
                            key={item.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <StatusIcon className={`h-5 w-5 ${config.color} shrink-0`} />
                              <span className="text-sm text-gray-800 truncate">
                                {item.item}
                              </span>
                            </div>
                            <Select 
                              value={item.status ?? 'pendiente'} 
                              onValueChange={(value) => handleStatusChange(item.id, value as ChecklistStatus)}
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
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>

      {Object.keys(groupedItems).length === 0 && (
        <Card className="bg-white border-gray-200">
          <CardContent className="p-12 text-center">
            <div className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "No se encontraron items con los filtros aplicados"
                : "No hay items en el checklist"}
            </div>
            {!searchTerm && statusFilter === "all" && (
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-[#368A45] hover:bg-[#2D6E39]"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar primer item
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
