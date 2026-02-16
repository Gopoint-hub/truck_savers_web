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
import Frenos from "./pages/services/Frenos";
import Direccion from "./pages/services/Direccion";
import Balanceo from "./pages/services/Balanceo";
import Cardanes from "./pages/services/Cardanes";
import SistemaEscape from "./pages/services/SistemaEscape";
import SellosRueda from "./pages/services/SellosRueda";
import SelladorLlantas from "./pages/services/SelladorLlantas";
import GoGreenApu from "./pages/services/GoGreenApu";
import AutoPickupRepair from "./pages/services/AutoPickupRepair";

// Dallas Pages
import DallasHub from "./pages/dallas/index";
import DallasContact from "./pages/dallas/Contact";
import InspeccionBailadaDallas from "./pages/dallas/InspeccionBailada";
import AlineacionDallas from "./pages/dallas/Alineacion";
import SuspensionesDallas from "./pages/dallas/Suspensiones";
import FrenosDallas from "./pages/dallas/Frenos";
import DireccionDallas from "./pages/dallas/Direccion";
import SistemaEscapeDallas from "./pages/dallas/SistemaEscape";
import SellosRuedaDallas from "./pages/dallas/SellosRueda";
import SelladorLlantasDallas from "./pages/dallas/SelladorLlantas";
import GoGreenApuDallas from "./pages/dallas/GoGreenApu";

// Monterrey Pages
import MonterreyHub from "./pages/monterrey/index";
import MonterreyContact from "./pages/monterrey/Contact";
import InspeccionBailadaMonterrey from "./pages/monterrey/InspeccionBailada";
import AlineacionMonterrey from "./pages/monterrey/Alineacion";
import SuspensionesMonterrey from "./pages/monterrey/Suspensiones";
import FrenosMonterrey from "./pages/monterrey/Frenos";
import DireccionMonterrey from "./pages/monterrey/Direccion";
import BalanceoMonterrey from "./pages/monterrey/Balanceo";
import DepiladaLlantasMonterrey from "./pages/monterrey/DepiladaLlantas";
import CardanesMonterrey from "./pages/monterrey/Cardanes";
import SellosRuedaMonterrey from "./pages/monterrey/SellosRueda";
import GoGreenApuMonterrey from "./pages/monterrey/GoGreenApu";

// Hidden Pages
import Inversionistas from "./pages/Inversionistas";
import Colaboraciones from "./pages/Colaboraciones";
import RecognizingTrueHeroes from "./pages/RecognizingTrueHeroes";

// Resources Pages
import ResourcesHub from "./pages/resources/index";
import PodcastsPage from "./pages/resources/Podcasts";
import CursosPage from "./pages/resources/Cursos";
import AhorroHub from "./pages/resources/Ahorro";
import AhorroDiesel from "./pages/resources/AhorroDiesel";
import AhorroLlantas from "./pages/resources/AhorroLlantas";
import ReduccionVibraciones from "./pages/resources/ReduccionVibraciones";
import BolsaDeJale from "./pages/resources/BolsaDeJale";
import TrabajaConNosotros from "./pages/resources/TrabajaConNosotros";
import Blog from "./pages/blog/Blog";

