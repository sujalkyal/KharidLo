"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-black text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Centered Navigation Links */}
        <div className="flex-1 flex justify-center space-x-8">
          <Link href="/admin/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/admin/products" className="hover:text-gray-300">
            Products
          </Link>
          <Link href="/admin/customers" className="hover:text-gray-300">
            Customers
          </Link>
          <Link href="/admin/sales" className="hover:text-gray-300">
            Sales
          </Link>
        </div>

        {/* Logout or Sign In Button on the Right */}
        <div>
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
