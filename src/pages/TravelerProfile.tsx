import { useParams, useNavigate } from "react-router-dom";
import { getTraveler, getTravelerPlaces } from "@/data/mockData";
import { usePinnedTrips } from "@/contexts/PinnedTripContext";
import PinnedTripCard from "@/components/PinnedTripCard";
import MapView from "@/components/MapView";
import { ArrowLeft, Globe, MapPin, Pin, Plus, Settings, Compass } from "lucide-react";
import { useState } from "react";

export default function TravelerProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const traveler = getTraveler(id || "");
  const travelerPlaces = getTravelerPlaces(id || "");
  const { getPinnedTripsForTraveler } = usePinnedTrips();
  const pinnedTrips = getPinnedTripsForTraveler(id || "");
  const isOwnProfile = id === "t1";
  const [selectedPlace, setSelectedPlace] = useState<typeof travelerPlaces[0] | null>(null);

  if (!traveler) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Traveler not found.</p>
      </div>
    );
  }

  const cities = [...new Set(travelerPlaces.map((p) => p.city))];
  const countries = [...new Set(travelerPlaces.map((p) => p.country))];

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="relative px-4 py-3">
          <div className="absolute inset-0 travel-dots opacity-20 pointer-events-none" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              {!isOwnProfile && (
                <button onClick={() => navigate(-1)}>
                  <ArrowLeft className="h-5 w-5 text-foreground" />
                </button>
              )}
              <h1 className="text-lg font-display font-bold text-foreground">
                {isOwnProfile ? traveler.name : "Profile"}
              </h1>
            </div>
            {isOwnProfile && (
              <button className="h-8 w-8 rounded-xl bg-secondary flex items-center justify-center">
                <Settings className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg">
        {/* Profile header */}
        <div className="flex items-center gap-4 px-4 pt-5 pb-4">
          <div className="relative">
            <img src={traveler.avatar} alt={traveler.name} className="h-20 w-20 rounded-full object-cover ring-4 ring-primary/20" />
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center border-2 border-background">
              <Compass className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-around text-center">
              <div>
                <span className="text-lg font-bold text-foreground">{travelerPlaces.length}</span>
                <p className="text-[11px] text-muted-foreground">Check-ins</p>
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">{cities.length}</span>
                <p className="text-[11px] text-muted-foreground">Cities</p>
              </div>
              <div>
                <span className="text-lg font-bold text-foreground">{traveler.countriesVisited}</span>
                <p className="text-[11px] text-muted-foreground">Countries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="px-4 pb-4">
          <p className="text-sm text-foreground font-medium">{traveler.name}</p>
          <p className="text-sm text-muted-foreground">{traveler.bio}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {countries.map((c) => (
              <span key={c} className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                <Globe className="h-3 w-3" />
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Pinned Trips */}
        <div className="px-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-sans text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Pin className="h-3.5 w-3.5 text-primary" />
              Pinned Trips
            </h3>
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
            <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-5 text-center">
              <Pin className="mx-auto h-5 w-5 text-primary/50" />
              <p className="mt-1.5 text-xs text-muted-foreground">
                {isOwnProfile ? "Pin your first trip!" : "No pinned trips yet."}
              </p>
              {isOwnProfile && (
                <button
                  onClick={() => navigate("/create-pinned-trip")}
                  className="mt-2 rounded-xl bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground"
                >
                  Create Pinned Trip
                </button>
              )}
            </div>
          )}
        </div>

        {/* Check-ins Map */}
        <div className="px-4 pt-2 pb-4">
          <h3 className="font-sans text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            Check-in Map ({travelerPlaces.length})
          </h3>
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm" style={{ height: 280 }}>
            <MapView
              places={travelerPlaces}
              onPlaceSelect={(p) => {
                setSelectedPlace(p);
                navigate(`/place/${p.id}`);
              }}
              selectedPlace={selectedPlace}
              height="280px"
            />
          </div>

          <div className="mt-3 space-y-2">
            {travelerPlaces.map((place) => (
              <button
                key={place.id}
                onClick={() => navigate(`/place/${place.id}`)}
                className="w-full flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-shadow hover:shadow-sm text-left"
              >
                <img src={place.image} alt={place.name} className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{place.name}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 text-primary" /> {place.city}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
