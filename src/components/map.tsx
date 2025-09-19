'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { CabMarkerIcon } from './cab-marker';
import { BusStopMarkerIcon } from './bus-stop-marker';
import { busStops, pathCoordinates } from './bus-stops';

// Set initial center to the average of bus stop coordinates
const INITIAL_CENTER: LatLngExpression = [12.524928, 76.885155];
const INITIAL_ZOOM = 14;
const POLLING_INTERVAL = 5000; // 5 seconds

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const busStopMarkersRef = useRef<L.Marker[]>([]);
  const pathRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    // This effect runs only once on component mount
    if (mapContainerRef.current && !mapInstanceRef.current) {
      // Create map instance
      const map = L.map(mapContainerRef.current).setView(INITIAL_CENTER, INITIAL_ZOOM);
      mapInstanceRef.current = map;

      // Add tile layer
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }).addTo(map);

      // Create path connecting bus stops following the road route
      const path = L.polyline(pathCoordinates, {
        color: '#3b82f6', // Blue color
        weight: 5,
        opacity: 0.8,
        smoothFactor: 1
      }).addTo(map);
      pathRef.current = path;

      // Add bus stop markers
      busStopMarkersRef.current = busStops.map(stop => {
        const marker = L.marker(stop.position, { 
          icon: BusStopMarkerIcon,
          title: stop.name
        }).addTo(map);
        
        // Add popup with stop name
        marker.bindPopup(stop.name);
        
        return marker;
      });

      // Add a non-movable marker initially
      const marker = L.marker(INITIAL_CENTER, { icon: CabMarkerIcon }).addTo(map);
      markerRef.current = marker;
    }

    // Function to fetch and update location
    const updateLocation = async () => {
      try {
        const response = await fetch('/api/location');
        if (!response.ok) return;

        const data = await response.json();
        if (data && typeof data.lat === 'number' && typeof data.lng === 'number') {
          const newLatLng: LatLngExpression = [data.lat, data.lng];
          const map = mapInstanceRef.current;
          const marker = markerRef.current;

          if (map && marker) {
            // If the marker has the default position, it's the first real update, so pan the view.
            if (marker.getLatLng().equals(L.latLng(INITIAL_CENTER))) {
                map.panTo(newLatLng);
            }
            marker.setLatLng(newLatLng);
          }
        }
      } catch (error) {
        console.error("Failed to fetch location:", error);
      }
    };
    
    // Start polling
    const intervalId = setInterval(updateLocation, POLLING_INTERVAL);


    // Cleanup function to run on component unmount
    return () => {
      clearInterval(intervalId);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
