import { useParams, useNavigate } from "react-router-dom";
import { getPlace, getTraveler } from "@/data/mockData";
import PlaceTag from "@/components/PlaceTag";
import SaveButton from "@/components/SaveButton";
import { ArrowLeft, MapPin } from "lucide-react";

export default function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const place = getPlace(id || "");

  if (!place) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Place not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="relative">
        <img src={place.image} alt={place.name} className="aspect-[4/3] w-full object-cover" />
        <button
          onClick={() => navigate(-1)}
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="absolute right-3 top-3">
          <SaveButton placeId={place.id} />
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-4">
        <h1 className="text-2xl font-display font-bold text-foreground">{place.name}</h1>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" /> {place.city}, {place.country}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {place.category.map((cat) => (
            <span key={cat} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {place.tags.map((tag) => (
            <PlaceTag key={tag} tag={tag} />
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-foreground">{place.description}</p>

        <div className="mt-6">
          <h2 className="font-sans text-base font-semibold text-foreground">
            Travelers who visited ({place.checkIns.length})
          </h2>
          <div className="mt-3 space-y-4">
            {place.checkIns.map((checkIn) => {
              const traveler = getTraveler(checkIn.travelerId);
              if (!traveler) return null;
              return (
                <div
                  key={checkIn.travelerId}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3 cursor-pointer"
                  onClick={() => navigate(`/profile/${traveler.id}`)}
                >
                  <img src={traveler.avatar} alt={traveler.name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{traveler.name}</span>
                      <span className="text-xs text-muted-foreground">{checkIn.date}</span>
                    </div>
                    <p className="mt-1 text-sm italic text-muted-foreground">"{checkIn.comment}"</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <SaveButton placeId={place.id} size="md" />
          <span className="text-sm font-medium text-foreground">Save to a trip</span>
        </div>
      </div>
    </div>
  );
}
