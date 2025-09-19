import { MapPin } from 'lucide-react';
import { divIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';


const BusStopMarkerComponent = () => (
    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-background">
      <MapPin className="w-4 h-4 text-white" />
    </div>
);


export const BusStopMarkerIcon = divIcon({
    html: renderToString(<BusStopMarkerComponent />),
    className: 'bg-transparent border-0',
    iconSize: [32, 32],
    iconAnchor: [16, 32]
});