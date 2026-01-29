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
  const [hoursPerDay, setHoursPerDay] = useState(8);
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

          {/* Lead Form or CTA */}
          {!showLeadForm && !leadSubmitted && (
            <div className="space-y-4">
              <Button
                onClick={handleGetQuote}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg"
                size="lg"
              >
                <DollarSign className="w-5 h-5 mr-2" />
                QUIERO UNA COTIZACIÓN PERSONALIZADA
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
                ENVIAR Y RECIBIR COTIZACIÓN
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
