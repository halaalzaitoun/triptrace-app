import { useParams, useNavigate } from "react-router-dom";
import { getTraveler, getTravelerPlaces } from "@/data/mockData";
import PlaceCard from "@/components/PlaceCard";
import { ArrowLeft, Globe } from "lucide-react";

export default function TravelerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const traveler = getTraveler(id || "");
  const travelerPlaces = getTravelerPlaces(id || "");

  if (!traveler) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Traveler not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {id !== "t1" && (
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
          )}
          <h1 className="text-lg font-display font-bold text-foreground">Profile</h1>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 pt-6">
        <div className="flex flex-col items-center text-center">
          <img src={traveler.avatar} alt={traveler.name} className="h-20 w-20 rounded-full object-cover ring-4 ring-primary/20" />
          <h2 className="mt-3 font-display text-xl font-bold text-foreground">{traveler.name}</h2>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">{traveler.bio}</p>
          <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
            <Globe className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">{traveler.countriesVisited}</span> countries visited
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-sans text-base font-semibold text-foreground">
            Recent Check-ins ({travelerPlaces.length})
          </h3>
          <div className="mt-3 space-y-3">
            {travelerPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} style="compact" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
