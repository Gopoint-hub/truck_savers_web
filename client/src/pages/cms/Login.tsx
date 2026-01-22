import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Truck, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "login" | "setup" | "set-password";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSetup, setCheckingSetup] = useState(true);

  // Check if system needs initial setup
  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();
      
      if (data.user) {
        // Already logged in, redirect to CMS
        setLocation("/cms");
        return;
      }

      // Check if any users exist by trying to access setup endpoint
      // This is a simple check - in production you might want a dedicated endpoint
      setCheckingSetup(false);
    } catch (error) {
      setCheckingSetup(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      // Redirect to CMS
      setLocation("/cms");
    } catch (error) {
      setError("Error de conexión. Intente nuevamente.");
      setLoading(false);
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "El sistema ya está configurado") {
          setMode("login");
          setError("El sistema ya está configurado. Por favor inicie sesión.");
        } else {
          setError(data.error || "Error al configurar el sistema");
        }
        setLoading(false);
        return;
      }

      // Redirect to CMS
      setLocation("/cms");
    } catch (error) {
      setError("Error de conexión. Intente nuevamente.");
      setLoading(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al configurar contraseña");
        setLoading(false);
        return;
      }

      // Redirect to CMS
      setLocation("/cms");
    } catch (error) {
      setError("Error de conexión. Intente nuevamente.");
      setLoading(false);
    }
  };

  if (checkingSetup) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#368A45]" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-6 p-8 max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Truck className="h-10 w-10 text-[#368A45]" />
          <span className="text-2xl font-bold text-gray-900">TTS CMS</span>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            {mode === "login" && "Iniciar Sesión"}
            {mode === "setup" && "Configuración Inicial"}
            {mode === "set-password" && "Configurar Contraseña"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {mode === "login" && "Ingrese sus credenciales para acceder al panel"}
            {mode === "setup" && "Cree el primer usuario administrador"}
            {mode === "set-password" && "Configure su contraseña para acceder"}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              <button
                type="button"
                onClick={() => setMode("setup")}
                className="text-[#368A45] hover:underline"
              >
                ¿Primera vez? Configurar sistema
              </button>
            </div>
          </form>
        )}

        {/* Setup Form */}
        {mode === "setup" && (
          <form onSubmit={handleSetup} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="setup-email">Email</Label>
              <Input
                id="setup-email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="setup-password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="setup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Repita la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Configurando...
                </>
              ) : (
                "Crear Administrador"
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-[#368A45] hover:underline"
              >
                ¿Ya tienes cuenta? Iniciar sesión
              </button>
            </div>
          </form>
        )}

        {/* Set Password Form */}
        {mode === "set-password" && (
          <form onSubmit={handleSetPassword} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sp-email">Email</Label>
              <Input
                id="sp-email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sp-password">Nueva Contraseña</Label>
              <div className="relative">
                <Input
                  id="sp-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sp-confirm">Confirmar Contraseña</Label>
              <Input
                id="sp-confirm"
                type={showPassword ? "text" : "password"}
                placeholder="Repita la contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                "Guardar Contraseña"
              )}
            </Button>

            <div className="text-center text-sm text-gray-600">
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-[#368A45] hover:underline"
              >
                Volver a iniciar sesión
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
