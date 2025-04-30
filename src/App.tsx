
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LocaleProvider } from "./hooks/useLocale";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Patients from "./pages/Patients";
import Staff from "./pages/Staff";
import Appointments from "./pages/Appointments";
import Departments from "./pages/Departments";
import Monitoring from "./pages/Monitoring";
import Alerts from "./pages/Alerts";
import Reports from "./pages/Reports";
import Activity from "./pages/Activity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LocaleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LocaleProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
