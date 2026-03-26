import { useState } from "react";
import { useTrips } from "@/contexts/TripContext";
import { getPlace } from "@/data/mockData";
import PlaceCard from "@/components/PlaceCard";
import { Plus, MapPin, Trash2, Pin, Compass, Plane } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function MyTrips() {
  const { trips, addTrip, removePlaceFromTrip } = useTrips();
  const navigate = useNavigate();
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDest, setNewDest] = useState("");

  const handleCreate = () => {
    if (!newName.trim() || !newDest.trim()) return;
    addTrip({
      id: `trip-${Date.now()}`,
      name: newName.trim(),
      destination: newDest.trim(),
      placeIds: [],
    });
    setNewName("");
    setNewDest("");
    setShowNew(false);
    toast.success("Trip created!");
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="relative px-4 py-3">
          <div className="absolute inset-0 travel-dots opacity-20 pointer-events-none" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Plane className="h-4 w-4 text-primary" />
              </div>
              <h1 className="text-lg font-display font-bold text-foreground">My Trips</h1>
            </div>
            <button
              onClick={() => setShowNew(!showNew)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-sm"
            >
              <Plus className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 pt-4 space-y-5">
        {showNew && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 animate-fade-in">
            <h3 className="font-sans text-sm font-semibold text-foreground flex items-center gap-2">
              <Compass className="h-4 w-4 text-primary" />
              Plan a New Trip
            </h3>
            <input
              placeholder="Trip name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-3 w-full rounded-xl bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:ring-2 focus:ring-primary/30"
            />
            <input
              placeholder="Destination city"
              value={newDest}
              onChange={(e) => setNewDest(e.target.value)}
              className="mt-2 w-full rounded-xl bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:ring-2 focus:ring-primary/30"
            />
            <div className="mt-3 flex gap-2">
              <button onClick={handleCreate} className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground shadow-sm">
                Create Trip
              </button>
              <button onClick={() => setShowNew(false)} className="rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        {trips.map((trip) => {
          const savedPlaces = trip.placeIds.map(getPlace).filter(Boolean);
          return (
            <div key={trip.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-4 border-b border-border/50">
                <h2 className="font-display text-lg font-bold text-foreground">{trip.name}</h2>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {trip.destination}
                </p>
              </div>
              {savedPlaces.length > 0 ? (
                <div className="space-y-2 p-3">
                  {savedPlaces.map((place) =>
                    place ? (
                      <div key={place.id} className="relative">
                        <PlaceCard place={place} style="compact" />
                        <button
                          onClick={() => {
                            removePlaceFromTrip(trip.id, place.id);
                            toast("Removed from trip");
                          }}
                          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : null
                  )}
                </div>
              ) : (
                <div className="px-4 py-5 text-center">
                  <MapPin className="mx-auto h-5 w-5 text-muted-foreground/40" />
                  <p className="mt-1.5 text-sm text-muted-foreground">No saved places yet</p>
                  <p className="text-xs text-muted-foreground/70">Discover and save places from the feed!</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Create Pinned Trip CTA */}
        <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-primary/15 flex items-center justify-center">
            <Pin className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-3 font-display text-sm font-semibold text-foreground">Been on a trip?</h3>
          <p className="mt-1 text-xs text-muted-foreground">Create a Pinned Trip from your check-ins to showcase on your profile.</p>
          <button
            onClick={() => navigate("/create-pinned-trip")}
            className="mt-3 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm"
          >
            Create Pinned Trip
          </button>
        </div>
      </div>
    </div>
  );
}
