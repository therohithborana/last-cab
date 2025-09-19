import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LogOut, UserCheck, UserX, User, MoreVertical } from 'lucide-react';
import { logout } from '../actions';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const pendingDrivers = [
  { id: '1', name: 'John Doe', email: 'john.d@example.com', date: '2024-05-20' },
  { id: '2', name: 'Jane Smith', email: 'jane.s@example.com', date: '2024-05-19' },
  { id: '3', name: 'Sam Wilson', email: 'sam.w@example.com', date: '2024-05-18' },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
        <header className="p-4 flex justify-between items-center border-b shrink-0">
            <div className="flex items-center gap-2">
                <User className="h-6 w-6" />
                <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
            </div>
            <form action={logout}>
                <Button variant="outline">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </form>
        </header>

      <main className="p-4 sm:p-6 lg:p-8">
      <Card>
        <CardHeader>
            <CardTitle className="text-2xl font-bold">Driver Registrations</CardTitle>
            <CardDescription>Approve or reject new driver sign-ups.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead className="hidden md:table-cell">Registration Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="font-medium">{driver.name}</div>
                    <div className="text-sm text-muted-foreground">{driver.email}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono">{driver.date}</TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <UserCheck className="mr-2 h-4 w-4 text-green-500" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                             <UserX className="mr-2 h-4 w-4" />
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {pendingDrivers.length === 0 && (
             <div className="text-center p-8 text-muted-foreground">
                No pending driver requests.
            </div>
          )}
        </CardContent>
      </Card>
      </main>
    </div>
  );
}
