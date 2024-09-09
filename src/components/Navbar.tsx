"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b-2 shadow-sm">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-xl font-bold">
          <Link href="/" className="flex items-center space-x-2">
            <span>📄</span>
            <span className="text-gray-700">Resume Builder</span>
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link
            href="/templates"
            className={`${
              pathname === '/templates'
                ? 'text-red-500'
                : 'text-gray-700'
            } hover:text-red-500`}
          >
            Templates
          </Link>
          <Link
            href="/account"
            className={`${
              pathname === '/account'
                ? 'text-red-500'
                : 'text-gray-700'
            } hover:text-red-500`}
          >
            <span className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Account
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
