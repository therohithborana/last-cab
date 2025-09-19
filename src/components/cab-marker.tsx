import { Car } from 'lucide-react';
import { divIcon } from 'leaflet';
import { renderToString } from 'react-dom/server';


const CabMarkerComponent = () => (
    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg border-4 border-background transition-transform duration-500 ease-in-out hover:scale-110">
      <Car className="w-5 h-5 text-primary-foreground" />
    </div>
);


export const CabMarkerIcon = divIcon({
    html: renderToString(<CabMarkerComponent />),
    className: 'bg-transparent border-0',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});
