import { useNavigate } from "react-router-dom";
import { MapPin, Calendar } from "lucide-react";
import { PinnedTrip, getPlace } from "@/data/mockData";

interface PinnedTripCardProps {
  trip: PinnedTrip;
  layout?: "grid" | "wide";
}

export default function PinnedTripCard({ trip, layout = "grid" }: PinnedTripCardProps) {
  const navigate = useNavigate();
  const placeCount = trip.placeIds.length;

  if (layout === "wide") {
    return (
      <div
        onClick={() => navigate(`/pinned/${trip.id}`)}
        className="cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg animate-fade-in"
      >
        <div className="relative">
          <img src={trip.coverImage} alt={trip.title} className="aspect-[16/9] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-display text-lg font-bold text-white">{trip.title}</h3>
            <p className="flex items-center gap-1 text-xs text-white/80">
              <MapPin className="h-3 w-3" /> {trip.destination}
            </p>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {trip.dateRange}
            </span>
            <span>{placeCount} place{placeCount !== 1 ? "s" : ""}</span>
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{trip.summary}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(`/pinned/${trip.id}`)}
      className="cursor-pointer overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md animate-fade-in min-w-[200px] max-w-[200px]"
    >
      <div className="relative">
        <img src={trip.coverImage} alt={trip.title} className="aspect-[4/3] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
        <div className="absolute bottom-2 left-2.5 right-2.5">
          <h3 className="font-display text-sm font-bold text-white leading-tight">{trip.title}</h3>
        </div>
      </div>
      <div className="p-2.5">
        <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <MapPin className="h-3 w-3" /> {trip.destination}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {trip.dateRange}
        </p>
      </div>
    </div>
  );
}
