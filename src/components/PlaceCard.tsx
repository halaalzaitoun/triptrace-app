import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Place, getTraveler } from "@/data/mockData";
import PlaceTag from "./PlaceTag";
import SaveButton from "./SaveButton";

interface PlaceCardProps {
  place: Place;
  style?: "feed" | "compact";
}

export default function PlaceCard({ place, style = "feed" }: PlaceCardProps) {
  const navigate = useNavigate();
  const firstCheckIn = place.checkIns[0];
  const traveler = firstCheckIn ? getTraveler(firstCheckIn.travelerId) : null;

  if (style === "compact") {
    return (
      <div
        onClick={() => navigate(`/place/${place.id}`)}
        className="flex cursor-pointer gap-3 rounded-xl border border-border bg-card p-3 transition-shadow hover:shadow-md"
      >
        <img src={place.image} alt={place.name} className="h-20 w-20 rounded-lg object-cover" />
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold font-sans text-foreground">{place.name}</h3>
            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {place.city}, {place.country}
            </p>
          </div>
          <div className="flex gap-1.5">
            {place.tags.slice(0, 1).map((tag) => (
              <PlaceTag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => navigate(`/place/${place.id}`)}
      className="cursor-pointer overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg animate-fade-in"
    >
      <div className="relative">
        <img src={place.image} alt={place.name} className="aspect-[4/3] w-full object-cover" />
        <div className="absolute right-3 top-3">
          <SaveButton placeId={place.id} />
        </div>
      </div>
      <div className="p-4">
        {traveler && (
          <div className="mb-2.5 flex items-center gap-2">
            <img src={traveler.avatar} alt={traveler.name} className="h-7 w-7 rounded-full object-cover" />
            <span className="text-xs font-medium text-foreground">{traveler.name}</span>
          </div>
        )}
        <h3 className="font-sans text-base font-semibold text-foreground">{place.name}</h3>
        <p className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {place.city}, {place.country}
        </p>
        {firstCheckIn && (
          <p className="mb-3 text-sm text-muted-foreground italic leading-relaxed">
            "{firstCheckIn.comment}"
          </p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {place.tags.map((tag) => (
            <PlaceTag key={tag} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
}
