"use client";

import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true so client-only parts are rendered
    setHasMounted(true);

    async function fetchCartDetails() {
      try {
        const response = await axios.get("http://localhost:3000/api/user/getCartDetails");
        if (response.status === 200 && response.data.result) {
          const cartItems = response.data.result;
          // Sum the quantity of all items in the cart
          const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
          setCartCount(count);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch cart details:", error);
        setCartCount(0);
      }
    }

    fetchCartDetails();
  }, []);

  return (
    <header className="w-full border-b">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
        {/* Logo */}
        <Link href="/">
          <div className="text-2xl font-bold cursor-pointer">KHARID LO</div>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link
              href="/"
              className="cursor-pointer font-medium text-black border-b-2 border-black"
            >
              Home
            </Link>
          </li>
          <li>
            <Link href="/contact" className="cursor-pointer text-gray-600 hover:text-black">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/about" className="cursor-pointer text-gray-600 hover:text-black">
              About
            </Link>
          </li>
          <li>
            <Link href="/signup" className="cursor-pointer text-gray-600 hover:text-black">
              Sign Up
            </Link>
          </li>
        </ul>

        {/* Search and Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FiSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
          </div>

          {/* Wishlist Icon */}
          <Link href="/wishlist">
            <FiHeart className="text-2xl cursor-pointer hover:text-gray-700" />
          </Link>

          {/* Cart Icon */}
          <Link href="/cart">
            <div className="relative">
              <FiShoppingCart className="text-2xl cursor-pointer hover:text-gray-700" />
              {hasMounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </Link>

          {/* Account Icon */}
          <Link href="/account">
            <FiUser className="text-2xl cursor-pointer hover:text-gray-700" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
