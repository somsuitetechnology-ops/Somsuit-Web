import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Login from "./views/Login";
import AdminDashboard from "./views/admin/AdminDashboard";
import AdminClientDetail from "./views/admin/AdminClientDetail";
import ClientDashboard from "./views/dashboard/ClientDashboard";
import About from "./views/About";
import Services from "./views/Services";
import Projects from "./views/Projects";
import Contact from "./views/Contact";
import AsuitERP from "./views/FlowERP";
import Partners from "./views/Partners";
import Clients from "./views/Clients";
import Blog from "./views/Blog";
import Company from "./views/about/Company";
import Mission from "./views/about/Mission";
import Team from "./views/about/Team";
import Careers from "./views/about/Careers";
import Networking from "./views/services/Networking";
import CloudComputing from "./views/services/Cloud";
import ManagedServices from "./views/services/Managed";
import Security from "./views/services/Security";
import Integration from "./views/services/Integration";
import Hardware from "./views/products/Hardware";
import Software from "./views/products/Software";
import Custom from "./views/products/Custom";
import AI from "./views/products/AI";
import SMSNotifications from "./views/SMSNotifications";
import SMSNotificationsEnable from "./views/SMSNotificationsEnable";
import QRCodeGenerator from "./views/QRCodeGenerator";
import NotFound from "./views/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute roles={["ADMIN", "STAFF"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/clients/:id"
                element={
                  <ProtectedRoute roles={["ADMIN", "STAFF"]}>
                    <AdminClientDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <ClientDashboard />
                  </ProtectedRoute>
                }
              />
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
