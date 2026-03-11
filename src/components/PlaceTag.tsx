import { Gem, Users, Flame } from "lucide-react";

interface PlaceTagProps {
  tag: string;
}

export default function PlaceTag({ tag }: PlaceTagProps) {
  if (tag === "hidden gem") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-tag-gem px-2.5 py-0.5 text-[11px] font-medium text-tag-gem-foreground">
        <Gem className="h-3 w-3" /> Hidden Gem
      </span>
    );
  }
  if (tag === "popular with locals") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-tag-popular px-2.5 py-0.5 text-[11px] font-medium text-tag-popular-foreground">
        <Flame className="h-3 w-3" /> Popular with locals
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-tag-visitors px-2.5 py-0.5 text-[11px] font-medium text-tag-visitors-foreground">
      <Users className="h-3 w-3" /> {tag}
    </span>
  );
}
