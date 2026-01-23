import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordPage() {
  const [, setLocation] = useLocation();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Password validation states
  const [validations, setValidations] = useState({
    minLength: false,
    hasUppercase: false,
    hasNumber: false,
    passwordsMatch: false,
  });

  // Update password validations
  useEffect(() => {
    setValidations({
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasNumber: /[0-9]/.test(newPassword),
      passwordsMatch: newPassword === confirmPassword && newPassword.length > 0,
    });
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate all requirements
    if (!validations.minLength || !validations.hasUppercase || !validations.hasNumber) {
      setError("La nueva contraseña no cumple con los requisitos");
      return;
    }

    if (!validations.passwordsMatch) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (!currentPassword) {
      setError("Ingrese su contraseña actual");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al cambiar contraseña");
        setLoading(false);
        return;
      }

      setSuccess(data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLoading(false);

      // Redirect after 2 seconds
      setTimeout(() => {
        setLocation("/cms");
      }, 2000);
    } catch (error) {
      setError("Error de conexión. Intente nuevamente.");
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => setLocation("/cms")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al CMS
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Cambiar Contraseña</h1>
        <p className="text-gray-600 mt-1">
          Actualiza tu contraseña de acceso al sistema. Todas las demás sesiones serán cerradas.
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="current-password">Contraseña Actual</Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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

          <hr className="border-gray-200" />

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="new-password">Nueva Contraseña</Label>
            <Input
              id="new-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
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

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setLocation("/cms")}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#368A45] hover:bg-[#2D6E39] text-white"
              disabled={loading || !validations.minLength || !validations.hasUppercase || !validations.hasNumber || !validations.passwordsMatch || !currentPassword}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Guardando...
                </>
              ) : (
                "Cambiar Contraseña"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Security Note */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Nota de seguridad:</strong> Al cambiar tu contraseña, todas las sesiones activas en otros dispositivos serán cerradas automáticamente.
        </p>
      </div>
    </div>
  );
}
