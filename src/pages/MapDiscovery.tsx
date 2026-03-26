import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { places, Place, getTraveler } from "@/data/mockData";
import { Search, X, MapPin, Navigation, Users, Globe } from "lucide-react";
import SaveButton from "@/components/SaveButton";
import MapView from "@/components/MapView";

const cities = [
  { name: "All", lat: 38, lng: 5, zoom: 3 },
  { name: "Lisbon", lat: 38.7167, lng: -9.1395, zoom: 13 },
  { name: "Paris", lat: 48.8566, lng: 2.3522, zoom: 13 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, zoom: 12 },
  { name: "Barcelona", lat: 41.3874, lng: 2.1686, zoom: 13 },
  { name: "New York", lat: 40.7128, lng: -74.006, zoom: 12 },
];

export default function MapDiscovery() {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = selectedCity === "All" ? places : places.filter((p) => p.city === selectedCity);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCity, search]);

  return (
    <div className="h-screen pb-16 flex flex-col overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="relative px-4 py-3">
          <div className="absolute inset-0 travel-dots opacity-20 pointer-events-none" />
          <div className="relative flex items-center justify-between">
            <h1 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="h-4.5 w-4.5 text-primary" />
              </div>
              Explore
            </h1>
          </div>
        </div>
        {/* Search */}
        <div className="px-4">
          <div className="flex items-center gap-2 rounded-xl bg-secondary px-3.5 py-2.5 border border-border/50">
            <Search className="h-4 w-4 text-primary" />
            <input
              type="text"
              placeholder="Search cities or places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            {search && (
              <button onClick={() => setSearch("")}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
        {/* City chips */}
        <div className="mt-2.5 px-4 flex gap-2 overflow-x-auto pb-3 no-scrollbar">
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => {
                setSelectedCity(city.name);
                setSelectedPlace(null);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                selectedCity === city.name
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-muted border border-border/50"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </header>

      {/* Map */}
      <div className="flex-1 relative min-h-0">
        <MapView
          places={filtered}
          onPlaceSelect={setSelectedPlace}
          selectedPlace={selectedPlace}
          center={[cities.find((c) => c.name === selectedCity)?.lat || 38, cities.find((c) => c.name === selectedCity)?.lng || 5]}
          zoom={cities.find((c) => c.name === selectedCity)?.zoom || 3}
        />

        {/* Place count badge */}
        <div className="absolute top-3 right-3 z-[1000] rounded-full bg-primary/90 backdrop-blur-sm px-3.5 py-2 shadow-lg">
          <span className="text-xs font-semibold text-primary-foreground flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {filtered.length} places
          </span>
        </div>

        {/* Place preview card */}
        {selectedPlace && (
          <div className="absolute bottom-4 left-3 right-3 z-[1000] animate-slide-up">
            <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-xl">
              <div className="relative">
                <img src={selectedPlace.image} alt={selectedPlace.name} className="h-36 w-full object-cover" />
                <button
                  onClick={() => setSelectedPlace(null)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
                >
                  <X className="h-4 w-4 text-foreground" />
                </button>
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-foreground/50 to-transparent" />
                {/* Category badge */}
                <div className="absolute top-2 left-2 rounded-full bg-primary/90 backdrop-blur-sm px-2.5 py-1">
                  <span className="text-[10px] font-medium text-primary-foreground">{selectedPlace.category[0]}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-sans text-sm font-bold text-foreground">{selectedPlace.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                      <MapPin className="h-3 w-3 text-primary" /> {selectedPlace.city}, {selectedPlace.country}
                    </p>
                  </div>
                  <SaveButton placeId={selectedPlace.id} size="sm" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{selectedPlace.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center">
                    {selectedPlace.checkIns.slice(0, 3).map((c) => {
                      const t = getTraveler(c.travelerId);
                      return t ? (
                        <img key={t.id} src={t.avatar} alt={t.name} className="-ml-1.5 first:ml-0 h-7 w-7 rounded-full border-2 border-background object-cover" />
                      ) : null;
                    })}
                    <span className="ml-2 text-[11px] text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {selectedPlace.checkIns.length} check-ins
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/place/${selectedPlace.id}`)}
                    className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:opacity-90 shadow-sm"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
