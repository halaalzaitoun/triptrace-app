import { useState } from "react";
import { useTrips } from "@/contexts/TripContext";
import { getPlace } from "@/data/mockData";
import PlaceCard from "@/components/PlaceCard";
import { Plus, MapPin, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function MyTrips() {
  const { trips, addTrip, removePlaceFromTrip } = useTrips();
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
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-display font-bold text-foreground">My Trips</h1>
          <button
            onClick={() => setShowNew(!showNew)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary"
          >
            <Plus className="h-4 w-4 text-primary-foreground" />
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 pt-4 space-y-6">
        {showNew && (
          <div className="rounded-2xl border border-border bg-card p-4 animate-fade-in">
            <h3 className="font-sans text-sm font-semibold text-foreground">New Trip</h3>
            <input
              placeholder="Trip name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="mt-2 w-full rounded-xl bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <input
              placeholder="Destination city"
              value={newDest}
              onChange={(e) => setNewDest(e.target.value)}
              className="mt-2 w-full rounded-xl bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <div className="mt-3 flex gap-2">
              <button onClick={handleCreate} className="flex-1 rounded-xl bg-primary py-2 text-sm font-medium text-primary-foreground">
                Create
              </button>
              <button onClick={() => setShowNew(false)} className="rounded-xl px-4 py-2 text-sm text-muted-foreground hover:bg-secondary">
                Cancel
              </button>
            </div>
          </div>
        )}

        {trips.map((trip) => {
          const savedPlaces = trip.placeIds.map(getPlace).filter(Boolean);
          return (
            <div key={trip.id} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-4">
                <h2 className="font-display text-lg font-bold text-foreground">{trip.name}</h2>
                <p className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {trip.destination}
                </p>
              </div>
              {savedPlaces.length > 0 ? (
                <div className="space-y-2 px-4 pb-4">
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
                <div className="px-4 pb-4">
                  <p className="text-sm text-muted-foreground">No saved places yet. Discover and save places from the feed!</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
