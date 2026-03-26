import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, MapPin, Compass } from "lucide-react";
import { getTravelerPlaces, getPlace, Place } from "@/data/mockData";
import { usePinnedTrips } from "@/contexts/PinnedTripContext";
import { toast } from "sonner";

export default function CreatePinnedTrip() {
  const navigate = useNavigate();
  const { addPinnedTrip } = usePinnedTrips();

  const checkedInPlaces = getTravelerPlaces("t1");

  const [title, setTitle] = useState("");
  const [destination, setDestination] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [summary, setSummary] = useState("");
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>([]);

  const togglePlace = (id: string) => {
    setSelectedPlaceIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const coverImage = selectedPlaceIds.length > 0
    ? getPlace(selectedPlaceIds[0])?.image || ""
    : "";

  const canSubmit = title.trim() && destination.trim() && selectedPlaceIds.length > 0;

  const handleCreate = () => {
    if (!canSubmit) return;
    addPinnedTrip({
      id: `pt-${Date.now()}`,
      travelerId: "t1",
      title: title.trim(),
      destination: destination.trim(),
      coverImage,
      dateRange: dateRange.trim() || "Recently",
      summary: summary.trim(),
      placeIds: selectedPlaceIds,
    });
    toast.success("Pinned trip created!");
    navigate("/profile/t1");
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="relative px-4 py-3">
          <div className="absolute inset-0 travel-dots opacity-20 pointer-events-none" />
          <div className="relative flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5 text-foreground" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                <Compass className="h-4 w-4 text-primary" />
              </div>
              <h1 className="text-lg font-display font-bold text-foreground">Create Pinned Trip</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 pt-5 space-y-5">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Trip Title *</label>
          <input
            placeholder="e.g. Golden Hour in Lisbon"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-xl bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">Destination *</label>
          <input
            placeholder="e.g. Lisbon, Portugal"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1 w-full rounded-xl bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">Date Range</label>
          <input
            placeholder="e.g. Sep 14 – 18, 2025"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="mt-1 w-full rounded-xl bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-border focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">Trip Summary</label>
          <textarea
            placeholder="A short reflection on this trip..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none border border-border focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">
            Select Check-Ins * ({selectedPlaceIds.length} selected)
          </label>
          <p className="mt-0.5 text-[11px] text-muted-foreground">Choose places you actually visited</p>
          <div className="mt-2 space-y-2">
            {checkedInPlaces.map((place) => {
              const selected = selectedPlaceIds.includes(place.id);
              return (
                <button
                  key={place.id}
                  onClick={() => togglePlace(place.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                    selected
                      ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  <img src={place.image} alt={place.name} className="h-14 w-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground truncate">{place.name}</h4>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 text-primary" /> {place.city}, {place.country}
                    </p>
                  </div>
                  <div
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      selected
                        ? "border-primary bg-primary"
                        : "border-muted-foreground/30"
                    }`}
                  >
                    {selected && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={!canSubmit}
          className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity disabled:opacity-40 shadow-sm"
        >
          Pin This Trip to Profile
        </button>
      </div>
    </div>
  );
}
