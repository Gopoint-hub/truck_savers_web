import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Shield, User } from "lucide-react";
import { toast } from "sonner";

export default function CmsUsers() {
  const utils = trpc.useUtils();
  const { data: users, isLoading } = trpc.users.list.useQuery();
  
  const updateRole = trpc.users.updateRole.useMutation({
    onSuccess: () => {
      utils.users.list.invalidate();
      toast.success("Rol actualizado exitosamente");
    },
    onError: (error) => {
      toast.error("Error al actualizar rol: " + error.message);
    },
  });

  const handleRoleChange = (userId: number, newRole: "user" | "admin") => {
    if (confirm(`¿Estás seguro de cambiar el rol a ${newRole === 'admin' ? 'Administrador' : 'Usuario'}?`)) {
      updateRole.mutate({ userId, role: newRole });
    }
  };

  const adminCount = users?.filter(u => u.role === 'admin').length || 0;
  const userCount = users?.filter(u => u.role === 'user').length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Gestión de Usuarios</h1>
        <p className="text-gray-400 mt-1">Administra los usuarios y roles del CMS</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-white">{users?.length || 0}</div>
                <p className="text-xs text-gray-400">Total Usuarios</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-[#368A45]" />
              <div>
                <div className="text-2xl font-bold text-white">{adminCount}</div>
                <p className="text-xs text-gray-400">Administradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <User className="h-8 w-8 text-gray-400" />
              <div>
                <div className="text-2xl font-bold text-white">{userCount}</div>
                <p className="text-xs text-gray-400">Usuarios Regulares</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Lista de Usuarios</CardTitle>
          <CardDescription className="text-gray-400">
            Usuarios registrados en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-400">Cargando usuarios...</div>
          ) : users && users.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-400">Usuario</TableHead>
                    <TableHead className="text-gray-400">Email</TableHead>
                    <TableHead className="text-gray-400">Rol Actual</TableHead>
                    <TableHead className="text-gray-400">Último Acceso</TableHead>
                    <TableHead className="text-gray-400 text-right">Cambiar Rol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-gray-700">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-gray-700">
                            <AvatarFallback className={`text-xs font-medium ${
                              user.role === 'admin' ? 'bg-[#368A45] text-white' : 'bg-gray-700 text-gray-300'
                            }`}>
                              {user.name?.charAt(0).toUpperCase() || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-white font-medium">
                            {user.name || 'Sin nombre'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {user.email || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.role === 'admin' ? "default" : "secondary"}
                          className={user.role === 'admin' ? "bg-[#368A45]" : "bg-gray-600"}
                        >
                          {user.role === 'admin' ? (
                            <><Shield className="h-3 w-3 mr-1" /> Admin</>
                          ) : (
                            <><User className="h-3 w-3 mr-1" /> Usuario</>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        {user.lastSignedIn ? new Date(user.lastSignedIn).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : '-'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Select
                          value={user.role}
                          onValueChange={(value) => handleRoleChange(user.id, value as "user" | "admin")}
                        >
                          <SelectTrigger className="w-[140px] bg-gray-900 border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="user">Usuario</SelectItem>
                            <SelectItem value="admin">Administrador</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              No hay usuarios registrados
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Información de Roles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-gray-900 rounded-lg">
              <Shield className="h-5 w-5 text-[#368A45] mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Administrador</h4>
                <p className="text-sm text-gray-400">
                  Acceso completo al CMS. Puede crear, editar y eliminar contenido.
                  Puede gestionar usuarios y cambiar roles.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-gray-900 rounded-lg">
              <User className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Usuario</h4>
                <p className="text-sm text-gray-400">
                  Acceso limitado. Puede ver el contenido pero no tiene acceso al CMS.
                  Solo puede acceder al sitio público.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
