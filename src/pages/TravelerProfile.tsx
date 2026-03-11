import { useParams, useNavigate } from "react-router-dom";
import { getTraveler, getTravelerPlaces } from "@/data/mockData";
import { usePinnedTrips } from "@/contexts/PinnedTripContext";
import PlaceCard from "@/components/PlaceCard";
import PinnedTripCard from "@/components/PinnedTripCard";
import { ArrowLeft, Globe, MapPin, Pin, Plus } from "lucide-react";

export default function TravelerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const traveler = getTraveler(id || "");
  const travelerPlaces = getTravelerPlaces(id || "");
  const { getPinnedTripsForTraveler } = usePinnedTrips();
  const pinnedTrips = getPinnedTripsForTraveler(id || "");
  const isOwnProfile = id === "t1";

  if (!traveler) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Traveler not found.</p>
      </div>
    );
  }

  // Unique cities from check-ins
  const cities = [...new Set(travelerPlaces.map((p) => p.city))];

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {!isOwnProfile && (
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
          )}
          <h1 className="text-lg font-display font-bold text-foreground">
            {isOwnProfile ? "My Profile" : "Profile"}
          </h1>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 pt-6">
        {/* Identity header */}
        <div className="flex flex-col items-center text-center">
          <img src={traveler.avatar} alt={traveler.name} className="h-20 w-20 rounded-full object-cover ring-4 ring-primary/20" />
          <h2 className="mt-3 font-display text-xl font-bold text-foreground">{traveler.name}</h2>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">{traveler.bio}</p>
        </div>

        {/* Stats row */}
        <div className="mt-4 flex justify-center gap-6">
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">{traveler.countriesVisited}</span>
            <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
              <Globe className="h-3 w-3 text-primary" /> Countries
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">{cities.length}</span>
            <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
              <MapPin className="h-3 w-3 text-primary" /> Cities
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-foreground">{pinnedTrips.length}</span>
            <span className="text-[11px] text-muted-foreground flex items-center gap-0.5">
              <Pin className="h-3 w-3 text-primary" /> Trips
            </span>
          </div>
        </div>

        {/* Pinned Trips section */}
        <div className="mt-7">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-sans text-base font-semibold text-foreground">Pinned Trips</h3>
            {isOwnProfile && (
              <button
                onClick={() => navigate("/create-pinned-trip")}
                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                <Plus className="h-3 w-3" /> New
              </button>
            )}
          </div>
          {pinnedTrips.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {pinnedTrips.map((pt) => (
                <PinnedTripCard key={pt.id} trip={pt} layout="grid" />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-secondary/50 p-6 text-center">
              <Pin className="mx-auto h-6 w-6 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">
                {isOwnProfile
                  ? "Pin your first trip to showcase your travels!"
                  : "No pinned trips yet."}
              </p>
              {isOwnProfile && (
                <button
                  onClick={() => navigate("/create-pinned-trip")}
                  className="mt-3 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                >
                  Create Pinned Trip
                </button>
              )}
            </div>
          )}
        </div>

        {/* Recent Check-ins */}
        <div className="mt-7">
          <h3 className="font-sans text-base font-semibold text-foreground mb-3">
            Recent Check-Ins ({travelerPlaces.length})
          </h3>
          <div className="space-y-3">
            {travelerPlaces.map((place) => (
              <PlaceCard key={place.id} place={place} style="compact" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
