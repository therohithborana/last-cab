import { LatLngExpression } from 'leaflet';

export interface BusStop {
  id: string;
  name: string;
  position: LatLngExpression;
}

export const busStops: BusStop[] = [
  {
    id: 'mandya',
    name: 'Mandya Bus Stand',
    position: [12.527535, 76.889412]
  },
  {
    id: 'court',
    name: 'Court Stop',
    position: [12.526869, 76.8846245]
  },
  {
    id: 'pesce',
    name: 'PESCE',
    position: [12.520380156225144, 76.88142859543674]
  }
];

// Define the path coordinates following the road route
export const pathCoordinates: LatLngExpression[] = [
  [12.520380156225144, 76.88142859543674], // PESCE
  [12.526559, 76.883025], // Intermediate point
  [12.526869, 76.8846245], // Court Stop
  [12.527535, 76.889412] // Mandya Bus Stand
];