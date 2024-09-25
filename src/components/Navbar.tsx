"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    // Check if the user is on a logged-in only page
    const loggedInOnlyPages = ['/personal-info', '/work-exp'];
    setShowLogout(isLoggedIn || loggedInOnlyPages.some(page => pathname.startsWith(page)));
  }, [pathname, isLoggedIn]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-white-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-gray-800 font-bold text-xl">
          📄 Resume Builder
        </Link>
        <div className="space-x-4">
          {!showLogout && (
            <Link href="/templates" className="text-gray-800 hover:text-gray-300">
              Templates
            </Link>
          )}
          {showLogout ? (
            <button onClick={handleLogout} className="text-white hover:text-gray-300 bg-red-500 hover:bg-red-700 py-2 px-4 rounded">
              Logout
            </button>
          ) : (
            <Link href="/account" className="text-white hover:text-white-300 bg-red-500 hover:bg-red-700 py-2 px-4 rounded">
              Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
