import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. IMPORT YOUR EXISTING PAGES
import Index from "./pages/Index";
import ControlPanel from "./pages/ControlPanel";
import NotFound from "./pages/NotFound";

// 2. IMPORT YOUR NEW NAVBAR AND LEGAL PAGES
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Keep data "fresh" for 5 mins (No re-loading!)
      gcTime: 1000 * 60 * 10,    // Keep data in cache for 10 mins
      retry: 1,                 // Don't spam retries if mobile net is weak
      refetchOnWindowFocus: false, // Don't reload every time you switch apps
    },
  },
});

// 1. Add the import at the top
import Advertise from "./pages/Advertise";

// ... inside your <Routes>
<Route path="/advertise" element={<Advertise />} />

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* 3. ADD THE NAVBAR HERE: It sits outside <Routes> so it stays on top of every page! */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/controlpanel" element={<ControlPanel />} />
          
          {/* 4. ADD THE NEW ROUTES HERE */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

