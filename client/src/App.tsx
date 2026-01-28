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

// Dallas Pages
import DallasHub from "./pages/dallas/index";
import DallasContact from "./pages/dallas/Contact";
import InspeccionBailadaDallas from "./pages/dallas/InspeccionBailada";

// Monterrey Pages
import MonterreyHub from "./pages/monterrey/index";
import MonterreyContact from "./pages/monterrey/Contact";
import InspeccionBailadaMonterrey from "./pages/monterrey/InspeccionBailada";

// Resources Pages
import ResourcesHub from "./pages/resources/index";
import PodcastsPage from "./pages/resources/Podcasts";
import CursosPage from "./pages/resources/Cursos";
import Blog from "./pages/blog/Blog";

// Blog Articles
import GoGreenApuArticle from "./pages/blog/GoGreenApu";
import LucesTableroArticle from "./pages/blog/LucesTablero";
import SistemaEnfriamientoArticle from "./pages/blog/SistemaEnfriamiento";
import InspeccionCargaArticle from "./pages/blog/InspeccionCarga";
import DiferencialTransmisionArticle from "./pages/blog/DiferencialTransmision";
import SuspensionTrocaArticle from "./pages/blog/SuspensionTroca";
import TorqueWrapArticle from "./pages/blog/TorqueWrap";

// Store Pages
import StoreHub from "./pages/store/index";

// CMS Pages
import CmsLayout from "./pages/cms/CmsLayout";
import CmsLogin from "./pages/cms/Login";
import CmsDashboard from "./pages/cms/Dashboard";
import CmsTasks from "./pages/cms/Tasks";
import CmsObjectives from "./pages/cms/Objectives";
import CmsSubscribers from "./pages/cms/Subscribers";
import CmsNewsletters from "./pages/cms/Newsletters";
import CmsUsers from "./pages/cms/Users";
import CmsRoadmap from "./pages/cms/Roadmap";
import CmsSeoChecklist from "./pages/cms/SeoChecklist";
import CmsSetPassword from "./pages/cms/SetPassword";
import CmsChangePassword from "./pages/cms/ChangePassword";
import CmsCourseWaitlist from "./pages/cms/CourseWaitlist";
import CmsBailadaReports from "./pages/cms/BailadaReports";

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

// CMS Router - separate from main site
function CmsRouter() {
  return (
    <Switch>
      {/* Auth pages without layout */}
      <Route path="/cms/login" component={CmsLogin} />
      <Route path="/cms/set-password" component={CmsSetPassword} />
      <Route path="/cms/reset-password" component={CmsSetPassword} />
      
      {/* Protected pages with layout */}
      <Route>
        <CmsLayout>
          <Switch>
            <Route path="/cms" component={CmsDashboard} />
            <Route path="/cms/dashboard" component={CmsDashboard} />
            <Route path="/cms/tasks" component={CmsTasks} />
            <Route path="/cms/objectives" component={CmsObjectives} />
            <Route path="/cms/subscribers" component={CmsSubscribers} />
            <Route path="/cms/newsletters" component={CmsNewsletters} />
            <Route path="/cms/users" component={CmsUsers} />
            <Route path="/cms/roadmap" component={CmsRoadmap} />
            <Route path="/cms/seo" component={CmsSeoChecklist} />
            <Route path="/cms/course-waitlist" component={CmsCourseWaitlist} />
            <Route path="/cms/bailada-reports" component={CmsBailadaReports} />
            <Route path="/cms/change-password" component={CmsChangePassword} />
            <Route component={CmsDashboard} />
          </Switch>
        </CmsLayout>
      </Route>
    </Switch>
  );
}

function Router() {
  const [location] = useLocation();
  
  // Check if we're in CMS routes
  if (location.startsWith('/cms')) {
    return <CmsRouter />;
  }
  
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
      <Route path="/houston/taller-de-frenos" component={Frenos} />
      <Route path="/houston/direccion" component={Direccion} />
      <Route path="/houston/balanceo-de-llantas" component={Balanceo} />
      <Route path="/houston/reparacion-de-cardanes" component={Cardanes} />
      <Route path="/houston/sistema-de-escape" component={SistemaEscape} />
      <Route path="/houston/sellos-de-rueda" component={SellosRueda} />
      
      {/* Dallas City Hub */}
      <Route path="/dallas" component={DallasHub} />
      <Route path="/dallas/contact" component={DallasContact} />
      <Route path="/dallas/inspeccion-la-bailada" component={InspeccionBailadaDallas} />
      
      {/* Monterrey City Hub */}
      <Route path="/monterrey" component={MonterreyHub} />
      <Route path="/monterrey/contact" component={MonterreyContact} />
      <Route path="/monterrey/inspeccion-la-bailada" component={InspeccionBailadaMonterrey} />
      
      {/* Resources */}
      <Route path="/resources" component={ResourcesHub} />
      <Route path="/resources/podcasts" component={PodcastsPage} />
      <Route path="/resources/cursos" component={CursosPage} />
      <Route path="/resources/blog" component={Blog} />
      
      {/* Blog Articles */}
      <Route path="/blog/go-green-apu-ahorro-diesel" component={GoGreenApuArticle} />
      <Route path="/blog/significado-luces-tablero" component={LucesTableroArticle} />
      <Route path="/blog/sistema-enfriamiento" component={SistemaEnfriamientoArticle} />
      <Route path="/blog/inspeccion-carga-diaria" component={InspeccionCargaArticle} />
      <Route path="/blog/diferencial-transmision" component={DiferencialTransmisionArticle} />
      <Route path="/blog/suspension-troca" component={SuspensionTrocaArticle} />
      <Route path="/blog/torque-wrap" component={TorqueWrapArticle} />
      
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
  const [location] = useLocation();
  const isCms = location.startsWith('/cms');
  
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          {!isCms && <Header />}
          <main>
            <Router />
          </main>
          {!isCms && <Footer />}
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
