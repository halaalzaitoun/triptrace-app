import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Compass } from "lucide-react";
import { getPlace, getTraveler } from "@/data/mockData";
import { usePinnedTrips } from "@/contexts/PinnedTripContext";
import PlaceCard from "@/components/PlaceCard";

export default function PinnedTripDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pinnedTrips } = usePinnedTrips();

  const trip = pinnedTrips.find((pt) => pt.id === id);
  const traveler = trip ? getTraveler(trip.travelerId) : null;

  if (!trip || !traveler) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Trip not found.</p>
      </div>
    );
  }

  const places = trip.placeIds.map(getPlace).filter(Boolean);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className="relative">
        <img src={trip.coverImage} alt={trip.title} className="aspect-[16/10] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 backdrop-blur-sm"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        {/* Route indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1.5 shadow-md">
          <Compass className="h-3.5 w-3.5 text-primary-foreground" />
          <span className="text-xs font-semibold text-primary-foreground">{places.length} stops</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="font-display text-2xl font-bold text-white">{trip.title}</h1>
          <div className="mt-1.5 flex items-center gap-3 text-sm text-white/80">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {trip.destination}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {trip.dateRange}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-5">
        {/* Author */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <img src={traveler.avatar} alt={traveler.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/20" />
            <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
              <Compass className="h-2.5 w-2.5 text-primary-foreground" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{traveler.name}</p>
            <p className="text-xs text-primary font-medium">Pinned trip</p>
          </div>
        </div>

        {/* Summary */}
        {trip.summary && (
          <p className="text-sm text-muted-foreground italic leading-relaxed mb-5">
            "{trip.summary}"
          </p>
        )}

        {/* Places */}
        <h3 className="font-display text-base font-semibold text-foreground mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          Places Visited ({places.length})
        </h3>
        <div className="space-y-3">
          {places.map((place) => place && <PlaceCard key={place.id} place={place} style="compact" />)}
        </div>
      </div>
    </div>
  );
}
