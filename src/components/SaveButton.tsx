import { Bookmark } from "lucide-react";
import { useState } from "react";
import { useTrips } from "@/contexts/TripContext";
import { toast } from "sonner";

interface SaveButtonProps {
  placeId: string;
  size?: "sm" | "md";
}

export default function SaveButton({ placeId, size = "md" }: SaveButtonProps) {
  const { trips, isPlaceSaved, addPlaceToTrip, removePlaceFromTrip, getTripsForPlace } = useTrips();
  const saved = isPlaceSaved(placeId);
  const [showPicker, setShowPicker] = useState(false);

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) {
      const savedTrips = getTripsForPlace(placeId);
      savedTrips.forEach((trip) => removePlaceFromTrip(trip.id, placeId));
      toast("Removed from trip");
    } else {
      setShowPicker(!showPicker);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className={`${btnSize} flex items-center justify-center rounded-full transition-colors ${
          saved
            ? "bg-primary"
            : "border border-border bg-background/80 backdrop-blur-sm hover:bg-secondary"
        }`}
      >
        <Bookmark
          className={`${iconSize} ${
            saved ? "fill-primary-foreground text-primary-foreground" : "text-foreground"
          }`}
        />
      </button>
      {showPicker && !saved && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-border bg-background p-2 shadow-lg animate-fade-in">
          <p className="mb-1.5 px-2 text-[11px] font-medium text-muted-foreground">Save to trip</p>
          {trips.map((trip) => (
            <button
              key={trip.id}
              onClick={(e) => {
                e.stopPropagation();
                addPlaceToTrip(trip.id, placeId);
                setShowPicker(false);
                toast.success(`Saved to ${trip.name}`);
              }}
              className="w-full rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-secondary"
            >
              {trip.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}