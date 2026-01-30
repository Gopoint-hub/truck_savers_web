import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, DollarSign, Fuel, Clock, Send, CheckCircle } from "lucide-react";

interface ApuCalculatorProps {
  onLeadSubmit?: (data: LeadData) => void;
}

interface LeadData {
  name: string;
  phone: string;
  email: string;
  hoursPerDay: number;
  dieselPrice: number;
  monthlySavings: number;
  annualSavings: number;
}

export default function ApuCalculator({ onLeadSubmit }: ApuCalculatorProps) {
  const [hoursPerDay, setHoursPerDay] = useState(10);
  const [dieselPrice, setDieselPrice] = useState(3.70);
  const [showResults, setShowResults] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  
  // Lead form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  // Cálculos
  // Sin APU: 1 GAL/hora, Con APU: 0.2 GAL/hora
  const gallonsSavedPerHour = 0.8; // 1 - 0.2
  const dailySavingsGallons = hoursPerDay * gallonsSavedPerHour;
  const dailySavingsDollars = dailySavingsGallons * dieselPrice;
  const weeklySavings = dailySavingsDollars * 6; // 6 días de trabajo
  const monthlySavings = weeklySavings * 4;
  const annualDieselSavings = monthlySavings * 12;
  
  // Ahorros adicionales
  const oilChangeSavings = 1100; // 2 cambios de aceite menos al año
  const engineWearSavings = 3000; // Desgaste de motor, inyectores, bomba, turbo
  const roadServiceSavings = 700; // Road service por baterías
  
  const totalAnnualSavings = annualDieselSavings + oilChangeSavings + engineWearSavings + roadServiceSavings;

  const handleCalculate = () => {
    setShowResults(true);
  };

  const handleGetQuote = () => {
    setShowLeadForm(true);
  };

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    
    const leadData: LeadData = {
      name,
      phone,
      email,
      hoursPerDay,
      dieselPrice,
      monthlySavings,
      annualSavings: totalAnnualSavings,
    };

    // Enviar datos al backend (si existe el callback)
    if (onLeadSubmit) {
      onLeadSubmit(leadData);
    }

    // También podemos enviar por WhatsApp
    const whatsappMessage = encodeURIComponent(
      `Hola, me interesa cotizar un Go Green APU.\n\n` +
      `Nombre: ${name}\n` +
      `Teléfono: ${phone}\n` +
      `Email: ${email}\n\n` +
      `Según la calculadora, mi ahorro estimado sería:\n` +
      `- Mensual: $${monthlySavings.toFixed(2)}\n` +
      `- Anual: $${totalAnnualSavings.toFixed(2)}\n\n` +
      `¿Podrían darme más información?`
    );
    
    // Abrir WhatsApp en nueva pestaña
    window.open(`https://wa.me/17134555572?text=${whatsappMessage}`, '_blank');
    
    setLeadSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Calcula tu Ahorro con Go Green APU
        </h2>
        <p className="text-gray-600">
          Descubre cuánto dinero estás perdiendo sin un APU
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <Label htmlFor="hours" className="text-gray-700 font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-600" />
            Horas diarias con camión prendido y parado
          </Label>
          <Input
            id="hours"
            type="number"
            min="1"
            max="24"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="text-lg font-semibold border-green-300 focus:border-green-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="diesel" className="text-gray-700 font-semibold flex items-center gap-2">
            <Fuel className="w-4 h-4 text-green-600" />
            Precio del diésel ($/galón)
          </Label>
          <Input
            id="diesel"
            type="number"
            min="1"
            max="10"
            step="0.01"
            value={dieselPrice}
            onChange={(e) => setDieselPrice(Number(e.target.value))}
            className="text-lg font-semibold border-green-300 focus:border-green-500"
          />
        </div>
      </div>

      {/* Calculate Button */}
      {!showResults && (
        <Button
          onClick={handleCalculate}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg"
          size="lg"
        >
          <Calculator className="w-5 h-5 mr-2" />
          CALCULAR MI AHORRO
        </Button>
      )}

      {/* Results */}
      {showResults && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Comparison */}
          <div className="bg-white rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
              Comparación de Consumo por Hora
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-600 font-semibold mb-1">Sin APU</p>
                <p className="text-3xl font-bold text-red-700">1 GAL</p>
                <p className="text-xs text-red-500">por hora</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-600 font-semibold mb-1">Con APU</p>
                <p className="text-3xl font-bold text-green-700">0.2 GAL</p>
                <p className="text-xs text-green-500">por hora</p>
              </div>
            </div>
            <p className="text-center mt-4 text-green-700 font-bold text-lg">
              = 80% de ahorro en combustible
            </p>
          </div>

          {/* Savings Breakdown */}
          <div className="bg-white rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Tu Ahorro Estimado en Diésel
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Ahorro diario</span>
                <span className="font-bold text-gray-800">${dailySavingsDollars.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Ahorro semanal</span>
                <span className="font-bold text-gray-800">${weeklySavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100 bg-green-50 px-3 rounded">
                <span className="text-green-700 font-semibold">Ahorro mensual</span>
                <span className="font-bold text-green-700 text-xl">${monthlySavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Ahorro anual en diésel</span>
                <span className="font-bold text-gray-800">${annualDieselSavings.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Additional Savings */}
          <div className="bg-white rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Ahorros Adicionales al Año
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Cambios de aceite (2 menos/año)</span>
                <span className="font-bold text-gray-800">${oilChangeSavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Desgaste motor, inyectores, bomba, turbo</span>
                <span className="font-bold text-gray-800">${engineWearSavings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600">Road service por baterías</span>
                <span className="font-bold text-gray-800">${roadServiceSavings.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white text-center">
            <p className="text-green-100 mb-2">Dinero que estás perdiendo por no tener un APU</p>
            <p className="text-5xl font-bold mb-2">${totalAnnualSavings.toFixed(2)}</p>
            <p className="text-green-100">al año</p>
          </div>

          {/* ROI */}
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 text-center">
            <p className="text-amber-800 font-semibold">
              ⏱️ Retorno de inversión estimado: <span className="font-bold">6 meses a 1 año y 2 meses</span>
            </p>
            <p className="text-amber-600 text-sm mt-1">
              (Depende del modelo y uso)
            </p>
          </div>

          {/* Monthly Payment Calculator */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-4 text-center">
              💳 ¿Y si lo financias?
            </h3>
            <div className="bg-white rounded-lg p-4 mb-4">
              <div className="text-center mb-3">
                <p className="text-sm text-gray-600">APU Remanufacturado</p>
                <p className="text-2xl font-bold text-blue-800">$9,950 USD</p>
                <p className="text-xs text-gray-500">Equipo + Instalación</p>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <p className="text-center text-gray-600 text-sm mb-1">Pago mensual desde</p>
                <p className="text-center text-3xl font-bold text-blue-600">$246<span className="text-lg">/mes</span></p>
              </div>
            </div>
            
            {/* Comparison */}
            <div className="bg-green-100 rounded-lg p-4 border border-green-300">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-gray-600">Tu ahorro mensual</p>
                  <p className="text-lg font-bold text-green-700">${monthlySavings.toFixed(0)}</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-2xl">-</span>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Pago mensual</p>
                  <p className="text-lg font-bold text-blue-700">$246</p>
                </div>
              </div>
              <div className="border-t border-green-300 mt-3 pt-3 text-center">
                <p className="text-sm text-green-800 font-semibold">✅ Ganancia neta desde el día 1</p>
                <p className="text-2xl font-bold text-green-700">${(monthlySavings - 246).toFixed(0)}/mes</p>
                <p className="text-xs text-green-600 mt-1">¡El APU se paga solo!</p>
              </div>
            </div>
            
            {/* Financing WhatsApp Button */}
            <a
              href={`https://wa.me/17134555572?text=${encodeURIComponent(`Hola, me interesa financiar un Go Green APU Remanufacturado.\n\nSegún la calculadora:\n- Mi ahorro mensual sería: $${monthlySavings.toFixed(0)}\n- Pago mensual: $246\n- Ganancia neta: $${(monthlySavings - 246).toFixed(0)}/mes\n\n¿Podrían darme más información sobre el financiamiento?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Preguntar por Financiamiento
            </a>
          </div>

          {/* Lead Form or CTA */}
          {!showLeadForm && !leadSubmitted && (
            <div className="space-y-4">
              <Button
                onClick={handleGetQuote}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg"
                size="lg"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                COTIZAR AHORA
              </Button>
              <p className="text-center text-gray-500 text-sm">
                Déjanos tus datos y te contactamos con la mejor opción para ti
              </p>
            </div>
          )}

          {/* Lead Form */}
          {showLeadForm && !leadSubmitted && (
            <form onSubmit={handleSubmitLead} className="bg-white rounded-xl p-6 border border-green-200 space-y-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                Recibe tu cotización personalizada
              </h3>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-semibold">
                  Nombre completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="border-green-300 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-semibold">
                  Teléfono / WhatsApp *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (___) ___-____"
                  className="border-green-300 focus:border-green-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-semibold">
                  Correo electrónico *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="border-green-300 focus:border-green-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg"
                size="lg"
              >
                <Send className="w-5 h-5 mr-2" />
                ENVIAR
              </Button>
            </form>
          )}

          {/* Success Message */}
          {leadSubmitted && (
            <div className="bg-green-50 rounded-xl p-6 border border-green-200 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800 mb-2">
                ¡Gracias por tu interés!
              </h3>
              <p className="text-green-700">
                Te hemos redirigido a WhatsApp para darte atención inmediata.
                Si no se abrió, puedes llamarnos al <a href="tel:+17134555572" className="font-bold underline">713-455-5572</a>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
