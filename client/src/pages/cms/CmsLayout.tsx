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
  Truck,
  Menu
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
const DEFAULT_WIDTH = 220;
const MIN_WIDTH = 180;
const MAX_WIDTH = 320;

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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-6 p-6 max-w-sm w-full bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Truck className="h-8 w-8 text-[#368A45]" />
            <span className="text-xl font-bold text-gray-900">TTS CMS</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-lg font-semibold text-center text-gray-900">
              Iniciar sesión
            </h1>
            <p className="text-sm text-gray-500 text-center">
              El acceso requiere autenticación.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl('/cms');
            }}
            size="default"
            className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white"
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-6 p-6 max-w-sm w-full bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Truck className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold text-gray-900">Acceso Denegado</span>
          </div>
          <p className="text-sm text-gray-500 text-center">
            No tienes permisos de administrador para acceder a este panel.
          </p>
          <Button
            onClick={() => {
              window.location.href = '/';
            }}
            size="default"
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
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="relative" ref={sidebarRef}>
        <Sidebar
          collapsible="icon"
          className="border-r border-gray-200 bg-white"
          disableTransition={isResizing}
        >
          <SidebarHeader className="h-12 justify-center border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2 px-2 transition-all w-full">
              <button
                onClick={toggleSidebar}
                className="h-7 w-7 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors focus:outline-none shrink-0"
                aria-label="Toggle navigation"
              >
                <PanelLeft className="h-4 w-4 text-gray-500" />
              </button>
              {!isCollapsed ? (
                <div className="flex items-center gap-1.5 min-w-0">
                  <Truck className="h-5 w-5 text-[#368A45]" />
                  <span className="font-semibold text-sm tracking-tight truncate text-gray-900">
                    TTS CMS
                  </span>
                </div>
              ) : null}
            </div>
          </SidebarHeader>

          <SidebarContent className="gap-0 bg-white">
            <SidebarMenu className="px-2 py-2">
              {menuItems.map(item => {
                const isActive = location === item.path || 
                  (item.path === '/cms' && location === '/cms/dashboard');
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setLocation(item.path)}
                      tooltip={item.label}
                      className={`h-9 text-sm transition-all font-normal ${
                        isActive 
                          ? "bg-[#368A45]/10 text-[#368A45] hover:bg-[#368A45]/15" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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

          <SidebarFooter className="p-2 border-t border-gray-200 bg-white">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-md px-1 py-1 hover:bg-gray-100 transition-colors w-full text-left group-data-[collapsible=icon]:justify-center focus:outline-none">
                  <Avatar className="h-7 w-7 border border-gray-200 shrink-0">
                    <AvatarFallback className="text-xs font-medium bg-[#368A45] text-white">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                    <p className="text-xs font-medium truncate leading-none text-gray-900">
                      {user?.name || "-"}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">
                      {user?.role === 'admin' ? 'Administrador' : 'Usuario'}
                    </p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-white border-gray-200">
                <DropdownMenuItem
                  onClick={() => setLocation('/')}
                  className="cursor-pointer text-gray-600 hover:text-gray-900 text-sm"
                >
                  <Truck className="mr-2 h-3.5 w-3.5" />
                  <span>Ir al sitio</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer text-red-500 focus:text-red-500 text-sm"
                >
                  <LogOut className="mr-2 h-3.5 w-3.5" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div
          className={`absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-[#368A45]/30 transition-colors ${isCollapsed ? "hidden" : ""}`}
          onMouseDown={() => {
            if (isCollapsed) return;
            setIsResizing(true);
          }}
          style={{ zIndex: 50 }}
        />
      </div>

      <SidebarInset className="bg-gray-50">
        {isMobile && (
          <div className="flex border-b border-gray-200 h-12 items-center justify-between bg-white px-3 backdrop-blur sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="h-8 w-8 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200" />
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#368A45]" />
                <span className="text-sm font-medium text-gray-900">
                  {activeMenuItem?.label ?? "Menu"}
                </span>
              </div>
            </div>
          </div>
        )}
        <main className="flex-1 p-3 md:p-4 lg:p-5 overflow-x-hidden max-w-full">{children}</main>
      </SidebarInset>
    </div>
  );
}
