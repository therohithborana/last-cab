import Link from 'next/link';
import { Car } from 'lucide-react';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className="p-4 flex justify-between items-center border-b shrink-0 bg-card/50 backdrop-blur-lg">
      <Link href="/" className="flex items-center gap-3" aria-label="Home">
        <div className="p-2 bg-primary rounded-lg">
           <Car className="h-6 w-6 text-primary-foreground" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Last Cab</h1>
      </Link>
      <Button asChild>
        <Link href="/driver/login">Driver Portal</Link>
      </Button>
    </header>
  );
}
