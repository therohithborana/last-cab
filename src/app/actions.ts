'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Mock users. In a real app, this would involve a database and password hashing.
const drivers = [{ email: 'driver@lastcab.com', password: 'password123' }];
const admins = [{ email: 'admin@lastcab.com', password: 'password123' }];

export async function login(prevState: any, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return { error: 'Invalid form data.' };
  }

  const driver = drivers.find(d => d.email === email && d.password === password);
  if (driver) {
    cookies().set('session', `driver:${email}`, { httpOnly: true, path: '/', secure: process.env.NODE_ENV === 'production' });
    return redirect('/driver/dashboard');
  }

  const admin = admins.find(a => a.email === email && a.password === password);
  if (admin) {
    cookies().set('session', `admin:${email}`, { httpOnly: true, path: '/', secure: process.env.NODE_ENV === 'production' });
    return redirect('/admin');
  }

  return { error: 'Invalid email or password.' };
}

export async function logout() {
  cookies().delete('session');
  redirect('/driver/login');
}
