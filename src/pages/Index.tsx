import { places } from "@/data/mockData";
import PlaceCard from "@/components/PlaceCard";
import { Search } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [search, setSearch] = useState("");
  const filtered = places.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <h1 className="text-xl font-display font-bold text-foreground">TripTrace</h1>
        <p className="text-xs text-muted-foreground">Discover places through people you trust</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search places, cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </header>

      <main className="mx-auto max-w-lg space-y-4 px-4 pt-4">
        {filtered.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
        {filtered.length === 0 && (
          <p className="pt-12 text-center text-muted-foreground">No places found.</p>
        )}
      </main>
    </div>
  );
};

export default Index;
