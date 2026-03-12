import { places, travelers, getTraveler, getPlace, initialPinnedTrips } from "@/data/mockData";
import { usePinnedTrips } from "@/contexts/PinnedTripContext";
import { useNavigate } from "react-router-dom";
import { Search, Heart, MessageCircle, Send, Bookmark, MapPin, ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { useState, useRef } from "react";
import SaveButton from "@/components/SaveButton";
import PinnedTripCard from "@/components/PinnedTripCard";

// Build check-in feed items (Instagram-style posts)
interface FeedPost {
  id: string;
  type: "checkin" | "pinned";
  traveler: ReturnType<typeof getTraveler>;
  date: string;
  // For check-in posts
  places?: typeof places;
  comment?: string;
  // For pinned trip posts
  pinnedTrip?: (typeof initialPinnedTrips)[0];
}

function buildFeed(): FeedPost[] {
  const feed: FeedPost[] = [];

  // Group check-ins by traveler + city into "posts"
  const travelerCityMap = new Map<string, { traveler: ReturnType<typeof getTraveler>; places: typeof places; date: string; comment: string }>();

  places.forEach((place) => {
    place.checkIns.forEach((checkIn) => {
      const key = `${checkIn.travelerId}-${place.city}`;
      if (!travelerCityMap.has(key)) {
        travelerCityMap.set(key, {
          traveler: getTraveler(checkIn.travelerId),
          places: [],
          date: checkIn.date,
          comment: checkIn.comment,
        });
      }
      travelerCityMap.get(key)!.places.push(place);
      // Use latest date
      if (checkIn.date > travelerCityMap.get(key)!.date) {
        travelerCityMap.get(key)!.date = checkIn.date;
      }
    });
  });

  travelerCityMap.forEach((item, key) => {
    feed.push({
      id: `checkin-${key}`,
      type: "checkin",
      traveler: item.traveler,
      date: item.date,
      places: item.places,
      comment: item.comment,
    });
  });

  // Add pinned trips
  initialPinnedTrips.forEach((pt) => {
    feed.push({
      id: `pinned-${pt.id}`,
      type: "pinned",
      traveler: getTraveler(pt.travelerId),
      date: pt.dateRange.split("–")[0]?.trim() || "",
      pinnedTrip: pt,
    });
  });

  // Sort by date descending
  feed.sort((a, b) => b.date.localeCompare(a.date));
  return feed;
}

function CheckInPost({ post }: { post: FeedPost }) {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const postPlaces = post.places || [];
  const currentPlace = postPlaces[currentIdx];

  if (!currentPlace || !post.traveler) return null;

  return (
    <article className="border-b border-border bg-background animate-fade-in">
      {/* Post header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src={post.traveler.avatar}
          alt={post.traveler.name}
          className="h-9 w-9 rounded-full object-cover ring-2 ring-primary/30 cursor-pointer"
          onClick={() => navigate(`/profile/${post.traveler!.id}`)}
        />
        <div className="flex-1">
          <span
            className="text-sm font-semibold text-foreground cursor-pointer hover:underline"
            onClick={() => navigate(`/profile/${post.traveler!.id}`)}
          >
            {post.traveler.name}
          </span>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {currentPlace.city}, {currentPlace.country}
          </p>
        </div>
        <span className="text-[11px] text-muted-foreground">{post.date}</span>
      </div>

      {/* Image carousel */}
      <div className="relative">
        <img
          src={currentPlace.image}
          alt={currentPlace.name}
          className="w-full aspect-square object-cover cursor-pointer"
          onClick={() => navigate(`/place/${currentPlace.id}`)}
        />

        {/* Place tag overlay */}
        <button
          onClick={() => navigate(`/place/${currentPlace.id}`)}
          className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-background/85 backdrop-blur-sm px-3 py-1.5 shadow-md border border-border/50"
        >
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-foreground">{currentPlace.name}</span>
        </button>

        {/* Carousel arrows */}
        {postPlaces.length > 1 && (
          <>
            {currentIdx > 0 && (
              <button
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow"
              >
                <ChevronLeft className="h-4 w-4 text-foreground" />
              </button>
            )}
            {currentIdx < postPlaces.length - 1 && (
              <button
                onClick={() => setCurrentIdx(currentIdx + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow"
              >
                <ChevronRight className="h-4 w-4 text-foreground" />
              </button>
            )}
            {/* Dots */}
            <div className="absolute bottom-3 right-3 flex gap-1">
              {postPlaces.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentIdx ? "w-4 bg-primary" : "w-1.5 bg-background/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Action row */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-4">
          <Heart className="h-5 w-5 text-foreground cursor-pointer hover:text-primary transition-colors" />
          <MessageCircle className="h-5 w-5 text-foreground cursor-pointer hover:text-primary transition-colors" />
          <Send className="h-5 w-5 text-foreground cursor-pointer hover:text-primary transition-colors" />
        </div>
        <SaveButton placeId={currentPlace.id} size="sm" />
      </div>

      {/* Comment */}
      <div className="px-4 pb-3.5">
        <p className="text-sm text-foreground">
          <span className="font-semibold">{post.traveler.name}</span>{" "}
          <span className="text-muted-foreground italic">"{post.comment}"</span>
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          {postPlaces.length} place{postPlaces.length !== 1 ? "s" : ""} checked in
        </p>
      </div>
    </article>
  );
}

function PinnedTripPost({ post }: { post: FeedPost }) {
  const navigate = useNavigate();
  const trip = post.pinnedTrip!;
  const tripPlaces = trip.placeIds.map(getPlace).filter(Boolean);

  if (!post.traveler) return null;

  return (
    <article className="border-b border-border bg-background animate-fade-in">
      {/* Post header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <img
          src={post.traveler.avatar}
          alt={post.traveler.name}
          className="h-9 w-9 rounded-full object-cover ring-2 ring-accent/30 cursor-pointer"
          onClick={() => navigate(`/profile/${post.traveler!.id}`)}
        />
        <div className="flex-1">
          <span className="text-sm font-semibold text-foreground cursor-pointer hover:underline"
            onClick={() => navigate(`/profile/${post.traveler!.id}`)}
          >
            {post.traveler.name}
          </span>
          <p className="flex items-center gap-1 text-xs text-accent font-medium">
            <Compass className="h-3 w-3" />
            Pinned Trip
          </p>
        </div>
      </div>

      {/* Trip card */}
      <div onClick={() => navigate(`/pinned/${trip.id}`)} className="cursor-pointer">
        <div className="relative">
          <img src={trip.coverImage} alt={trip.title} className="w-full aspect-[16/9] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <h3 className="font-display text-lg font-bold text-white">{trip.title}</h3>
            <p className="flex items-center gap-1 text-xs text-white/80">
              <MapPin className="h-3 w-3" /> {trip.destination} · {trip.dateRange}
            </p>
          </div>
        </div>
      </div>

      {/* Summary + places */}
      <div className="px-4 py-3">
        <p className="text-sm text-muted-foreground">{trip.summary}</p>
        <div className="mt-2.5 flex gap-2 overflow-x-auto no-scrollbar">
          {tripPlaces.map((place) =>
            place ? (
              <button
                key={place.id}
                onClick={() => navigate(`/place/${place.id}`)}
                className="shrink-0 flex items-center gap-1.5 rounded-lg bg-secondary px-2.5 py-1.5 text-xs text-foreground hover:bg-muted transition-colors"
              >
                <img src={place.image} alt={place.name} className="h-5 w-5 rounded object-cover" />
                {place.name}
              </button>
            ) : null
          )}
        </div>
      </div>
    </article>
  );
}

const Index = () => {
  const [search, setSearch] = useState("");
  const feed = buildFeed();

  const filtered = search.trim()
    ? feed.filter((post) => {
        const q = search.toLowerCase();
        if (post.type === "checkin") {
          return (
            post.places?.some(
              (p) =>
                p.name.toLowerCase().includes(q) ||
                p.city.toLowerCase().includes(q) ||
                p.country.toLowerCase().includes(q)
            ) || post.traveler?.name.toLowerCase().includes(q)
          );
        }
        if (post.type === "pinned") {
          return (
            post.pinnedTrip?.title.toLowerCase().includes(q) ||
            post.pinnedTrip?.destination.toLowerCase().includes(q) ||
            post.traveler?.name.toLowerCase().includes(q)
          );
        }
        return false;
      })
    : feed;

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">TripTrace</h1>
            <p className="text-[11px] text-muted-foreground">Discover places through people you trust</p>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-5 w-5 text-foreground" />
          </div>
        </div>
        <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search people, places, trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </header>

      <main className="mx-auto max-w-lg">
        {filtered.map((post) =>
          post.type === "checkin" ? (
            <CheckInPost key={post.id} post={post} />
          ) : (
            <PinnedTripPost key={post.id} post={post} />
          )
        )}
        {filtered.length === 0 && (
          <p className="pt-12 text-center text-muted-foreground">No posts found.</p>
        )}
      </main>
    </div>
  );
};

export default Index;
