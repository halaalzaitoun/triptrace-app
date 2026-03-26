import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Place, getTraveler } from "@/data/mockData";

interface MapViewProps {
  places: Place[];
  onPlaceSelect?: (place: Place) => void;
  selectedPlace?: Place | null;
  center?: [number, number];
  zoom?: number;
  height?: string;
  interactive?: boolean;
}

const createPinIcon = (isSelected: boolean) => {
  return L.divIcon({
    className: "custom-pin",
    html: `<div style="
      width: ${isSelected ? 40 : 32}px;
      height: ${isSelected ? 40 : 32}px;
      background: ${isSelected ? "hsl(152, 45%, 35%)" : "hsl(152, 45%, 42%)"};
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid ${isSelected ? "hsl(42, 55%, 58%)" : "white"};
      box-shadow: 0 3px 12px rgba(0,0,0,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    "><div style="
      width: ${isSelected ? 16 : 12}px;
      height: ${isSelected ? 16 : 12}px;
      background: white;
      border-radius: 50%;
      transform: rotate(45deg);
    "></div></div>`,
    iconSize: [isSelected ? 40 : 32, isSelected ? 40 : 32],
    iconAnchor: [isSelected ? 20 : 16, isSelected ? 40 : 32],
  });
};

export default function MapView({
  places,
  onPlaceSelect,
  selectedPlace,
  center = [38, 5],
  zoom = 3,
  height = "100%",
  interactive = true,
}: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: center as L.LatLngExpression,
      zoom,
      zoomControl: interactive,
      scrollWheelZoom: interactive,
      dragging: interactive,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;
    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    places.forEach((place) => {
      const isSelected = selectedPlace?.id === place.id;
      const marker = L.marker([place.lat, place.lng], {
        icon: createPinIcon(isSelected),
      }).addTo(map);

      const travelers = place.checkIns
        .slice(0, 3)
        .map((c) => getTraveler(c.travelerId))
        .filter(Boolean);

      const avatarsHtml = travelers
        .map(
          (t) =>
            `<img src="${t!.avatar}" style="width:22px;height:22px;border-radius:50%;border:2px solid white;margin-left:-5px;object-fit:cover;" />`
        )
        .join("");

      marker.bindTooltip(
        `<div style="font-family:'DM Sans',sans-serif;padding:6px 2px;">
          <strong style="font-size:12px;color:#1a3a2a;">${place.name}</strong><br/>
          <span style="font-size:11px;color:#6b7c6e;">${place.city}, ${place.country}</span>
          <div style="margin-top:5px;display:flex;align-items:center;">
            ${avatarsHtml}
            <span style="margin-left:8px;font-size:10px;color:#6b7c6e;">${place.checkIns.length} check-ins</span>
          </div>
        </div>`,
        { direction: "top", offset: [0, -10] }
      );

      if (onPlaceSelect) {
        marker.on("click", () => onPlaceSelect(place));
      }

      markersRef.current.push(marker);
    });
  }, [places, selectedPlace, onPlaceSelect]);

  const prevCenter = useRef(center);
  const prevZoom = useRef(zoom);
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (prevCenter.current[0] !== center[0] || prevCenter.current[1] !== center[1] || prevZoom.current !== zoom) {
      map.flyTo(center as L.LatLngExpression, zoom, { duration: 0.8 });
      prevCenter.current = center;
      prevZoom.current = zoom;
    }
  }, [center, zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedPlace) return;
    map.flyTo([selectedPlace.lat, selectedPlace.lng], Math.max(map.getZoom(), 10), {
      duration: 0.8,
    });
  }, [selectedPlace]);

  return (
    <div
      ref={mapRef}
      style={{ height, width: "100%", minHeight: "300px" }}
      className="rounded-xl overflow-hidden"
    />
  );
}
