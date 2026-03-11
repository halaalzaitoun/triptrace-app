import lisbon1 from "@/assets/places/lisbon-1.jpg";
import lisbon2 from "@/assets/places/lisbon-2.jpg";
import paris1 from "@/assets/places/paris-1.jpg";
import paris2 from "@/assets/places/paris-2.jpg";
import tokyo1 from "@/assets/places/tokyo-1.jpg";
import tokyo2 from "@/assets/places/tokyo-2.jpg";
import barcelona1 from "@/assets/places/barcelona-1.jpg";
import barcelona2 from "@/assets/places/barcelona-2.jpg";
import newyork1 from "@/assets/places/newyork-1.jpg";
import newyork2 from "@/assets/places/newyork-2.jpg";

export interface Traveler {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  countriesVisited: number;
}

export interface CheckIn {
  travelerId: string;
  comment: string;
  date: string;
}

export interface Place {
  id: string;
  name: string;
  city: string;
  country: string;
  image: string;
  description: string;
  category: string[];
  tags: string[];
  checkIns: CheckIn[];
  lat: number;
  lng: number;
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  placeIds: string[];
}

export const travelers: Traveler[] = [
  { id: "t1", name: "Sofia Mendes", avatar: "https://i.pravatar.cc/150?img=1", bio: "Photographer & food lover. Always chasing golden hour.", countriesVisited: 24 },
  { id: "t2", name: "James Chen", avatar: "https://i.pravatar.cc/150?img=3", bio: "Remote worker exploring one city at a time.", countriesVisited: 18 },
  { id: "t3", name: "Amélie Dupont", avatar: "https://i.pravatar.cc/150?img=5", bio: "Café connoisseur and vintage shop hunter.", countriesVisited: 12 },
  { id: "t4", name: "Kenji Tanaka", avatar: "https://i.pravatar.cc/150?img=7", bio: "Architecture nerd. I travel for buildings.", countriesVisited: 31 },
  { id: "t5", name: "Lena Fischer", avatar: "https://i.pravatar.cc/150?img=9", bio: "Slow traveler, journal keeper, sunset collector.", countriesVisited: 15 },
];