// Blog Articles
import GoGreenApuArticle from "./pages/blog/GoGreenApu";
import LucesTableroArticle from "./pages/blog/LucesTablero";
import SistemaEnfriamientoArticle from "./pages/blog/SistemaEnfriamiento";
import InspeccionCargaArticle from "./pages/blog/InspeccionCarga";
import DiferencialTransmisionArticle from "./pages/blog/DiferencialTransmision";
import SuspensionTrocaArticle from "./pages/blog/SuspensionTroca";
import TorqueWrapArticle from "./pages/blog/TorqueWrap";
import DesgasteLlantasArticle from "./pages/blog/DesgasteLlantas";
import DieselReinversionArticle from "./pages/blog/DieselReinversion";
import ElTrokeroHeroeArticle from "./pages/blog/ElTrokeroHeroe";
import ApuFinanceLanding from "./pages/ApuFinanceLanding";
import QRLinkTree from "./pages/QRLinkTree";

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
      
      {/* QR Link Tree (Hidden from menu) */}
      <Route path="/qr" component={QRLinkTree} />
      
      {/* Houston City Hub */}
      <Route path="/houston" component={HoustonHub} />
      <Route path="/houston/contact" component={HoustonContact} />
      <Route path="/houston/inspeccion-la-bailada" component={InspeccionBailada} />
      <Route path="/houston/suspensiones" component={Suspensiones} />
      <Route path="/houston/alineacion-de-camiones" component={Alineacion} />
      <Route path="/houston/cambio-de-aceite" component={CambioAceite} />
      <Route path="/houston/reparacion-de-neumaticos" component={Neumaticos} />
      <Route path="/houston/taller-de-frenos" component={Frenos} />
      <Route path="/houston/direccion" component={Direccion} />
      <Route path="/houston/balanceo-de-llantas" component={Balanceo} />
      <Route path="/houston/reparacion-de-cardanes" component={Cardanes} />
      <Route path="/houston/sistema-de-escape" component={SistemaEscape} />
      <Route path="/houston/sellos-de-rueda" component={SellosRueda} />
      <Route path="/houston/sellador-de-llantas" component={SelladorLlantas} />
      <Route path="/houston/go-green-apu" component={GoGreenApu} />
      <Route path="/houston/auto-pickup-repair" component={AutoPickupRepair} />
      
      {/* Dallas City Hub */}
      <Route path="/dallas" component={DallasHub} />
      <Route path="/dallas/contact" component={DallasContact} />
      <Route path="/dallas/inspeccion-la-bailada" component={InspeccionBailadaDallas} />
      <Route path="/dallas/alineacion-de-camiones" component={AlineacionDallas} />
      <Route path="/dallas/suspensiones" component={SuspensionesDallas} />
      <Route path="/dallas/frenos" component={FrenosDallas} />
      <Route path="/dallas/direccion" component={DireccionDallas} />
      <Route path="/dallas/sistema-de-escape" component={SistemaEscapeDallas} />
      <Route path="/dallas/sellos-de-rueda" component={SellosRuedaDallas} />
      <Route path="/dallas/sellador-de-llantas" component={SelladorLlantasDallas} />
      <Route path="/dallas/go-green-apu" component={GoGreenApuDallas} />
      
      {/* Monterrey City Hub */}
      <Route path="/monterrey" component={MonterreyHub} />
      <Route path="/monterrey/contact" component={MonterreyContact} />
      <Route path="/monterrey/inspeccion-la-bailada" component={InspeccionBailadaMonterrey} />
      <Route path="/monterrey/alineacion-de-camiones" component={AlineacionMonterrey} />
      <Route path="/monterrey/suspensiones" component={SuspensionesMonterrey} />
      <Route path="/monterrey/frenos" component={FrenosMonterrey} />
      <Route path="/monterrey/direccion" component={DireccionMonterrey} />
      <Route path="/monterrey/balanceo-de-llantas" component={BalanceoMonterrey} />
      <Route path="/monterrey/depilada-de-llantas" component={DepiladaLlantasMonterrey} />
      <Route path="/monterrey/reparacion-de-cardanes" component={CardanesMonterrey} />
      <Route path="/monterrey/sellos-de-rueda" component={SellosRuedaMonterrey} />
      <Route path="/monterrey/go-green-apu" component={GoGreenApuMonterrey} />
      
      {/* Resources (Recursos) */}
      <Route path="/recursos" component={ResourcesHub} />
      <Route path="/recursos/podcasts" component={PodcastsPage} />
      <Route path="/recursos/cursos" component={CursosPage} />
      <Route path="/recursos/blog" component={Blog} />
      <Route path="/recursos/ahorro" component={AhorroHub} />
      <Route path="/recursos/ahorro/diesel" component={AhorroDiesel} />
      <Route path="/recursos/ahorro/llantas" component={AhorroLlantas} />
      <Route path="/recursos/ahorro/reduccion-vibraciones" component={ReduccionVibraciones} />
      <Route path="/recursos/bolsa-de-jale" component={BolsaDeJale} />
      <Route path="/recursos/trabaja-con-nosotros" component={TrabajaConNosotros} />
      
      {/* Short URL Redirects */}
      <Route path="/jale">
        <Redirect to="/recursos/bolsa-de-jale" />
      </Route>
      <Route path="/cursos">
        <Redirect to="/recursos/cursos" />
      </Route>

      {/* Legacy Redirects: /resources -> /recursos */}
      <Route path="/resources">
        <Redirect to="/recursos" />
      </Route>
      <Route path="/resources/podcasts">
        <Redirect to="/recursos/podcasts" />
      </Route>
      <Route path="/resources/cursos">
        <Redirect to="/recursos/cursos" />
      </Route>
      <Route path="/resources/blog">
        <Redirect to="/recursos/blog" />
      </Route>
      <Route path="/resources/ahorro">
        <Redirect to="/recursos/ahorro" />
      </Route>
      <Route path="/resources/ahorro/diesel">
        <Redirect to="/recursos/ahorro/diesel" />
      </Route>
      <Route path="/resources/ahorro/llantas">
        <Redirect to="/recursos/ahorro/llantas" />
      </Route>
      <Route path="/resources/ahorro/reduccion-vibraciones">
        <Redirect to="/recursos/ahorro/reduccion-vibraciones" />
      </Route>
      
      {/* Blog Articles */}
      <Route path="/blog/go-green-apu-ahorro-diesel" component={GoGreenApuArticle} />
      <Route path="/blog/significado-luces-tablero" component={LucesTableroArticle} />
      <Route path="/blog/sistema-enfriamiento" component={SistemaEnfriamientoArticle} />
      <Route path="/blog/inspeccion-carga-diaria" component={InspeccionCargaArticle} />
      <Route path="/blog/diferencial-transmision" component={DiferencialTransmisionArticle} />
      <Route path="/blog/suspension-troca" component={SuspensionTrocaArticle} />
      <Route path="/blog/torque-wrap" component={TorqueWrapArticle} />
      <Route path="/blog/desgaste-prematuro-llantas" component={DesgasteLlantasArticle} />
      <Route path="/blog/diesel-reinversion-oportunidad" component={DieselReinversionArticle} />
      <Route path="/blog/el-trokero-heroe" component={ElTrokeroHeroeArticle} />
      
      {/* Auto / Pickup Repair */}
      <Route path="/pickup" component={AutoPickupRepair} />
      <Route path="/auto">
        <Redirect to="/pickup" />
      </Route>
      
      {/* APU Finance Landing */}
      <Route path="/apu-finance" component={ApuFinanceLanding} />
      
      {/* Store */}
      <Route path="/store">
        <Redirect to="/tienda" />
      </Route>
      <Route path="/tienda" component={StoreHub} />
      
      {/* Hidden Pages */}
      <Route path="/inversionistas" component={Inversionistas} />
      <Route path="/colaboraciones" component={Colaboraciones} />
      <Route path="/recognizing-true-heroes-road" component={RecognizingTrueHeroes} />
      
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
      
      {/* CMS redirect - now external */}
      <Route path="/cms">
        {() => {
          window.location.href = 'https://cms.thetrucksavers.com';
          return null;
        }}
      </Route>
      <Route path="/cms/:rest*">
        {() => {
          window.location.href = 'https://cms.thetrucksavers.com';
          return null;
        }}
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
