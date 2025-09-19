'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { logout } from '@/app/actions';
import { MapPin, LogOut, Power, PowerOff, Wifi, WifiOff } from 'lucide-react';

export default function DashboardPage() {
  const [isSharing, setIsSharing] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const handleLocationError = (error: GeolocationPositionError) => {
    let message = 'An unknown error occurred.';
    switch (error.code) {
      case error.PERMISSION_DENIED:
        message = 'Location permission denied. Please enable it in your browser settings.';
        alert(message);
        break;
      case error.POSITION_UNAVAILABLE:
        message = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        message = 'The request to get user location timed out.';
        break;
    }
    console.error('Geolocation Error:', message, `(code: ${error.code})`);
    setError(message);
    stopSharing();
  };

  const postLocation = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    try {
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat: latitude, lng: longitude }),
      });
      if (!response.ok) {
        throw new Error('Server responded with an error');
      }
      console.log('Location posted:', { latitude, longitude });
      setError(null);
    } catch (fetchError) {
      console.error('Failed to post location:', fetchError);
      setError('Failed to send location to server.');
    }
  };

  const startSharing = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsSharing(true);
    setError(null);
    
    const options = { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 };

    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentPosition(position);
        postLocation(position);
      },
      handleLocationError,
      options
    );
  };

  const stopSharing = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsSharing(false);
  };

  useEffect(() => {
    return () => stopSharing();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold">Driver Dashboard</CardTitle>
              <CardDescription>Manage your location sharing status</CardDescription>
            </div>
            <form action={logout}>
              <Button variant="ghost" size="icon" aria-label="Logout">
                <LogOut className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            {isSharing ? (
              <Button onClick={stopSharing} variant="destructive" size="lg" className="w-full h-24 text-lg font-semibold">
                <PowerOff className="mr-2 h-8 w-8" /> Stop Sharing
              </Button>
            ) : (
              <Button onClick={startSharing} size="lg" className="w-full h-24 text-lg font-semibold text-primary-foreground hover:bg-primary/90">
                <Power className="mr-2 h-8 w-8" /> Start Sharing
              </Button>
            )}
            <div className={`p-4 rounded-md w-full text-center font-medium ${isSharing && !error ? 'bg-green-600/20 text-green-400' : 'bg-destructive/20 text-destructive'}`}>
              {isSharing && !error ? (
                <div className="flex items-center justify-center gap-2"><Wifi className="h-5 w-5 animate-pulse" /> Live</div>
              ) : (
                <div className="flex items-center justify-center gap-2"><WifiOff className="h-5 w-5" /> Offline</div>
              )}
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground p-4 border rounded-lg min-h-[100px] bg-background/30">
            <h3 className="font-semibold text-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> Last Known Position</h3>
            {error && <p className="text-destructive font-medium">{error}</p>}
            {currentPosition ? (
              <>
                <p>Latitude: <span className="font-mono text-foreground">{currentPosition.coords.latitude.toFixed(6)}</span></p>
                <p>Longitude: <span className="font-mono text-foreground">{currentPosition.coords.longitude.toFixed(6)}</span></p>
              </>
            ) : (
              <p>{isSharing ? 'Acquiring location...' : 'Not available'}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
