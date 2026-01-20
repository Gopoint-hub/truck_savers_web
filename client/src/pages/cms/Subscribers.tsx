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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
        
        // Skip header row
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Suscriptores</h1>
          <p className="text-gray-400 mt-1">Base de datos de clientes para newsletter</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-gray-600">
                <Upload className="h-4 w-4 mr-2" />
                Importar CSV
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Importar Suscriptores</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Sube un archivo CSV con los suscriptores. Formato: email, nombre, teléfono, empresa, ubicación
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <input
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-900 border border-dashed border-gray-600 hover:border-[#368A45] h-32"
                  variant="outline"
                  disabled={bulkCreate.isPending}
                >
                  {bulkCreate.isPending ? (
                    "Importando..."
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-gray-400">Haz clic para seleccionar archivo CSV</span>
                    </div>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#368A45] hover:bg-[#2D6E39]">
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white">
              <DialogHeader>
                <DialogTitle>Agregar Suscriptor</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Agrega un nuevo suscriptor manualmente
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateSubscriber}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="bg-gray-900 border-gray-700"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Nombre completo"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="+1 234 567 8900"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Nombre de empresa"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Houston, TX"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select name="language" defaultValue="es">
                      <SelectTrigger className="bg-gray-900 border-gray-700">
                        <SelectValue placeholder="Seleccionar idioma" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-white">{stats?.total || 0}</div>
                <p className="text-xs text-gray-400">Total Suscriptores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <UserCheck className="h-8 w-8 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-white">{stats?.active || 0}</div>
                <p className="text-xs text-gray-400">Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <UserX className="h-8 w-8 text-red-500" />
              <div>
                <div className="text-2xl font-bold text-white">{stats?.inactive || 0}</div>
                <p className="text-xs text-gray-400">Inactivos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por email, nombre o empresa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>
        <Select value={filterActive} onValueChange={setFilterActive}>
          <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="inactive">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Subscribers Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Lista de Suscriptores</CardTitle>
          <CardDescription className="text-gray-400">
            {subscribers?.length || 0} suscriptores encontrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Cargando suscriptores...</div>
          ) : subscribers && subscribers.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Email</TableHead>
                    <TableHead className="text-gray-400">Nombre</TableHead>
                    <TableHead className="text-gray-400">Empresa</TableHead>
                    <TableHead className="text-gray-400">Ubicación</TableHead>
                    <TableHead className="text-gray-400">Estado</TableHead>
                    <TableHead className="text-gray-400 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscribers.map((subscriber) => (
                    <TableRow key={subscriber.id} className="border-gray-700">
                      <TableCell className="text-white font-medium">
                        {subscriber.email}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {subscriber.name || "-"}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {subscriber.company || "-"}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {subscriber.location || "-"}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={subscriber.isActive ? "default" : "secondary"}
                          className={subscriber.isActive ? "bg-green-600" : "bg-gray-600"}
                        >
                          {subscriber.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
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
                            className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            onClick={() => {
                              if (confirm("¿Estás seguro de eliminar este suscriptor?")) {
                                deleteSubscriber.mutate({ id: subscriber.id });
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No hay suscriptores que mostrar
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
