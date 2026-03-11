import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { places, Place, getTraveler } from "@/data/mockData";
import { MapPin, X } from "lucide-react";
import SaveButton from "@/components/SaveButton";

const cities = [
  { name: "All", lat: 40, lng: 0 },
  { name: "Lisbon", lat: 38.7167, lng: -9.1395 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Barcelona", lat: 41.3874, lng: 2.1686 },
  { name: "New York", lat: 40.7128, lng: -74.006 },
];

export default function MapDiscovery() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const filtered =
    selectedCity === "All"
      ? places
      : places.filter((p) => p.city === selectedCity);

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md">
        <h1 className="text-lg font-display font-bold text-foreground">Explore Map</h1>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => { setSelectedCity(city.name); setSelectedPlace(null); }}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                selectedCity === city.name
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </header>

      {/* Simulated map with pins */}
      <div className="relative mx-auto max-w-lg bg-secondary/50" style={{ minHeight: "calc(100vh - 180px)" }}>
        <div className="grid grid-cols-2 gap-3 p-4">
          {filtered.map((place) => (
            <button
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all ${
                selectedPlace?.id === place.id
                  ? "border-primary bg-background shadow-md"
                  : "border-border bg-card hover:shadow-sm"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-semibold text-foreground text-center leading-tight">{place.name}</span>
              <span className="text-[10px] text-muted-foreground">{place.city}</span>
            </button>
          ))}
        </div>

        {/* Place preview card */}
        {selectedPlace && (
          <div className="fixed bottom-20 left-0 right-0 z-50 px-4 animate-slide-up">
            <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
              <div className="relative">
                <img src={selectedPlace.image} alt={selectedPlace.name} className="h-36 w-full object-cover" />
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <X className="h-4 w-4 text-foreground" />
                </button>
              </div>
              <div className="p-3.5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-sans text-sm font-semibold text-foreground">{selectedPlace.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedPlace.city}, {selectedPlace.country}</p>
                  </div>
                  <SaveButton placeId={selectedPlace.id} size="sm" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{selectedPlace.description}</p>
                <div className="mt-2 flex items-center gap-1">
                  {selectedPlace.checkIns.slice(0, 3).map((c) => {
                    const t = getTraveler(c.travelerId);
                    return t ? (
                      <img key={t.id} src={t.avatar} alt={t.name} className="-ml-1 first:ml-0 h-6 w-6 rounded-full border-2 border-background object-cover" />
                    ) : null;
                  })}
                  <span className="ml-1 text-[11px] text-muted-foreground">
                    {selectedPlace.checkIns.length} visited
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/place/${selectedPlace.id}`)}
                  className="mt-3 w-full rounded-xl bg-primary py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
