// layout.tsx or _app.tsx (depending on your setup)
import './globals.css';
import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';
import { AuthProvider } from '@/context/AuthContext'; // Import the AuthProvider

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
