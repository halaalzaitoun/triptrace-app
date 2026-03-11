import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TripProvider } from "@/contexts/TripContext";
import { PinnedTripProvider } from "@/contexts/PinnedTripContext";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import PlaceDetail from "./pages/PlaceDetail";
import MapDiscovery from "./pages/MapDiscovery";
import TravelerProfile from "./pages/TravelerProfile";
import MyTrips from "./pages/MyTrips";
import CreatePinnedTrip from "./pages/CreatePinnedTrip";
import PinnedTripDetail from "./pages/PinnedTripDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TripProvider>
        <PinnedTripProvider>
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/place/:id" element={<PlaceDetail />} />
              <Route path="/map" element={<MapDiscovery />} />
              <Route path="/profile/:id" element={<TravelerProfile />} />
              <Route path="/trips" element={<MyTrips />} />
              <Route path="/create-pinned-trip" element={<CreatePinnedTrip />} />
              <Route path="/pinned/:id" element={<PinnedTripDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <BottomNav />
          </BrowserRouter>
        </PinnedTripProvider>
      </TripProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
