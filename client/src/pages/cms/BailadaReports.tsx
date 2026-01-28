import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Trash2, 
  FileText,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const reportSchema = z.object({
  date: z.date(),
  workOrderNumber: z.string().min(1, "Número de orden es requerido"),
  technician: z.string().min(1, "Técnico es requerido"),
  quoteAmount: z.string().min(1, "Monto es requerido"),
  saleClosure: z.enum(["si", "no", "parcialmente"]),
  objection: z.enum(["no_tengo_dinero", "no_tengo_tiempo", "carga_programada_regreso_luego", "otro"]).optional(),
  objectionDetails: z.string().optional(),
  partialReason: z.enum(["no_suficiente_dinero", "solo_trabajos_seguridad", "varias_etapas", "solo_trabajo_original", "otro"]).optional(),
  partialDetails: z.string().optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

export default function CmsBailadaReports() {
  const { user } = useAuth();

  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: reports, isLoading } = trpc.bailadaReports.list.useQuery();
  const { data: allUsers } = trpc.users.list.useQuery();

  const createMutation = trpc.bailadaReports.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([["bailadaReports", "list"]]);
      toast.success("Reporte guardado");
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      toast.error(error.message || "No se pudo guardar el reporte.");
    },
  });

  const deleteMutation = trpc.bailadaReports.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([["bailadaReports", "list"]]);
      toast.success("Reporte eliminado");
    },
  });

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      date: new Date(),
      workOrderNumber: "",
      technician: "",
      quoteAmount: "",
      saleClosure: "si",
    },
  });

  const saleClosureValue = form.watch("saleClosure");

  function onSubmit(values: ReportFormValues) {
    if (!user) return;
    createMutation.mutate({
      ...values,
      quotedBy: user.id,
    });
  }

  const filteredReports = reports?.filter(report => 
    report.workOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.technician.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getClosureBadge = (status: string) => {
    switch (status) {
      case "si":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"><CheckCircle2 className="w-3 h-3 mr-1" /> Sí</Badge>;
      case "no":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200"><XCircle className="w-3 h-3 mr-1" /> No</Badge>;
      case "parcialmente":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200"><AlertCircle className="w-3 h-3 mr-1" /> Parcial</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reporte de Bailadas</h1>
          <p className="text-muted-foreground">
            Gestiona los reportes de inspecciones y seguimiento comercial.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2d743a]">
              <Plus className="w-4 h-4 mr-2" /> Nuevo Reporte
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Nuevo Reporte de Bailada</DialogTitle>
              <DialogDescription>
                Ingresa los detalles de la inspección y el resultado de la venta.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fecha</FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                            onChange={(e) => field.onChange(new Date(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="workOrderNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Orden</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: OT-1234" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="technician"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Técnico</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre del técnico" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormItem>
                    <FormLabel>Cotización Realizada por</FormLabel>
                    <Input value={user?.name || user?.email || ""} disabled className="bg-muted" />
                  </FormItem>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="quoteAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monto de la Cotización</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: $1,500.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="saleClosure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cierre de Venta</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una opción" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="si">Sí</SelectItem>
                            <SelectItem value="no">No</SelectItem>
                            <SelectItem value="parcialmente">Parcialmente</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {saleClosureValue === "no" && (
                  <div className="space-y-4 p-4 bg-red-50 rounded-lg border border-red-100">
                    <FormField
                      control={form.control}
                      name="objection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-red-900">Objeciones</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Selecciona la objeción" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no_tengo_dinero">No tengo dinero</SelectItem>
                              <SelectItem value="no_tengo_tiempo">No tengo tiempo</SelectItem>
                              <SelectItem value="carga_programada_regreso_luego">Tengo una carga programada pero regreso al realizar el trabajo</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.watch("objection") === "otro" && (
                      <FormField
                        control={form.control}
                        name="objectionDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-red-900">Detalles de la objeción</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe la objeción..." 
                                className="bg-white min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}

                {saleClosureValue === "parcialmente" && (
                  <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <FormField
                      control={form.control}
                      name="partialReason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-yellow-900">Motivo</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Selecciona el motivo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="no_suficiente_dinero">No tengo suficiente dinero</SelectItem>
                              <SelectItem value="solo_trabajos_seguridad">Solo realizo trabajos de seguridad</SelectItem>
                              <SelectItem value="varias_etapas">Va a hacer el trabajo en varias etapas</SelectItem>
                              <SelectItem value="solo_trabajo_original">Solo quiso el trabajo por lo que vino originalmente</SelectItem>
                              <SelectItem value="otro">Otro</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {form.watch("partialReason") === "otro" && (
                      <FormField
                        control={form.control}
                        name="partialDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-yellow-900">Detalles del motivo</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe el motivo..." 
                                className="bg-white min-h-[100px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                )}

                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="bg-[#368A45] hover:bg-[#2d743a] w-full"
                    disabled={createMutation.isLoading}
                  >
                    {createMutation.isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...
                      </>
                    ) : (
                      "Guardar Reporte"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por orden o técnico..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Orden</TableHead>
              <TableHead>Técnico</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Cierre</TableHead>
              <TableHead>Cotizado por</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : filteredReports?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No se encontraron reportes.
                </TableCell>
              </TableRow>
            ) : (
              filteredReports?.map((report) => {
                const quotedByUser = allUsers?.find(u => u.id === report.quotedBy);
                return (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {format(new Date(report.date), "dd MMM, yyyy", { locale: es })}
                    </TableCell>
                    <TableCell>{report.workOrderNumber}</TableCell>
                    <TableCell>{report.technician}</TableCell>
                    <TableCell>{report.quoteAmount}</TableCell>
                    <TableCell>{getClosureBadge(report.saleClosure)}</TableCell>
                    <TableCell>{quotedByUser?.name || quotedByUser?.email || "Desconocido"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => {
                              if (confirm("¿Estás seguro de eliminar este reporte?")) {
                                deleteMutation.mutate({ id: report.id });
                              }
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
