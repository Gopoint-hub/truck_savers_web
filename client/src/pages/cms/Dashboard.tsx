import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, Target, Users, AlertTriangle, Clock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function CmsDashboard() {
  const { data: stats, isLoading } = trpc.dashboard.stats.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-4 w-full">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 text-sm mt-0.5">Panel de control - Marketing TTS</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-white border-gray-200 shadow-sm">
              <CardHeader className="pb-2 p-3">
                <Skeleton className="h-3 w-20 bg-gray-200" />
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <Skeleton className="h-6 w-12 bg-gray-200" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 text-sm mt-0.5">Panel de control - Marketing TTS</p>
      </div>

      {/* Stats Cards - Fixed grid layout */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full">
        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-1 p-3">
            <CardTitle className="text-xs font-semibold text-gray-700">
              Total Pendientes
            </CardTitle>
            <CheckSquare className="h-3.5 w-3.5 text-[#368A45] flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold text-gray-900">{stats?.tasks.total || 0}</div>
            <p className="text-[10px] text-gray-600 mt-0.5 font-medium">
              {stats?.tasks.pendiente || 0} pendientes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-1 p-3">
            <CardTitle className="text-xs font-semibold text-gray-700">
              En Progreso
            </CardTitle>
            <Clock className="h-3.5 w-3.5 text-yellow-600 flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold text-gray-900">{stats?.tasks.en_progreso || 0}</div>
            <p className="text-[10px] text-gray-600 mt-0.5 font-medium">
              tareas activas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-1 p-3">
            <CardTitle className="text-xs font-semibold text-gray-700">
              Completadas
            </CardTitle>
            <TrendingUp className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold text-gray-900">{stats?.tasks.completada || 0}</div>
            <p className="text-[10px] text-gray-600 mt-0.5 font-medium">
              tareas finalizadas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-1 p-3">
            <CardTitle className="text-xs font-semibold text-gray-700">
              Suscriptores
            </CardTitle>
            <Users className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-xl font-bold text-gray-900">{stats?.subscribers.total || 0}</div>
            <p className="text-[10px] text-gray-600 mt-0.5 font-medium">
              {stats?.subscribers.active || 0} activos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Tasks & Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
        {/* High Priority Tasks */}
        <Card className="bg-white border-gray-200 shadow-sm w-full">
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-gray-900 flex items-center gap-1.5 text-sm font-bold">
              <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
              Tareas de Alta Prioridad
            </CardTitle>
            <CardDescription className="text-gray-600 text-xs">
              Pendientes que requieren atención inmediata
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {stats?.highPriorityTasks && stats.highPriorityTasks.length > 0 ? (
              <div className="space-y-2">
                {stats.highPriorityTasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start justify-between p-2 bg-gray-50 rounded-md border border-gray-200 gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                        {task.title}
                      </p>
                      {task.dueDate && (
                        <p className="text-[10px] text-gray-600 mt-0.5 font-medium">
                          Vence: {new Date(task.dueDate).toLocaleDateString('es-MX')}
                        </p>
                      )}
                    </div>
                    <Badge variant="destructive" className="ml-2 text-[10px] px-1.5 py-0 bg-red-600 text-white font-semibold flex-shrink-0">
                      Alta
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs">No hay tareas de alta prioridad pendientes</p>
            )}
          </CardContent>
        </Card>

        {/* Objectives Progress */}
        <Card className="bg-white border-gray-200 shadow-sm w-full">
          <CardHeader className="p-3 pb-2">
            <CardTitle className="text-gray-900 flex items-center gap-1.5 text-sm font-bold">
              <Target className="h-4 w-4 text-[#368A45] flex-shrink-0" />
              Progreso de Objetivos
            </CardTitle>
            <CardDescription className="text-gray-600 text-xs">
              Metas mensuales activas
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            {stats?.objectives.withProgress && stats.objectives.withProgress.length > 0 ? (
              <div className="space-y-3">
                {stats.objectives.withProgress.slice(0, 5).map((obj) => (
                  <div key={obj.id} className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-gray-900 truncate flex-1 min-w-0">
                        {obj.serviceProduct}
                      </p>
                      <span className="text-[10px] text-gray-700 font-medium whitespace-nowrap flex-shrink-0">
                        {obj.currentProgress || 0} / {obj.targetNumeric || obj.targetValue}
                      </span>
                    </div>
                    <Progress 
                      value={obj.progressPercentage || 0} 
                      className="h-1.5 bg-gray-200"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs">No hay objetivos activos configurados</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card className="bg-white border-gray-200 shadow-sm w-full">
        <CardHeader className="p-3 pb-2">
          <CardTitle className="text-gray-900 text-sm font-bold">Actividad Reciente</CardTitle>
          <CardDescription className="text-gray-600 text-xs">
            Últimas tareas agregadas
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          {stats?.recentTasks && stats.recentTasks.length > 0 ? (
            <div className="space-y-2">
              {stats.recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start justify-between p-2 bg-gray-50 rounded-md border border-gray-200 gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 line-clamp-2">
                      {task.title}
                    </p>
                    <p className="text-[10px] text-gray-600 mt-0.5 font-medium">
                      {new Date(task.createdAt).toLocaleDateString('es-MX', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <Badge 
                    variant={
                      task.status === 'completada' ? 'default' :
                      task.status === 'en_progreso' ? 'secondary' :
                      'outline'
                    }
                    className={`text-[10px] px-1.5 py-0 font-semibold flex-shrink-0 ${
                      task.status === 'completada' ? 'bg-green-600 text-white' :
                      task.status === 'en_progreso' ? 'bg-yellow-500 text-gray-900' :
                      'border-gray-300 text-gray-700 bg-gray-100'
                    }`}
                  >
                    {task.status === 'pendiente' ? 'Pendiente' :
                     task.status === 'en_progreso' ? 'En progreso' :
                     task.status === 'completada' ? 'Completada' : task.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-xs">No hay actividad reciente</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
