import { useParams, useNavigate } from "react-router-dom";
import { getPlace, getTraveler } from "@/data/mockData";
import PlaceTag from "@/components/PlaceTag";
import SaveButton from "@/components/SaveButton";
import { ArrowLeft, MapPin, Users, Globe } from "lucide-react";

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
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-foreground/10" />
        <button
          onClick={() => navigate(-1)}
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-sm"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="absolute right-3 top-3">
          <SaveButton placeId={place.id} />
        </div>
        {/* Category badge */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {place.category.map((cat) => (
            <span key={cat} className="rounded-full bg-primary/90 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-sm">
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-lg px-4 pt-5">
        <h1 className="text-2xl font-display font-bold text-foreground">{place.name}</h1>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" /> {place.city}, {place.country}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {place.tags.map((tag) => (
            <PlaceTag key={tag} tag={tag} />
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-foreground">{place.description}</p>

        {/* Social signal banner */}
        <div className="mt-5 rounded-xl bg-primary/8 border border-primary/15 p-3.5 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{place.checkIns.length} travelers visited</p>
            <p className="text-xs text-muted-foreground">See what they had to say about this place</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            Traveler Check-ins
          </h2>
          <div className="mt-3 space-y-3">
            {place.checkIns.map((checkIn) => {
              const traveler = getTraveler(checkIn.travelerId);
              if (!traveler) return null;
              return (
                <div
                  key={checkIn.travelerId}
                  className="flex gap-3 rounded-xl border border-border bg-card p-3.5 cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => navigate(`/profile/${traveler.id}`)}
                >
                  <div className="relative">
                    <img src={traveler.avatar} alt={traveler.name} className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/20" />
                    <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                      <MapPin className="h-2.5 w-2.5 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-foreground">{traveler.name}</span>
                      <span className="text-[11px] text-muted-foreground bg-secondary rounded-full px-2 py-0.5">{checkIn.date}</span>
                    </div>
                    <p className="mt-1 text-sm italic text-muted-foreground leading-relaxed">"{checkIn.comment}"</p>
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
