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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Users, 
  UserCheck, 
  Clock, 
  XCircle, 
  Edit2, 
  Trash2, 
  Download,
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

type WaitlistEntry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: "pendiente" | "contactado" | "inscrito" | "cancelado";
  notes: string | null;
  contactedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function CmsCourseWaitlist() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<WaitlistEntry | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedSubscribers, setSelectedSubscribers] = useState<number[]>([]);
  
  const utils = trpc.useUtils();
  const { data: entries, isLoading } = trpc.courseWaitlist.list.useQuery();
  const { data: subscribers } = trpc.subscribers.list.useQuery({});
  
  const updateEntry = trpc.courseWaitlist.update.useMutation({
    onSuccess: () => {
      utils.courseWaitlist.list.invalidate();
      setIsEditOpen(false);
      setEditingEntry(null);
      toast.success("Registro actualizado");
    },
    onError: (error) => {
      toast.error("Error al actualizar: " + error.message);
    },
  });

  const deleteEntry = trpc.courseWaitlist.delete.useMutation({
    onSuccess: () => {
      utils.courseWaitlist.list.invalidate();
      toast.success("Registro eliminado");
    },
    onError: (error) => {
      toast.error("Error al eliminar: " + error.message);
    },
  });

  const registerEntry = trpc.courseWaitlist.register.useMutation({
    onSuccess: () => {
      utils.courseWaitlist.list.invalidate();
      toast.success("Suscriptor importado a la lista de cursos");
    },
    onError: (error) => {
      if (error.message.includes("ya está registrado")) {
        toast.info("Este suscriptor ya está en la lista de cursos");
      } else {
        toast.error("Error al importar: " + error.message);
      }
    },
  });

  // Filter entries based on search and status
  const filteredEntries = entries?.filter((entry: WaitlistEntry) => {
    const matchesSearch = 
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.phone.includes(searchQuery);
    
    const matchesStatus = filterStatus === "all" || entry.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  }) || [];

  // Stats
  const stats = {
    total: entries?.length || 0,
    pendiente: entries?.filter((e: WaitlistEntry) => e.status === "pendiente").length || 0,
    contactado: entries?.filter((e: WaitlistEntry) => e.status === "contactado").length || 0,
    inscrito: entries?.filter((e: WaitlistEntry) => e.status === "inscrito").length || 0,
    cancelado: entries?.filter((e: WaitlistEntry) => e.status === "cancelado").length || 0,
  };

  const handleEditEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingEntry) return;
    const formData = new FormData(e.currentTarget);
    updateEntry.mutate({
      id: editingEntry.id,
      status: formData.get("status") as "pendiente" | "contactado" | "inscrito" | "cancelado",
      notes: formData.get("notes") as string || undefined,
    });
  };

  const handleImportSubscribers = async () => {
    if (selectedSubscribers.length === 0) {
      toast.error("Selecciona al menos un suscriptor para importar");
      return;
    }

    const subscribersToImport = subscribers?.filter((s: any) => selectedSubscribers.includes(s.id)) || [];
    
    for (const sub of subscribersToImport) {
      try {
        await registerEntry.mutateAsync({
          name: sub.name || sub.email.split('@')[0],
          email: sub.email,
          phone: sub.phone || "No proporcionado",
          city: sub.location || "No especificada",
        });
      } catch (error) {
        // Continue with next subscriber even if one fails
      }
    }

    setSelectedSubscribers([]);
    setIsImportOpen(false);
    toast.success(`Importación completada`);
  };

  const handleSelectSubscriber = (id: number) => {
    if (selectedSubscribers.includes(id)) {
      setSelectedSubscribers(selectedSubscribers.filter(i => i !== id));
    } else {
      setSelectedSubscribers([...selectedSubscribers, id]);
    }
  };

  const handleExportCSV = () => {
    if (!entries || entries.length === 0) {
      toast.error("No hay datos para exportar");
      return;
    }

    const headers = ["Nombre", "Email", "WhatsApp", "Ciudad", "Estado", "Notas", "Fecha Registro", "Fecha Contacto"];
    const rows = entries.map((e: WaitlistEntry) => [
      e.name,
      e.email,
      e.phone,
      e.city,
      e.status,
      e.notes || "",
      new Date(e.createdAt).toLocaleDateString("es-MX"),
      e.contactedAt ? new Date(e.contactedAt).toLocaleDateString("es-MX") : "",
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lista-espera-cursos-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Archivo CSV descargado");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendiente":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="w-3 h-3 mr-1" />Pendiente</Badge>;
      case "contactado":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Phone className="w-3 h-3 mr-1" />Contactado</Badge>;
      case "inscrito":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Inscrito</Badge>;
      case "cancelado":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="w-3 h-3 mr-1" />Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Filter subscribers not already in waitlist
  const availableSubscribers = subscribers?.filter((s: any) => 
    !entries?.some((e: WaitlistEntry) => e.email.toLowerCase() === s.email.toLowerCase())
  ) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-[#368A45]" />
            Lista de Espera - Cursos
          </h1>
          <p className="text-gray-600">Interesados en cursos presenciales</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Importar de Suscriptores
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Importar Suscriptores a Lista de Cursos</DialogTitle>
                <DialogDescription>
                  Selecciona los suscriptores que deseas agregar a la lista de espera de cursos presenciales
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                {availableSubscribers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Todos los suscriptores ya están en la lista de cursos</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {selectedSubscribers.length} seleccionados de {availableSubscribers.length} disponibles
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (selectedSubscribers.length === availableSubscribers.length) {
                            setSelectedSubscribers([]);
                          } else {
                            setSelectedSubscribers(availableSubscribers.map((s: any) => s.id));
                          }
                        }}
                      >
                        {selectedSubscribers.length === availableSubscribers.length ? "Deseleccionar todos" : "Seleccionar todos"}
                      </Button>
                    </div>
                    <div className="border rounded-lg max-h-[300px] overflow-y-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12"></TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Ubicación</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {availableSubscribers.map((sub: any) => (
                            <TableRow key={sub.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleSelectSubscriber(sub.id)}>
                              <TableCell>
                                <Checkbox
                                  checked={selectedSubscribers.includes(sub.id)}
                                  onCheckedChange={() => handleSelectSubscriber(sub.id)}
                                />
                              </TableCell>
                              <TableCell className="font-medium">{sub.name || "-"}</TableCell>
                              <TableCell>{sub.email}</TableCell>
                              <TableCell>{sub.location || "-"}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsImportOpen(false)}>
                  Cancelar
                </Button>
                <Button 
                  className="bg-[#368A45] hover:bg-[#2D6E39]"
                  onClick={handleImportSubscribers}
                  disabled={selectedSubscribers.length === 0 || registerEntry.isPending}
                >
                  {registerEntry.isPending ? "Importando..." : `Importar ${selectedSubscribers.length} suscriptores`}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Pendientes</p>
                <p className="text-2xl font-bold text-yellow-700">{stats.pendiente}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Contactados</p>
                <p className="text-2xl font-bold text-blue-700">{stats.contactado}</p>
              </div>
              <Phone className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Inscritos</p>
                <p className="text-2xl font-bold text-green-700">{stats.inscrito}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Cancelados</p>
                <p className="text-2xl font-bold text-red-700">{stats.cancelado}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, email, ciudad o teléfono..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="contactado">Contactado</SelectItem>
                <SelectItem value="inscrito">Inscrito</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-gray-500">Cargando...</div>
          ) : filteredEntries.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No hay registros en la lista de espera</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Ciudad</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Registro</TableHead>
                  <TableHead>Notas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry: WaitlistEntry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.name}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm">
                          <Mail className="h-3 w-3 text-gray-400" />
                          <a href={`mailto:${entry.email}`} className="text-blue-600 hover:underline">
                            {entry.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <a href={`https://wa.me/${entry.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                            {entry.phone}
                          </a>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-gray-400" />
                        {entry.city}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(entry.status)}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {new Date(entry.createdAt).toLocaleDateString("es-MX", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-sm text-gray-500">
                      {entry.notes || "-"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingEntry(entry);
                            setIsEditOpen(true);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            if (confirm("¿Estás seguro de eliminar este registro?")) {
                              deleteEntry.mutate({ id: entry.id });
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
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Registro</DialogTitle>
            <DialogDescription>
              Actualiza el estado y notas del interesado
            </DialogDescription>
          </DialogHeader>
          {editingEntry && (
            <form onSubmit={handleEditEntry}>
              <div className="space-y-4 py-4">
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="font-medium">{editingEntry.name}</p>
                  <p className="text-sm text-gray-600">{editingEntry.email}</p>
                  <p className="text-sm text-gray-600">{editingEntry.phone}</p>
                  <p className="text-sm text-gray-600">{editingEntry.city}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Estado</Label>
                  <Select name="status" defaultValue={editingEntry.status}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pendiente">Pendiente</SelectItem>
                      <SelectItem value="contactado">Contactado</SelectItem>
                      <SelectItem value="inscrito">Inscrito</SelectItem>
                      <SelectItem value="cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    defaultValue={editingEntry.notes || ""}
                    placeholder="Agregar notas sobre este interesado..."
                    rows={3}
                  />
                </div>
                {editingEntry.contactedAt && (
                  <p className="text-sm text-gray-500">
                    Contactado el: {new Date(editingEntry.contactedAt).toLocaleDateString("es-MX")}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-[#368A45] hover:bg-[#2D6E39]" disabled={updateEntry.isPending}>
                  {updateEntry.isPending ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
