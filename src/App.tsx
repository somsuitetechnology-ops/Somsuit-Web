import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AsuitERP from "./pages/FlowERP";
import Partners from "./pages/Partners";
import Clients from "./pages/Clients";
import Blog from "./pages/Blog";
import Company from "./pages/about/Company";
import Mission from "./pages/about/Mission";
import Team from "./pages/about/Team";
import Careers from "./pages/about/Careers";
import Networking from "./pages/services/Networking";
import CloudComputing from "./pages/services/Cloud";
import ManagedServices from "./pages/services/Managed";
import Security from "./pages/services/Security";
import Integration from "./pages/services/Integration";
import Hardware from "./pages/products/Hardware";
import Software from "./pages/products/Software";
import Custom from "./pages/products/Custom";
import AI from "./pages/products/AI";
import SMSNotifications from "./pages/SMSNotifications";
import SMSNotificationsEnable from "./pages/SMSNotificationsEnable";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/company" element={<Company />} />
            <Route path="/about/mission" element={<Mission />} />
            <Route path="/about/team" element={<Team />} />
            <Route path="/about/careers" element={<Careers />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/networking" element={<Networking />} />
            <Route path="/services/cloud" element={<CloudComputing />} />
            <Route path="/services/managed" element={<ManagedServices />} />
            <Route path="/services/security" element={<Security />} />
            <Route path="/services/integration" element={<Integration />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/flowerp" element={<AsuitERP />} />
            <Route path="/products/hardware" element={<Hardware />} />
            <Route path="/products/software" element={<Software />} />
            <Route path="/products/custom" element={<Custom />} />
            <Route path="/products/ai" element={<AI />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/sms-notifications" element={<SMSNotifications />} />
            <Route path="/sms-notifications-enable" element={<SMSNotificationsEnable />} />
            <Route path="/qrcode-generator" element={<QRCodeGenerator />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
