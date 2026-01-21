import { trpc } from "@/lib/trpc";
import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Plus, Upload, Trash2, Search, Users, UserCheck, UserX, Edit2, CheckSquare, XSquare } from "lucide-react";
import { toast } from "sonner";

export default function CmsSubscribers() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterActive, setFilterActive] = useState<string>("all");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
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
      setIsEditOpen(false);
      setEditingSubscriber(null);
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

  const bulkDelete = trpc.subscribers.bulkDelete.useMutation({
    onSuccess: (data) => {
      utils.subscribers.list.invalidate();
      utils.subscribers.stats.invalidate();
      setSelectedIds([]);
      toast.success(`${data.deleted} suscriptores eliminados`);
    },
    onError: (error) => {
      toast.error("Error al eliminar: " + error.message);
    },
  });

  const bulkUpdateStatus = trpc.subscribers.bulkUpdateStatus.useMutation({
    onSuccess: (data) => {
      utils.subscribers.list.invalidate();
      utils.subscribers.stats.invalidate();
      setSelectedIds([]);
      toast.success(`${data.updated} suscriptores actualizados`);
    },
    onError: (error) => {
      toast.error("Error al actualizar: " + error.message);
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

  const handleEditSubscriber = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingSubscriber) return;
    const formData = new FormData(e.currentTarget);
    updateSubscriber.mutate({
      id: editingSubscriber.id,
      email: formData.get("email") as string,
      name: formData.get("name") as string || undefined,
      phone: formData.get("phone") as string || undefined,
      company: formData.get("company") as string || undefined,
      location: formData.get("location") as string || undefined,
      language: (formData.get("language") as "es" | "en") || "es",
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

  const handleSelectAll = () => {
    if (selectedIds.length === subscribers?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(subscribers?.map(s => s.id) || []);
    }
  };

  const handleSelectOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suscriptores</h1>
          <p className="text-gray-600">Base de datos de clientes para newsletter</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importar CSV
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Importar Suscriptores</DialogTitle>
                <DialogDescription>
                  Formato CSV: email, nombre, teléfono, empresa, ubicación
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
                  className="w-full bg-gray-50 border border-dashed border-gray-300 hover:border-[#368A45] h-32"
                  variant="outline"
                  disabled={bulkCreate.isPending}
                >
                  {bulkCreate.isPending ? (
                    "Importando..."
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-gray-600">Seleccionar archivo CSV</span>
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Suscriptor</DialogTitle>
                <DialogDescription>
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
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre</Label>
                      <Input id="name" name="name" placeholder="Nombre completo" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" name="phone" placeholder="+1 234 567 8900" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Empresa</Label>
                      <Input id="company" name="company" placeholder="Nombre de empresa" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <Input id="location" name="location" placeholder="Houston, TX" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Idioma</Label>
                    <Select name="language" defaultValue="es">
                      <SelectTrigger>
                        <SelectValue placeholder="Idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-[#368A45] hover:bg-[#2D6E39]" disabled={createSubscriber.isPending}>
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
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.total || 0}</div>
              <p className="text-sm text-gray-600">Total Suscriptores</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.active || 0}</div>
              <p className="text-sm text-gray-600">Activos</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{stats?.inactive || 0}</div>
              <p className="text-sm text-gray-600">Inactivos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar por email, nombre o empresa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterActive} onValueChange={setFilterActive}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="inactive">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="bg-gray-50 border rounded-lg p-3 flex items-center gap-4">
          <span className="text-sm text-gray-600">{selectedIds.length} seleccionados</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => bulkUpdateStatus.mutate({ ids: selectedIds, isActive: true })}
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            Activar
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => bulkUpdateStatus.mutate({ ids: selectedIds, isActive: false })}
          >
            <XSquare className="w-4 h-4 mr-2" />
            Desactivar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={() => {
              if (confirm(`¿Eliminar ${selectedIds.length} suscriptores?`)) {
                bulkDelete.mutate({ ids: selectedIds });
              }
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar
          </Button>
        </div>
      )}

      {/* Subscribers Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Lista de Suscriptores</CardTitle>
          <CardDescription>{subscribers?.length || 0} suscriptores encontrados</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12 text-gray-500">Cargando suscriptores...</div>
          ) : subscribers && subscribers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedIds.length === subscribers.length && subscribers.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Ubicación</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fuente</TableHead>
                  <TableHead className="w-24">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(subscriber.id)}
                        onCheckedChange={() => handleSelectOne(subscriber.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>{subscriber.name || "-"}</TableCell>
                    <TableCell>{subscriber.company || "-"}</TableCell>
                    <TableCell>{subscriber.location || "-"}</TableCell>
                    <TableCell>
                      <Badge className={subscriber.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {subscriber.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{subscriber.source || "manual"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setEditingSubscriber(subscriber);
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                          onClick={() => {
                            if (confirm("¿Eliminar este suscriptor?")) {
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
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No hay suscriptores que mostrar</p>
              <p className="text-gray-400 text-sm">Agrega suscriptores manualmente o importa un CSV</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Suscriptor</DialogTitle>
            <DialogDescription>Modifica los datos del suscriptor</DialogDescription>
          </DialogHeader>
          {editingSubscriber && (
            <form onSubmit={handleEditSubscriber}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email *</Label>
                  <Input
                    id="edit-email"
                    name="email"
                    type="email"
                    defaultValue={editingSubscriber.email}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Nombre</Label>
                    <Input id="edit-name" name="name" defaultValue={editingSubscriber.name || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Teléfono</Label>
                    <Input id="edit-phone" name="phone" defaultValue={editingSubscriber.phone || ""} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-company">Empresa</Label>
                    <Input id="edit-company" name="company" defaultValue={editingSubscriber.company || ""} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-location">Ubicación</Label>
                    <Input id="edit-location" name="location" defaultValue={editingSubscriber.location || ""} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-language">Idioma</Label>
                  <Select name="language" defaultValue={editingSubscriber.language || "es"}>
                    <SelectTrigger>
                      <SelectValue placeholder="Idioma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#368A45] hover:bg-[#2D6E39]" disabled={updateSubscriber.isPending}>
                  {updateSubscriber.isPending ? "Guardando..." : "Guardar"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
