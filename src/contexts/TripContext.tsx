import { createContext, useContext, useState, ReactNode } from "react";
import { Trip, initialTrips } from "@/data/mockData";

interface TripContextType {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  addPlaceToTrip: (tripId: string, placeId: string) => void;
  removePlaceFromTrip: (tripId: string, placeId: string) => void;
  isPlaceSaved: (placeId: string) => boolean;
  getTripsForPlace: (placeId: string) => Trip[];
}

const TripContext = createContext<TripContextType | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);

  const addTrip = (trip: Trip) => setTrips((prev) => [...prev, trip]);

  const addPlaceToTrip = (tripId: string, placeId: string) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId && !t.placeIds.includes(placeId)
          ? { ...t, placeIds: [...t.placeIds, placeId] }
          : t
      )
    );
  };

  const removePlaceFromTrip = (tripId: string, placeId: string) => {
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? { ...t, placeIds: t.placeIds.filter((id) => id !== placeId) }
          : t
      )
    );
  };

  const isPlaceSaved = (placeId: string) =>
    trips.some((t) => t.placeIds.includes(placeId));

  return (
    <TripContext.Provider value={{ trips, addTrip, addPlaceToTrip, removePlaceFromTrip, isPlaceSaved }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrips must be used within TripProvider");
  return ctx;
}
