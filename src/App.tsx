import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔥 1. ADDED: VERCEL ANALYTICS IMPORT
import { Analytics } from "@vercel/analytics/react";

// IMPORT YOUR PAGES
import Index from "./pages/Index";
import ControlPanel from "./pages/ControlPanel";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// ADD THIS IMPORT HERE
import Advertise from "./pages/Advertise";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>

        <Navbar />

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/controlpanel" element={<ControlPanel />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          <Route path="/advertise" element={<Advertise />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
      {/* 🔥 2. ADDED: VERCEL ANALYTICS COMPONENT */}
      <Analytics />
      
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;