export const places: Place[] = [
  {
    id: "p1", name: "Miradouro da Graça", city: "Lisbon", country: "Portugal",
    image: lisbon1,
    description: "One of the best viewpoints in Lisbon with panoramic views of the city, the Tagus river, and the iconic red rooftops. Perfect for sunset.",
    category: ["Viewpoint", "Park"],
    tags: ["hidden gem", "popular with locals"],
    checkIns: [
      { travelerId: "t1", comment: "Watched the most incredible sunset here. Bring wine and a blanket.", date: "2025-09-15" },
      { travelerId: "t5", comment: "Quiet in the morning, magical at golden hour.", date: "2025-08-22" },
    ],
    lat: 38.7195, lng: -9.1316,
  },
  {
    id: "p2", name: "Le Marais Vintage Café", city: "Paris", country: "France",
    image: paris1,
    description: "A hidden café tucked in the Marais district. Art deco interior, excellent pastries, and the best café crème in Paris.",
    category: ["Café", "Restaurant"],
    tags: ["hidden gem", "3 travelers visited"],
    checkIns: [
      { travelerId: "t3", comment: "My absolute favorite café in Paris. The croissants are unreal.", date: "2025-10-03" },
      { travelerId: "t2", comment: "Great WiFi and even better coffee. Worked here for a week.", date: "2025-07-18" },
      { travelerId: "t1", comment: "Charming interior, perfect for a rainy afternoon.", date: "2025-06-11" },
    ],
    lat: 48.8566, lng: 2.3622,
  },
  {
    id: "p3", name: "Senso-ji Temple", city: "Tokyo", country: "Japan",
    image: tokyo1,
    description: "Tokyo's oldest temple in Asakusa. The approach through Nakamise-dori is lined with traditional shops and snacks.",
    category: ["Temple", "Museum"],
    tags: ["popular with locals"],
    checkIns: [
      { travelerId: "t4", comment: "Go early morning to avoid crowds. The architecture is breathtaking.", date: "2025-11-05" },
      { travelerId: "t2", comment: "The surrounding streets are just as interesting as the temple itself.", date: "2025-04-20" },
    ],
    lat: 35.7148, lng: 139.7967,
  },
  {
    id: "p4", name: "El Born Cultural Centre", city: "Barcelona", country: "Spain",
    image: barcelona1,
    description: "A stunning cultural space built inside a 19th-century market hall. Features archaeological ruins underneath and rotating exhibitions.",
    category: ["Museum", "Culture"],
    tags: ["hidden gem"],
    checkIns: [
      { travelerId: "t4", comment: "The ruins beneath the glass floor are incredible. Free entry on Sundays.", date: "2025-05-14" },
    ],
    lat: 41.3851, lng: 2.1834,
  },
  {
    id: "p5", name: "Devoción Coffee", city: "New York", country: "USA",
    image: newyork1,
    description: "A Williamsburg coffee shop with beans sourced directly from Colombian farms. The living green wall and skylight make it feel like a greenhouse.",
    category: ["Café"],
    tags: ["popular with locals", "3 travelers visited"],
    checkIns: [
      { travelerId: "t2", comment: "Best cold brew in NYC. The space is stunning.", date: "2025-03-10" },
      { travelerId: "t3", comment: "Fell in love with this place. The Colombian beans are next level.", date: "2025-06-28" },
      { travelerId: "t5", comment: "Journaled here for hours. Such a peaceful vibe.", date: "2025-08-02" },
    ],
    lat: 40.7128, lng: -73.9575,
  },
  {
    id: "p6", name: "Rooftop Bar TOPO", city: "Lisbon", country: "Portugal",
    image: lisbon2,
    description: "Trendy rooftop bar on Martim Moniz with craft cocktails and stunning views over the city. Great DJ sets on weekends.",
    category: ["Bar", "Restaurant"],
    tags: ["popular with locals"],
    checkIns: [
      { travelerId: "t1", comment: "The cocktails are as good as the views. Go for sunset.", date: "2025-09-16" },
      { travelerId: "t3", comment: "Perfect start to a night out in Lisbon.", date: "2025-07-02" },
    ],
    lat: 38.7155, lng: -9.1365,
  },
  {
    id: "p7", name: "Trocadéro Gardens", city: "Paris", country: "France",
    image: paris2,
    description: "The best spot to photograph the Eiffel Tower. The gardens and fountains create a cinematic backdrop, especially at sunset.",
    category: ["Park", "Viewpoint"],
    tags: ["3 travelers visited"],
    checkIns: [
      { travelerId: "t1", comment: "Every photographer's dream spot. Golden hour here is unmatched.", date: "2025-10-04" },
      { travelerId: "t5", comment: "Sat on the steps for hours just taking it all in.", date: "2025-06-12" },
      { travelerId: "t4", comment: "The symmetry of this view never gets old.", date: "2025-08-30" },
    ],
    lat: 48.8617, lng: 2.2885,
  },
  {
    id: "p8", name: "Omoide Yokocho", city: "Tokyo", country: "Japan",
    image: tokyo2,
    description: "A narrow alley of tiny yakitori bars near Shinjuku Station. Smoky, atmospheric, and full of character. The real Tokyo experience.",
    category: ["Restaurant", "Nightlife"],
    tags: ["hidden gem", "popular with locals"],
    checkIns: [
      { travelerId: "t4", comment: "Squeeze into any tiny bar and point at what looks good. Trust me.", date: "2025-11-06" },
      { travelerId: "t2", comment: "This is the Tokyo you see in movies. Absolutely electric at night.", date: "2025-04-21" },
    ],
    lat: 35.6938, lng: 139.6989,
  },
  {
    id: "p9", name: "Park Güell", city: "Barcelona", country: "Spain",
    image: barcelona2,
    description: "Gaudí's colorful mosaic park overlooking Barcelona. The organic architecture and tile work make it feel like a fairytale.",
    category: ["Park", "Museum"],
    tags: ["popular with locals", "3 travelers visited"],
    checkIns: [
      { travelerId: "t4", comment: "Gaudí was a genius. Every corner reveals a new detail.", date: "2025-05-15" },
      { travelerId: "t1", comment: "The view from the terrace is postcard-perfect.", date: "2025-03-22" },
      { travelerId: "t5", comment: "Buy tickets in advance! Worth every penny.", date: "2025-07-09" },
    ],
    lat: 41.4145, lng: 2.1527,
  },
  {
    id: "p10", name: "Central Park", city: "New York", country: "USA",
    image: newyork2,
    description: "An 843-acre urban oasis in the heart of Manhattan. Perfect for a morning run, afternoon picnic, or simply watching the seasons change.",
    category: ["Park"],
    tags: ["popular with locals"],
    checkIns: [
      { travelerId: "t5", comment: "Autumn here is pure magic. The golden light through the trees...", date: "2025-10-20" },
      { travelerId: "t2", comment: "Rented a bike and explored for half a day. So many hidden spots.", date: "2025-05-05" },
    ],
    lat: 40.7829, lng: -73.9654,
  },
];

export const initialTrips: Trip[] = [
  { id: "trip1", name: "Lisbon Weekend", destination: "Lisbon", placeIds: ["p1"] },
  { id: "trip2", name: "Tokyo Adventure", destination: "Tokyo", placeIds: [] },
];

export function getTraveler(id: string): Traveler | undefined {
  return travelers.find((t) => t.id === id);
}

export function getPlace(id: string): Place | undefined {
  return places.find((p) => p.id === id);
}

export function getTravelerPlaces(travelerId: string): Place[] {
  return places.filter((p) => p.checkIns.some((c) => c.travelerId === travelerId));
}
