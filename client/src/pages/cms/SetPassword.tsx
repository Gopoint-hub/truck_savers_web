import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Truck, Eye, EyeOff, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type TokenStatus = "loading" | "valid" | "invalid" | "expired" | "used";

interface TokenInfo {
  type: "invitation" | "password_reset";
  email: string;
  name: string;
}

export default function SetPasswordPage() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const token = new URLSearchParams(search).get('token');
  
  const [tokenStatus, setTokenStatus] = useState<TokenStatus>("loading");
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [tokenError, setTokenError] = useState("");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Password validation states
  const [validations, setValidations] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    passwordsMatch: false,
  });

  // Validate token on mount
  useEffect(() => {
    if (!token) {
      setTokenStatus("invalid");
      setTokenError("No se proporcionó un token válido");
      return;
    }
    validateToken();
  }, [token]);

  // Update password validations
  useEffect(() => {
    setValidations({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      passwordsMatch: password === confirmPassword && password.length > 0,
    });
  }, [password, confirmPassword]);

  const validateToken = async () => {
    try {
      const response = await fetch(`/api/auth/validate-token?token=${token}`);
      const data = await response.json();

      if (!data.valid) {
        if (data.error?.includes("expirado")) {
          setTokenStatus("expired");
        } else if (data.error?.includes("utilizado")) {
          setTokenStatus("used");
        } else {
          setTokenStatus("invalid");
        }
        setTokenError(data.error || "Token inválido");
        return;
      }

      setTokenInfo({
        type: data.type,
        email: data.email,
        name: data.name,
      });
      setTokenStatus("valid");
    } catch (error) {
      setTokenStatus("invalid");
      setTokenError("Error al validar el token");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate all requirements
    if (!validations.minLength || !validations.hasUppercase || !validations.hasNumber) {
      setError("La contraseña no cumple con los requisitos");
      return;
    }

    if (!validations.passwordsMatch) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
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

  // Loading state
  if (tokenStatus === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#368A45]" />
          <p className="text-gray-600">Validando enlace...</p>
        </div>
      </div>
    );
  }

  // Invalid/Expired/Used token states
  if (tokenStatus !== "valid") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-6 p-8 max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <Truck className="h-10 w-10 text-[#368A45]" />
            <span className="text-2xl font-bold text-gray-900">TTS CMS</span>
          </div>

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="h-8 w-8 text-red-500" />
          </div>

          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900">
              {tokenStatus === "expired" && "Enlace Expirado"}
              {tokenStatus === "used" && "Enlace Ya Utilizado"}
              {tokenStatus === "invalid" && "Enlace Inválido"}
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              {tokenError}
            </p>
          </div>

          <div className="w-full space-y-3">
            <Button
              onClick={() => setLocation("/cms/login")}
              className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white"
            >
              Ir a Iniciar Sesión
            </Button>
            
            {(tokenStatus === "expired" || tokenStatus === "invalid") && (
              <p className="text-sm text-gray-500 text-center">
                Si necesitas un nuevo enlace, contacta al administrador o usa "Recuperar contraseña".
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Valid token - show password form
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
            {tokenInfo?.type === "invitation" ? "Configura tu Contraseña" : "Nueva Contraseña"}
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {tokenInfo?.type === "invitation" 
              ? `¡Bienvenido ${tokenInfo?.name || ''}! Crea tu contraseña para acceder.`
              : "Ingresa tu nueva contraseña."}
          </p>
          {tokenInfo?.email && (
            <p className="text-sm text-[#368A45] mt-2 font-medium">
              {tokenInfo.email}
            </p>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Nueva Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
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
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Password Requirements */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">Requisitos de contraseña:</p>
            <ul className="space-y-1 text-sm">
              <li className={`flex items-center gap-2 ${validations.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                <CheckCircle className={`h-4 w-4 ${validations.minLength ? 'text-green-500' : 'text-gray-300'}`} />
                Mínimo 8 caracteres
              </li>
              <li className={`flex items-center gap-2 ${validations.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                <CheckCircle className={`h-4 w-4 ${validations.hasUppercase ? 'text-green-500' : 'text-gray-300'}`} />
                Al menos una letra mayúscula
              </li>
              <li className={`flex items-center gap-2 ${validations.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                <CheckCircle className={`h-4 w-4 ${validations.hasNumber ? 'text-green-500' : 'text-gray-300'}`} />
                Al menos un número
              </li>
              <li className={`flex items-center gap-2 ${validations.passwordsMatch ? 'text-green-600' : 'text-gray-500'}`}>
                <CheckCircle className={`h-4 w-4 ${validations.passwordsMatch ? 'text-green-500' : 'text-gray-300'}`} />
                Las contraseñas coinciden
              </li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#368A45] hover:bg-[#2D6E39] text-white"
            disabled={loading || !validations.minLength || !validations.hasUppercase || !validations.hasNumber || !validations.passwordsMatch}
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
        </form>
      </div>
    </div>
  );
}
