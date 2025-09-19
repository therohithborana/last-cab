import { NextResponse } from 'next/server';

// This is a simple in-memory store. In a real app, you would use a database like Firestore or Redis.
let cabLocation: { lat: number; lng: number; timestamp: number } | null = {
  lat: 37.7749, // Default to San Francisco
  lng: -122.4194,
  timestamp: Date.now()
};

export async function GET() {
  return NextResponse.json(cabLocation);
}

export async function POST(request: Request) {
  try {
    const { lat, lng } = await request.json();

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return NextResponse.json({ error: 'Invalid location data' }, { status: 400 });
    }

    cabLocation = { lat, lng, timestamp: Date.now() };
    console.log('Location updated:', cabLocation);
    
    return NextResponse.json({ success: true, location: cabLocation });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse request body' }, { status: 400 });
  }
}
