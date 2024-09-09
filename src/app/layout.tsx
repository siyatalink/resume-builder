import './globals.css'; // Global CSS import
import Navbar from '@/components/Navbar'; // Import your Navbar component
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Navbar should be included here */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
