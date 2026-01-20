import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { getLoginUrl } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import { 
  LayoutDashboard, 
  LogOut, 
  PanelLeft, 
  Users, 
  CheckSquare, 
  Target, 
  Mail, 
  UserCircle,
  Truck
} from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { DashboardLayoutSkeleton } from '@/components/DashboardLayoutSkeleton';
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/cms" },
  { icon: CheckSquare, label: "Pendientes", path: "/cms/tasks" },
  { icon: Target, label: "Metas y Objetivos", path: "/cms/objectives" },
  { icon: UserCircle, label: "Suscriptores", path: "/cms/subscribers" },
  { icon: Mail, label: "Newsletter", path: "/cms/newsletters" },
  { icon: Users, label: "Usuarios", path: "/cms/users" },
];

const SIDEBAR_WIDTH_KEY = "cms-sidebar-width";
const DEFAULT_WIDTH = 260;
const MIN_WIDTH = 200;
const MAX_WIDTH = 400;

export default function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString());
  }, [sidebarWidth]);

  if (loading) {
    return <DashboardLayoutSkeleton />
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-10 w-10 text-[#368A45]" />
            <span className="text-2xl font-bold text-white">TTS CMS</span>
          </div>
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-xl font-semibold tracking-tight text-center text-white">
              Iniciar sesión para continuar
            </h1>
            <p className="text-sm text-gray-400 text-center max-w-sm">
              El acceso a este panel de administración requiere autenticación.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            size="lg"
            className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white shadow-lg hover:shadow-xl transition-all"
          >
            Iniciar sesión
          </Button>
        </div>
      </div>
    );
  }

  // Check if user is admin
  if (user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="h-10 w-10 text-red-500" />
            <span className="text-2xl font-bold text-white">Acceso Denegado</span>
          </div>
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm text-gray-400 text-center max-w-sm">
              No tienes permisos de administrador para acceder a este panel.
              Contacta al administrador si crees que esto es un error.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = '/';
            }}
            size="lg"
            variant="outline"
            className="w-full"
          >
            Volver al sitio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": `${sidebarWidth}px`,
        } as CSSProperties
      }
    >
      <CmsLayoutContent setSidebarWidth={setSidebarWidth}>
        {children}
      </CmsLayoutContent>
    </SidebarProvider>
  );
}

type CmsLayoutContentProps = {
  children: React.ReactNode;
  setSidebarWidth: (width: number) => void;
};

function CmsLayoutContent({
  children,
  setSidebarWidth,
}: CmsLayoutContentProps) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const activeMenuItem = menuItems.find(item => item.path === location) || menuItems[0];
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isCollapsed) {
      setIsResizing(false);
    }
  }, [isCollapsed]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const sidebarLeft = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const newWidth = e.clientX - sidebarLeft;
      if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r border-gray-800 bg-gray-950"
          disableTransition={isResizing}
        >
          <SidebarHeader className="h-16 justify-center border-b border-gray-800">
            <div className="flex items-center gap-3 px-2 transition-all w-full">
              <button
                onClick={toggleSidebar}
                className="h-8 w-8 flex items-center justify-center hover:bg-gray-800 rounded-lg transition-colors focus:outline-none shrink-0"
                aria-label="Toggle navigation"
              >
                <PanelLeft className="h-4 w-4 text-gray-400" />
              </button>
              {!isCollapsed ? (
                <div className="flex items-center gap-2 min-w-0">
                  <Truck className="h-6 w-6 text-[#368A45]" />
                  <span className="font-bold tracking-tight truncate text-white">
                    TTS CMS
                  </span>
                </div>
              ) : null}
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0 bg-gray-950">
            <SidebarMenu className="px-2 py-3">
              {menuItems.map(item => {
                const isActive = location === item.path || 
                  (item.path === '/cms' && location === '/cms/dashboard');
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setLocation(item.path)}
                      tooltip={item.label}
                      className={`h-10 transition-all font-normal ${
                        isActive 
                          ? "bg-[#368A45]/20 text-[#368A45] hover:bg-[#368A45]/30" 
                          : "text-gray-400 hover:text-white hover:bg-gray-800"
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${isActive ? "text-[#368A45]" : ""}`}
                      />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-3 border-t border-gray-800 bg-gray-950">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 rounded-lg px-1 py-1 hover:bg-gray-800 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none">
                  <Avatar className="h-9 w-9 border border-gray-700 shrink-0">
                    <AvatarFallback className="text-xs font-medium bg-[#368A45] text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-sm font-medium truncate leading-none text-white">
                      {user?.name || "-"}
                    </p>
                    <p className="text-xs text-gray-500 truncate mt-1.5">
                      {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-gray-900 border-gray-700">
                <DropdownMenuItem
                  onClick={() => setLocation('/')}
                  className="cursor-pointer text-gray-300 hover:text-white focus:text-white"
                >
                  <Truck className="mr-2 h-4 w-4" />
                  <span>Ir al sitio</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-400 focus:text-red-400"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#368A45]/50 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => {
            if (isCollapsed) return;
            setIsResizing(true);
          }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset className="bg-gray-900">
        {isMobile && (
          <div className="flex border-b border-gray-800 h-14 items-center justify-between bg-gray-900 px-2 backdrop-blur sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-9 w-9 rounded-lg bg-gray-800 text-white" />
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-1">
                  <span className="tracking-tight text-white">
                    {activeMenuItem?.label ?? "Menu"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </div>
  );
}
