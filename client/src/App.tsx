import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import Blog from "./pages/blog/Blog";
import CambioAceite from "./pages/services/CambioAceite";
import Suspensiones from "./pages/services/Suspensiones";
import Neumaticos from "./pages/services/Neumaticos";
import Alineacion from "./pages/services/Alineacion";
import InspeccionBailada from "./pages/services/InspeccionBailada";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/contacto" component={Contacto} />
      <Route path="/blog" component={Blog} />
      <Route path="/servicios/cambio-aceite" component={CambioAceite} />
      <Route path="/servicios/suspensiones" component={Suspensiones} />
      <Route path="/servicios/neumaticos" component={Neumaticos} />
      <Route path="/servicios/alineacion" component={Alineacion} />
      <Route path="/servicios/inspeccion-bailada" component={InspeccionBailada} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
