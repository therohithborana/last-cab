import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from './login-form';
import { Car } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm border-0 bg-transparent sm:bg-card sm:border-border">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary rounded-full">
                <Car className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Driver Portal</CardTitle>
          <CardDescription>
            Enter your credentials to start sharing your location.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
