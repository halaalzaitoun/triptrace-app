import { createContext, useContext, useState, ReactNode } from "react";
import { PinnedTrip, initialPinnedTrips } from "@/data/mockData";

interface PinnedTripContextType {
  pinnedTrips: PinnedTrip[];
  addPinnedTrip: (trip: PinnedTrip) => void;
  getPinnedTripsForTraveler: (travelerId: string) => PinnedTrip[];
}

const PinnedTripContext = createContext<PinnedTripContextType | null>(null);

export function PinnedTripProvider({ children }: { children: ReactNode }) {
  const [pinnedTrips, setPinnedTrips] = useState<PinnedTrip[]>(initialPinnedTrips);

  const addPinnedTrip = (trip: PinnedTrip) =>
    setPinnedTrips((prev) => [...prev, trip]);

  const getPinnedTripsForTraveler = (travelerId: string) =>
    pinnedTrips.filter((pt) => pt.travelerId === travelerId);

  return (
    <PinnedTripContext.Provider value={{ pinnedTrips, addPinnedTrip, getPinnedTripsForTraveler }}>
      {children}
    </PinnedTripContext.Provider>
  );
}

export function usePinnedTrips() {
  const ctx = useContext(PinnedTripContext);
  if (!ctx) throw new Error("usePinnedTrips must be used within PinnedTripProvider");
  return ctx;
}
