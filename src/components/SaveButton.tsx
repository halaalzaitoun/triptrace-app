import { Bookmark } from "lucide-react";
import { useState } from "react";
import { useTrips } from "@/contexts/TripContext";
import { toast } from "sonner";

interface SaveButtonProps {
  placeId: string;
  size?: "sm" | "md";
}

export default function SaveButton({ placeId, size = "md" }: SaveButtonProps) {
  const { trips, isPlaceSaved, addPlaceToTrip } = useTrips();
  const saved = isPlaceSaved(placeId);
  const [showPicker, setShowPicker] = useState(false);

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  if (saved) {
    return (
      <button className={`${btnSize} flex items-center justify-center rounded-full bg-primary`}>
        <Bookmark className={`${iconSize} fill-primary-foreground text-primary-foreground`} />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setShowPicker(!showPicker); }}
        className={`${btnSize} flex items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-secondary`}
      >
        <Bookmark className={`${iconSize} text-foreground`} />
      </button>
      {showPicker && (
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
