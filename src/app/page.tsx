'use client';

import Header from '@/components/header';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { Skeleton } from '@/components/ui/skeleton';

const Map = dynamic(() => import('@/components/map'), { 
  ssr: false,
  loading: () => <Skeleton className="w-full h-full" />,
});

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 flex flex-col">
          <Map />
      </main>
    </div>
  );
}
