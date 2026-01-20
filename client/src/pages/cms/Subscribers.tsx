import { trpc } from "@/lib/trpc";
import { useState, useRef } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, Trash2, Search, Users, UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";

export default function CmsSubscribers() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<string>("all");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const utils = trpc.useUtils();
  const { data: subscribers, isLoading } = trpc.subscribers.list.useQuery({
    search: searchQuery || undefined,
    isActive: filterActive === "all" ? undefined : filterActive === "active",
  });
  const { data: stats } = trpc.subscribers.stats.useQuery();
  
  const createSubscriber = trpc.subscribers.create.useMutation({
    onSuccess: () => {
      utils.subscribers.list.invalidate();
      utils.subscribers.stats.invalidate();
      setIsCreateOpen(false);
      toast.success("Suscriptor agregado exitosamente");
    },
    onError: (error) => {
      toast.error("Error al agregar suscriptor: " + error.message);
    },
  });

  const bulkCreate = trpc.subscribers.bulkCreate.useMutation({
    onSuccess: (data) => {
      utils.subscribers.list.invalidate();
      utils.subscribers.stats.invalidate();
      setIsUploadOpen(false);
      toast.success(`${data.count} suscriptores importados`);
    },
    onError: (error) => {
      toast.error("Error al importar: " + error.message);
    },
  });

  const updateSubscriber = trpc.subscribers.update.useMutation({
    onSuccess: () => {
      utils.subscribers.list.invalidate();
      utils.subscribers.stats.invalidate();
      toast.success("Suscriptor actualizado");
    },
    onError: (error) => {
      toast.error("Error al actualizar: " + error.message);
    },
  });

  const deleteSubscriber = trpc.subscribers.delete.useMutation({
    onSuccess: () => {
      utils.subscribers.list.invalidate();
      utils.subscribers.stats.invalidate();
      toast.success("Suscriptor eliminado");
    },
    onError: (error) => {
      toast.error("Error al eliminar: " + error.message);
    },
  });

  const handleCreateSubscriber = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createSubscriber.mutate({
      email: formData.get("email") as string,
      name: formData.get("name") as string || undefined,
      phone: formData.get("phone") as string || undefined,
      company: formData.get("company") as string || undefined,
      location: formData.get("location") as string || undefined,
      language: (formData.get("language") as "es" | "en") || "es",
      source: "manual",
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        const dataLines = lines.slice(1);
        
        const subscribers = dataLines.map(line => {
          const [email, name, phone, company, location] = line.split(',').map(s => s.trim());
          return {
            email: email || '',
            name: name || undefined,
            phone: phone || undefined,
            company: company || undefined,
            location: location || undefined,
            language: "es" as const,
            source: "csv_import",
          };
        }).filter(s => s.email && s.email.includes('@'));

        if (subscribers.length === 0) {
          toast.error("No se encontraron emails válidos en el archivo");
          return;
        }

        bulkCreate.mutate(subscribers);
      } catch (error) {
        toast.error("Error al procesar el archivo CSV");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Suscriptores</h1>
          <p className="text-gray-500 text-sm mt-0.5">Base de datos de clientes para newsletter</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-gray-200 text-sm h-8">
                <Upload className="h-3.5 w-3.5 mr-1.5" />
                CSV
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base">Importar Suscriptores</DialogTitle>
                <DialogDescription className="text-gray-500 text-sm">
                  Formato: email, nombre, teléfono, empresa, ubicación
                </DialogDescription>
              </DialogHeader>
              <div className="py-3">
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-50 border border-dashed border-gray-300 hover:border-[#368A45] h-24"
                  variant="outline"
                  disabled={bulkCreate.isPending}
                >
                  {bulkCreate.isPending ? (
                    "Importando..."
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <Upload className="h-6 w-6 text-gray-400" />
                      <span className="text-gray-500 text-xs">Seleccionar archivo CSV</span>
                    </div>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#368A45] hover:bg-[#2D6E39] text-sm h-8">
                <Plus className="h-3.5 w-3.5 mr-1.5" />
                Agregar
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white border-gray-200 text-gray-900 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-base">Agregar Suscriptor</DialogTitle>
                <DialogDescription className="text-gray-500 text-sm">
                  Agrega un nuevo suscriptor manualmente
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSubscriber}>
                <div className="space-y-3 py-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="bg-white border-gray-200 text-sm h-9"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-sm">Nombre</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        className="bg-white border-gray-200 text-sm h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm">Teléfono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 234 567"
                        className="bg-white border-gray-200 text-sm h-9"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="company" className="text-sm">Empresa</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Empresa"
                        className="bg-white border-gray-200 text-sm h-9"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="location" className="text-sm">Ubicación</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Houston, TX"
                        className="bg-white border-gray-200 text-sm h-9"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="language" className="text-sm">Idioma</Label>
                    <Select name="language" defaultValue="es">
                      <SelectTrigger className="bg-white border-gray-200 text-sm h-9">
                        <SelectValue placeholder="Idioma" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="es" className="text-sm">Español</SelectItem>
                        <SelectItem value="en" className="text-sm">English</SelectItem>
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
                    disabled={createSubscriber.isPending}
                  >
                    {createSubscriber.isPending ? "Agregando..." : "Agregar"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-lg font-bold text-gray-900">{stats?.total || 0}</div>
                <p className="text-[10px] text-gray-400">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-lg font-bold text-gray-900">{stats?.active || 0}</div>
                <p className="text-[10px] text-gray-400">Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-lg font-bold text-gray-900">{stats?.inactive || 0}</div>
                <p className="text-[10px] text-gray-400">Inactivos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[150px]">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <Input
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-white border-gray-200 text-sm h-8"
          />
        </div>
        <Select value={filterActive} onValueChange={setFilterActive}>
          <SelectTrigger className="w-[120px] bg-white border-gray-200 text-sm h-8">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-200">
            <SelectItem value="all" className="text-sm">Todos</SelectItem>
            <SelectItem value="active" className="text-sm">Activos</SelectItem>
            <SelectItem value="inactive" className="text-sm">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subscribers List */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-gray-900 text-sm font-semibold">Lista de Suscriptores</CardTitle>
          <CardDescription className="text-gray-500 text-xs">
            {subscribers?.length || 0} suscriptores encontrados
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {isLoading ? (
            <div className="text-center py-6 text-gray-400 text-sm">Cargando suscriptores...</div>
          ) : subscribers && subscribers.length > 0 ? (
            <div className="space-y-2">
              {subscribers.map((subscriber) => (
                <div
                  key={subscriber.id}
                  className="flex items-center justify-between p-2.5 bg-gray-50 rounded-md border border-gray-100"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">
                      {subscriber.email}
                    </p>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">
                      {subscriber.name || "-"} • {subscriber.company || "-"} • {subscriber.location || "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={subscriber.isActive ? "default" : "secondary"}
                      className={`text-[10px] px-1.5 py-0 ${subscriber.isActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                      {subscriber.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-gray-600 text-[10px] h-6 px-2"
                      onClick={() => {
                        updateSubscriber.mutate({
                          id: subscriber.id,
                          isActive: !subscriber.isActive,
                        });
                      }}
                    >
                      {subscriber.isActive ? "Desactivar" : "Activar"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-400 hover:text-red-500 hover:bg-red-50 h-6 w-6"
                      onClick={() => {
                        if (confirm("¿Estás seguro de eliminar este suscriptor?")) {
                          deleteSubscriber.mutate({ id: subscriber.id });
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
              No hay suscriptores que mostrar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
