import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Truck, Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AuthMode = "login" | "forgot-password";

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if already logged in
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();
      
      if (data.user) {
        // Already logged in, redirect to CMS
        const returnTo = new URLSearchParams(search).get('returnTo') || '/cms';
        setLocation(returnTo);
        return;
      }
      setCheckingAuth(false);
    } catch (error) {
      setCheckingAuth(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
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

      // Redirect to CMS or returnTo
      const returnTo = new URLSearchParams(search).get('returnTo') || '/cms';
      setLocation(returnTo);
    } catch (error) {
      setError("Error de conexión. Intente nuevamente.");
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al procesar solicitud");
        setLoading(false);
        return;
      }

      setSuccess(data.message);
      setLoading(false);
    } catch (error) {
      setError("Error de conexión. Intente nuevamente.");
      setLoading(false);
    }
  };

  if (checkingAuth) {
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
            {mode === "forgot-password" && "Recuperar Contraseña"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {mode === "login" && "Ingrese sus credenciales para acceder al panel"}
            {mode === "forgot-password" && "Ingrese su email para recibir un enlace de recuperación"}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Success message */}
        {success && (
          <div className="w-full p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
            {success}
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
                onClick={() => {
                  setMode("forgot-password");
                  setError("");
                  setSuccess("");
                }}
                className="text-[#368A45] hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        )}

        {/* Forgot Password Form */}
        {mode === "forgot-password" && (
          <form onSubmit={handleForgotPassword} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
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
                  Enviando...
                </>
              ) : (
                "Enviar enlace de recuperación"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
                className="text-sm text-[#368A45] hover:underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver a iniciar sesión
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
