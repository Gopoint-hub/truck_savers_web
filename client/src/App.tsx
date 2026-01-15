import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";

// Layout Components
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";

// Houston Pages
import HoustonHub from "./pages/houston/index";
import HoustonContact from "./pages/houston/Contact";
import InspeccionBailada from "./pages/services/InspeccionBailada";
import Suspensiones from "./pages/services/Suspensiones";
import Alineacion from "./pages/services/Alineacion";
import CambioAceite from "./pages/services/CambioAceite";
import Neumaticos from "./pages/services/Neumaticos";

// Dallas Pages
import DallasHub from "./pages/dallas/index";
import DallasContact from "./pages/dallas/Contact";

// Monterrey Pages
import MonterreyHub from "./pages/monterrey/index";
import MonterreyContact from "./pages/monterrey/Contact";

// Resources Pages
import ResourcesHub from "./pages/resources/index";
import Blog from "./pages/blog/Blog";

// Store Pages
import StoreHub from "./pages/store/index";

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

// Redirect component for 301 redirects
function Redirect({ to }: { to: string }) {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    setLocation(to);
  }, [to, setLocation]);
  
  return null;
}

function Router() {
  return (
    <Switch>
      {/* Home */}
      <Route path="/" component={Home} />
      
      {/* Houston City Hub */}
      <Route path="/houston" component={HoustonHub} />
      <Route path="/houston/contact" component={HoustonContact} />
      <Route path="/houston/inspeccion-la-bailada" component={InspeccionBailada} />
      <Route path="/houston/suspensiones" component={Suspensiones} />
      <Route path="/houston/alineacion-de-camiones" component={Alineacion} />
      <Route path="/houston/cambio-de-aceite" component={CambioAceite} />
      <Route path="/houston/reparacion-de-neumaticos" component={Neumaticos} />
      
      {/* Dallas City Hub */}
      <Route path="/dallas" component={DallasHub} />
      <Route path="/dallas/contact" component={DallasContact} />
      
      {/* Monterrey City Hub */}
      <Route path="/monterrey" component={MonterreyHub} />
      <Route path="/monterrey/contact" component={MonterreyContact} />
      
      {/* Resources */}
      <Route path="/resources" component={ResourcesHub} />
      <Route path="/resources/blog" component={Blog} />
      
      {/* Store */}
      <Route path="/store" component={StoreHub} />
      <Route path="/tienda" component={StoreHub} />
      
      {/* Legacy Redirects (301) */}
      <Route path="/contacto">
        <Redirect to="/houston/contact" />
      </Route>
      <Route path="/nuestros-servicios">
        <Redirect to="/houston" />
      </Route>
      <Route path="/servicio/inspeccion-fisico-mecanica-transporte-de-carga">
        <Redirect to="/houston/inspeccion-la-bailada" />
      </Route>
      <Route path="/servicio/taller-de-suspensiones">
        <Redirect to="/houston/suspensiones" />
      </Route>
      <Route path="/servicio/alineacion-de-camiones">
        <Redirect to="/houston/alineacion-de-camiones" />
      </Route>
      <Route path="/servicio/cambio-de-aceite-para-camion">
        <Redirect to="/houston/cambio-de-aceite" />
      </Route>
      <Route path="/servicio/reparaciones-de-neumaticos">
        <Redirect to="/houston/reparacion-de-neumaticos" />
      </Route>
      <Route path="/blog">
        <Redirect to="/resources/blog" />
      </Route>
      <Route path="/ubicaciones">
        <Redirect to="/" />
      </Route>
      
      {/* Old service routes - redirect to Houston */}
      <Route path="/servicios/:slug">
        {(params) => <Redirect to={`/houston/${params.slug}`} />}
      </Route>
      
      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Header />
          <main>
            <Router />
          </main>
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
