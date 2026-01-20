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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Panel de control - Marketing TTS</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-24 bg-gray-700" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 bg-gray-700" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Panel de control - Marketing TTS</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total Pendientes
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-[#368A45]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.tasks.total || 0}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats?.tasks.pendiente || 0} pendientes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              En Progreso
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.tasks.en_progreso || 0}</div>
            <p className="text-xs text-gray-500 mt-1">
              tareas activas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Completadas
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.tasks.completada || 0}</div>
            <p className="text-xs text-gray-500 mt-1">
              tareas finalizadas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Suscriptores
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.subscribers.total || 0}</div>
            <p className="text-xs text-gray-500 mt-1">
              {stats?.subscribers.active || 0} activos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Tasks & Objectives */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* High Priority Tasks */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Tareas de Alta Prioridad
            </CardTitle>
            <CardDescription className="text-gray-400">
              Pendientes que requieren atención inmediata
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.highPriorityTasks && stats.highPriorityTasks.length > 0 ? (
              <div className="space-y-3">
                {stats.highPriorityTasks.slice(0, 5).map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {task.title}
                      </p>
                      {task.dueDate && (
                        <p className="text-xs text-gray-500 mt-1">
                          Vence: {new Date(task.dueDate).toLocaleDateString('es-MX')}
                        </p>
                      )}
                    </div>
                    <Badge variant="destructive" className="ml-2">
                      Alta
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No hay tareas de alta prioridad pendientes</p>
            )}
          </CardContent>
        </Card>

        {/* Objectives Progress */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-[#368A45]" />
              Progreso de Objetivos
            </CardTitle>
            <CardDescription className="text-gray-400">
              Metas mensuales activas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats?.objectives.withProgress && stats.objectives.withProgress.length > 0 ? (
              <div className="space-y-4">
                {stats.objectives.withProgress.slice(0, 5).map((obj) => (
                  <div key={obj.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white truncate flex-1">
                        {obj.serviceProduct}
                      </p>
                      <span className="text-xs text-gray-400 ml-2">
                        {obj.currentProgress || 0} / {obj.targetNumeric || obj.targetValue}
                      </span>
                    </div>
                    <Progress 
                      value={obj.progressPercentage || 0} 
                      className="h-2 bg-gray-700"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No hay objetivos activos configurados</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Actividad Reciente</CardTitle>
          <CardDescription className="text-gray-400">
            Últimas tareas agregadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats?.recentTasks && stats.recentTasks.length > 0 ? (
            <div className="space-y-3">
              {stats.recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 bg-gray-900 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
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
                    className={
                      task.status === 'completada' ? 'bg-green-600' :
                      task.status === 'en_progreso' ? 'bg-yellow-600' :
                      'border-gray-600 text-gray-400'
                    }
                  >
                    {task.status === 'pendiente' ? 'Pendiente' :
                     task.status === 'en_progreso' ? 'En progreso' :
                     task.status === 'completada' ? 'Completada' : task.status}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No hay actividad reciente</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
