import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Trash2, 
  Edit,
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  TrendingUp,
  DollarSign,
  BarChart3,
  Target,
  MapPin
} from "lucide-react";
import { format, startOfMonth, endOfMonth } from "date-fns";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const reportSchema = z.object({
  date: z.date(),
  workOrderNumber: z.string().min(1, "Número de orden es requerido"),
  technician: z.string().min(1, "Técnico es requerido"),
  quoteAmount: z.number().min(0, "Monto debe ser positivo"),
  saleClosure: z.enum(["si", "no", "parcialmente"]),
  authorizedAmount: z.number().default(0),
  objection: z.enum(["no_tengo_dinero", "no_tengo_tiempo", "carga_programada_regreso_luego", "otro"]).optional(),
  objectionDetails: z.string().optional(),
  partialReason: z.enum(["no_suficiente_dinero", "solo_trabajos_seguridad", "varias_etapas", "solo_trabajo_original", "otro"]).optional(),
  partialDetails: z.string().optional(),
});

type ReportFormValues = z.infer<typeof reportSchema>;

// Helper to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
  }).format(amount / 100);
};

// Helper to parse currency input
const parseCurrencyInput = (value: string): number => {
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : Math.round(parsed * 100);
};

export default function CmsBailadaReports() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<any>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date>(startOfMonth(new Date()));
  const [endDate, setEndDate] = useState<Date>(endOfMonth(new Date()));
  
  // Currency input display state
  const [quoteAmountDisplay, setQuoteAmountDisplay] = useState("");
  const [authorizedAmountDisplay, setAuthorizedAmountDisplay] = useState("");

  // Get user location for auto-fill
  const userLocation = (user as any)?.userLocation || "houston";

  // Queries with filters
  const { data: reports, isLoading } = trpc.bailadaReports.list.useQuery({
    location: locationFilter !== "all" ? locationFilter as any : undefined,
    startDate,
    endDate,
  });
  
  const { data: stats } = trpc.bailadaReports.stats.useQuery({
    location: locationFilter !== "all" ? locationFilter as any : undefined,
    startDate,
    endDate,
  });
  
  const { data: allUsers } = trpc.users.list.useQuery();

  const createMutation = trpc.bailadaReports.create.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [["bailadaReports"]] });
      toast.success("Reporte guardado");
      setIsDialogOpen(false);
      setEditingReport(null);
      form.reset();
      setQuoteAmountDisplay("");
      setAuthorizedAmountDisplay("");
    },
    onError: (error) => {
      toast.error(error.message || "No se pudo guardar el reporte.");
    },
  });

  const updateMutation = trpc.bailadaReports.update.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [["bailadaReports"]] });
      toast.success("Reporte actualizado");
      setIsDialogOpen(false);
      setEditingReport(null);
      form.reset();
      setQuoteAmountDisplay("");
      setAuthorizedAmountDisplay("");
    },
    onError: (error) => {
      toast.error(error.message || "No se pudo actualizar el reporte.");
    },
  });

  const deleteMutation = trpc.bailadaReports.delete.useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [["bailadaReports"]] });
      toast.success("Reporte eliminado");
    },
  });

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      date: new Date(),
      workOrderNumber: "",
      technician: "",
      quoteAmount: 0,
      saleClosure: "si",
      authorizedAmount: 0,
    },
  });

  const saleClosureValue = form.watch("saleClosure");
  const quoteAmountValue = form.watch("quoteAmount");

  // Update authorized amount based on sale closure
  useEffect(() => {
    if (saleClosureValue === "si") {
      form.setValue("authorizedAmount", quoteAmountValue);
      setAuthorizedAmountDisplay(formatCurrency(quoteAmountValue));
    } else if (saleClosureValue === "no") {
      form.setValue("authorizedAmount", 0);
      setAuthorizedAmountDisplay("$0.00");
    }
  }, [saleClosureValue, quoteAmountValue, form]);

  // Handle edit
  const handleEdit = (report: any) => {
    setEditingReport(report);
    form.reset({
      date: new Date(report.date),
      workOrderNumber: report.workOrderNumber,
      technician: report.technician,
      quoteAmount: report.quoteAmount,
      saleClosure: report.saleClosure,
      authorizedAmount: report.authorizedAmount || 0,
      objection: report.objection || undefined,
      objectionDetails: report.objectionDetails || undefined,
      partialReason: report.partialReason || undefined,
      partialDetails: report.partialDetails || undefined,
    });
    setQuoteAmountDisplay(formatCurrency(report.quoteAmount));
    setAuthorizedAmountDisplay(formatCurrency(report.authorizedAmount || 0));
    setIsDialogOpen(true);
  };

  function onSubmit(values: ReportFormValues) {
    if (!user) return;
    
    const payload = {
      ...values,
      quotedBy: user.id,
      location: userLocation as "houston" | "dallas" | "monterrey",
    };

    if (editingReport) {
      updateMutation.mutate({
        id: editingReport.id,
        ...values,
      });
    } else {
      createMutation.mutate(payload);
    }
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

  const getLocationBadge = (location: string) => {
    const colors: Record<string, string> = {
      houston: "bg-blue-100 text-blue-800 border-blue-200",
      dallas: "bg-purple-100 text-purple-800 border-purple-200",
      monterrey: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return (
      <Badge className={`${colors[location] || "bg-gray-100"} hover:${colors[location]}`}>
        <MapPin className="w-3 h-3 mr-1" />
        {location.charAt(0).toUpperCase() + location.slice(1)}
      </Badge>
    );
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setEditingReport(null);
      form.reset();
      setQuoteAmountDisplay("");
      setAuthorizedAmountDisplay("");
    }
    setIsDialogOpen(open);
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
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button className="bg-[#368A45] hover:bg-[#2d743a]">
              <Plus className="w-4 h-4 mr-2" /> Nuevo Reporte
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingReport ? "Editar Reporte" : "Nuevo Reporte de Bailada"}</DialogTitle>
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
                        <FormLabel>Fecha y Hora</FormLabel>
                        <FormControl>
                          <Input 
                            type="datetime-local" 
                            value={field.value ? format(field.value, "yyyy-MM-dd'T'HH:mm") : ""}
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
                    <FormLabel>Ubicación</FormLabel>
                    <Input 
                      value={userLocation.charAt(0).toUpperCase() + userLocation.slice(1)} 
                      disabled 
                      className="bg-muted" 
                    />
                  </FormItem>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>Cotización Realizada por</FormLabel>
                    <Input value={user?.name || user?.email || ""} disabled className="bg-muted" />
                  </FormItem>
                  <FormField
                    control={form.control}
                    name="quoteAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monto de la Cotización</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input 
                              placeholder="0.00"
                              className="pl-7"
                              value={quoteAmountDisplay}
                              onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9.]/g, '');
                                setQuoteAmountDisplay(value);
                                const cents = parseCurrencyInput(value);
                                field.onChange(cents);
                              }}
                              onBlur={() => {
                                setQuoteAmountDisplay(formatCurrency(field.value));
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="saleClosure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cierre de Venta</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
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
                  <FormField
                    control={form.control}
                    name="authorizedAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monto Autorizado</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input 
                              placeholder="0.00"
                              className="pl-7"
                              disabled={saleClosureValue !== "parcialmente"}
                              value={authorizedAmountDisplay}
                              onChange={(e) => {
                                if (saleClosureValue === "parcialmente") {
                                  const value = e.target.value.replace(/[^0-9.]/g, '');
                                  setAuthorizedAmountDisplay(value);
                                  const cents = parseCurrencyInput(value);
                                  field.onChange(cents);
                                }
                              }}
                              onBlur={() => {
                                setAuthorizedAmountDisplay(formatCurrency(field.value));
                              }}
                            />
                          </div>
                        </FormControl>
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
                          <Select onValueChange={field.onChange} value={field.value}>
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
                          <Select onValueChange={field.onChange} value={field.value}>
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
                    disabled={createMutation.isPending || updateMutation.isPending}
                  >
                    {(createMutation.isPending || updateMutation.isPending) ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Guardando...
                      </>
                    ) : (
                      editingReport ? "Actualizar Reporte" : "Guardar Reporte"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cantidad de Bailes</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalReports || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cantidad de Cierres</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats?.totalClosures || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">% Efectividad</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats?.effectivenessRate || 0}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monto Cotizado</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats?.totalQuoted || 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monto Autorizado</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(stats?.totalAuthorized || 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa Conversión</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats?.conversionRate || 0}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por orden o técnico..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Date Range */}
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={format(startDate, "yyyy-MM-dd")}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="w-[140px]"
          />
          <span className="text-muted-foreground">a</span>
          <Input
            type="date"
            value={format(endDate, "yyyy-MM-dd")}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="w-[140px]"
          />
        </div>

        {/* Location Filter Buttons */}
        <div className="flex items-center gap-1">
          <Button 
            variant={locationFilter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setLocationFilter("all")}
          >
            Todas
          </Button>
          <Button 
            variant={locationFilter === "houston" ? "default" : "outline"} 
            size="sm"
            onClick={() => setLocationFilter("houston")}
            className={locationFilter === "houston" ? "bg-blue-600 hover:bg-blue-700" : ""}
          >
            Houston
          </Button>
          <Button 
            variant={locationFilter === "dallas" ? "default" : "outline"} 
            size="sm"
            onClick={() => setLocationFilter("dallas")}
            className={locationFilter === "dallas" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            Dallas
          </Button>
          <Button 
            variant={locationFilter === "monterrey" ? "default" : "outline"} 
            size="sm"
            onClick={() => setLocationFilter("monterrey")}
            className={locationFilter === "monterrey" ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            Monterrey
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha/Hora</TableHead>
              <TableHead>Orden</TableHead>
              <TableHead>Técnico</TableHead>
              <TableHead>Ubicación</TableHead>
              <TableHead>Monto Cotizado</TableHead>
              <TableHead>Cierre</TableHead>
              <TableHead>Monto Autorizado</TableHead>
              <TableHead>Cotizado por</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : filteredReports?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                  No se encontraron reportes.
                </TableCell>
              </TableRow>
            ) : (
              filteredReports?.map((report) => {
                const quotedByUser = allUsers?.find(u => u.id === report.quotedBy);
                return (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">
                      {format(new Date(report.date), "dd MMM, yyyy HH:mm", { locale: es })}
                    </TableCell>
                    <TableCell>{report.workOrderNumber}</TableCell>
                    <TableCell>{report.technician}</TableCell>
                    <TableCell>{getLocationBadge(report.location)}</TableCell>
                    <TableCell>{formatCurrency(report.quoteAmount)}</TableCell>
                    <TableCell>{getClosureBadge(report.saleClosure)}</TableCell>
                    <TableCell className={report.authorizedAmount > 0 ? "text-green-600 font-medium" : ""}>
                      {formatCurrency(report.authorizedAmount || 0)}
                    </TableCell>
                    <TableCell>{quotedByUser?.name || quotedByUser?.email || "Desconocido"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(report)}>
                            <Edit className="w-4 h-4 mr-2" /> Editar
                          </DropdownMenuItem>
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
