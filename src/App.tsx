import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GuidesIndex from "./pages/GuidesIndex";
import PlantIndex from "./pages/PlantIndex";
import GuideDetail from "./pages/GuideDetail";
import NotFound from "./pages/NotFound";
import ScrollManager from "@/components/ScrollManager";

const queryClient = new QueryClient();
const routerBaseName =
  import.meta.env.BASE_URL === "/"
    ? "/"
    : import.meta.env.BASE_URL.replace(/\/$/, "");

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={routerBaseName}>
        <ScrollManager />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalogo" element={<PlantIndex />} />
          <Route path="/guias" element={<GuidesIndex />} />
          <Route path="/guias/:slug" element={<GuideDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;