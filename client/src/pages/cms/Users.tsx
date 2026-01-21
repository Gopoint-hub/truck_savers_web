import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users, Shield, User, Plus, Trash2, Mail, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function CmsUsers() {
  const utils = trpc.useUtils();
  const { data: users, isLoading } = trpc.users.list.useQuery();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserRole, setNewUserRole] = useState<"user" | "admin">("admin");
  const [sendingInvitationTo, setSendingInvitationTo] = useState<number | null>(null);
  
  const createUser = trpc.users.create.useMutation({
    onSuccess: () => {
      utils.users.list.invalidate();
      toast.success("Usuario creado exitosamente");
      setIsCreateDialogOpen(false);
      setNewUserEmail("");
      setNewUserName("");
      setNewUserRole("admin");
    },
    onError: (error) => {
      toast.error("Error al crear usuario: " + error.message);
    },
  });
  
  const updateRole = trpc.users.updateRole.useMutation({
    onSuccess: () => {
      utils.users.list.invalidate();
      toast.success("Rol actualizado exitosamente");
    },
    onError: (error) => {
      toast.error("Error al actualizar rol: " + error.message);
    },
  });
  
  const deleteUser = trpc.users.delete.useMutation({
    onSuccess: () => {
      utils.users.list.invalidate();
      toast.success("Usuario eliminado exitosamente");
    },
    onError: (error) => {
      toast.error("Error al eliminar usuario: " + error.message);
    },
  });

  const sendInvitation = trpc.users.sendInvitation.useMutation({
    onSuccess: () => {
      toast.success("Invitación enviada exitosamente");
      setSendingInvitationTo(null);
    },
    onError: (error) => {
      toast.error("Error al enviar invitación: " + error.message);
      setSendingInvitationTo(null);
    },
  });

  const handleRoleChange = (userId: number, newRole: "user" | "admin") => {
    if (confirm(`¿Estás seguro de cambiar el rol a ${newRole === 'admin' ? 'Administrador' : 'Usuario'}?`)) {
      updateRole.mutate({ userId, role: newRole });
    }
  };
  
  const handleDeleteUser = (userId: number, userName: string) => {
    if (confirm(`¿Estás seguro de eliminar al usuario "${userName}"? Esta acción no se puede deshacer.`)) {
      deleteUser.mutate({ userId });
    }
  };
  
  const handleCreateUser = () => {
    if (!newUserEmail) {
      toast.error("El email es requerido");
      return;
    }
    createUser.mutate({
      email: newUserEmail,
      name: newUserName || undefined,
      role: newUserRole,
    });
  };

  const handleSendInvitation = (userId: number) => {
    setSendingInvitationTo(userId);
    sendInvitation.mutate({ userId });
  };

  const adminCount = users?.filter(u => u.role === 'admin').length || 0;
  const userCount = users?.filter(u => u.role === 'user').length || 0;

  // Determinar si un usuario puede acceder (tiene openId vinculado)
  const canAccess = (user: { openId?: string | null }) => !!user.openId;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600 text-sm mt-0.5">Administra los usuarios y roles del CMS</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2d7339] text-white font-semibold">
              <Plus className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Nuevo Usuario</span>
              <span className="sm:hidden">Nuevo</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-gray-900 font-bold">Agregar Nuevo Usuario</DialogTitle>
              <DialogDescription className="text-gray-600">
                Crea un nuevo usuario con acceso al CMS. Después podrás enviarle una invitación por email.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-800 font-semibold">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-gray-800 font-semibold">Nombre (opcional)</Label>
                <Input
                  id="name"
                  placeholder="Nombre del usuario"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role" className="text-gray-800 font-semibold">Rol</Label>
                <Select value={newUserRole} onValueChange={(v) => setNewUserRole(v as "user" | "admin")}>
                  <SelectTrigger className="bg-white border-gray-300 text-gray-900">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem value="admin" className="text-gray-900">Administrador</SelectItem>
                    <SelectItem value="user" className="text-gray-900">Usuario</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="border-gray-300 text-gray-700 hover:text-gray-900"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleCreateUser}
                disabled={createUser.isPending}
                className="bg-[#368A45] hover:bg-[#2d7339] text-white font-semibold"
              >
                {createUser.isPending ? "Creando..." : "Crear Usuario"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-lg font-bold text-gray-900">{users?.length || 0}</div>
                <p className="text-[10px] text-gray-600 font-medium">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#368A45]" />
              <div>
                <div className="text-lg font-bold text-gray-900">{adminCount}</div>
                <p className="text-[10px] text-gray-600 font-medium">Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-lg font-bold text-gray-900">{userCount}</div>
                <p className="text-[10px] text-gray-600 font-medium">Usuarios</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-gray-900 text-sm font-bold">Lista de Usuarios</CardTitle>
          <CardDescription className="text-gray-600 text-xs">
            Usuarios registrados en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {isLoading ? (
            <div className="text-center py-6 text-gray-500 text-sm">Cargando usuarios...</div>
          ) : users && users.length > 0 ? (
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2.5 bg-gray-50 rounded-md border border-gray-200"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Avatar className="h-7 w-7 border border-gray-300">
                      <AvatarFallback className={`text-[10px] font-semibold ${
                        user.role === 'admin' ? 'bg-[#368A45] text-white' : 'bg-gray-200 text-gray-700'
                      }`}>
                        {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-semibold text-gray-900 truncate">
                          {user.name || 'Sin nombre'}
                        </p>
                        {canAccess(user) ? (
                          <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0" />
                        ) : (
                          <span className="text-[9px] px-1 py-0.5 bg-amber-100 text-amber-700 rounded font-medium flex-shrink-0">
                            Pendiente
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-600 truncate">
                        {user.email || '-'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge
                      variant={user.role === 'admin' ? "default" : "secondary"}
                      className={`text-[10px] px-1.5 py-0 hidden sm:inline-flex font-semibold ${user.role === 'admin' ? "bg-[#368A45] text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      {user.role === 'admin' ? 'Admin' : 'Usuario'}
                    </Badge>
                    {!canAccess(user) && user.email && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2 text-[10px] border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        onClick={() => handleSendInvitation(user.id)}
                        disabled={sendingInvitationTo === user.id}
                      >
                        {sendingInvitationTo === user.id ? (
                          <>
                            <Send className="h-3 w-3 mr-1 animate-pulse" />
                            <span className="hidden sm:inline">Enviando...</span>
                          </>
                        ) : (
                          <>
                            <Mail className="h-3 w-3 mr-1" />
                            <span className="hidden sm:inline">Invitar</span>
                          </>
                        )}
                      </Button>
                    )}
                    <Select
                      value={user.role}
                      onValueChange={(value) => handleRoleChange(user.id, value as "user" | "admin")}
                    >
                      <SelectTrigger className="w-[80px] sm:w-[100px] bg-white border-gray-300 text-xs h-7 text-gray-900">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="user" className="text-xs text-gray-900">Usuario</SelectItem>
                        <SelectItem value="admin" className="text-xs text-gray-900">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteUser(user.id, user.name || user.email || 'Usuario')}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 text-sm">
              No hay usuarios registrados
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-gray-900 text-sm font-bold">Información de Acceso</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2 bg-blue-50 rounded-md border border-blue-200">
              <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-gray-900 font-semibold text-xs">Invitaciones por Email</h4>
                <p className="text-[10px] text-gray-700">
                  Los usuarios nuevos recibirán un email con un enlace para acceder al CMS. 
                  Deben registrarse con el mismo email para vincular su cuenta.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 bg-green-50 rounded-md border border-green-200">
              <Shield className="h-4 w-4 text-[#368A45] mt-0.5" />
              <div>
                <h4 className="text-gray-900 font-semibold text-xs">Administrador</h4>
                <p className="text-[10px] text-gray-700">
                  Acceso completo al CMS. Puede gestionar todo el contenido y usuarios.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 bg-gray-100 rounded-md border border-gray-200">
              <User className="h-4 w-4 text-gray-500 mt-0.5" />
              <div>
                <h4 className="text-gray-900 font-semibold text-xs">Usuario</h4>
                <p className="text-[10px] text-gray-700">
                  Acceso limitado. Solo puede ver el sitio público.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
