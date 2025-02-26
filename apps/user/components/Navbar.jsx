"use client";

import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState, router } from "react";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname(); // Get current route
  const router = useRouter()
  const { data: session, status } = useSession();
  

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]); // Dependency on `status`

  const handleLogOut = async () => {
    await signOut();
    router.push("/api/auth/signin");
  }

  useEffect(() => {
    setHasMounted(true);

    async function fetchCartDetails() {
      try {
        const response = await axios.get("/api/user/getCartDetails");
        if (response.status === 200 && response.data.result) {
          const cartItems = response.data.result;
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

    async function fetchWishlistDetails() {
      try {
        const response = await axios.get("/api/user/wishlist/getAllItems");
        if (response.status === 200 && Array.isArray(response.data)) {
          setWishlistCount(response.data.length);
        } else {
          setWishlistCount(0);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist details:", error);
        setWishlistCount(0);
      }
    }

    fetchCartDetails();
    fetchWishlistDetails();
  }, []);

  return (
    <header className="w-full border-b">
      <nav className="flex justify-between items-center py-6 px-8 bg-white shadow-md">
        <Link href="/">
          <div className="text-2xl font-bold cursor-pointer">KHARID LO</div>
        </Link>

        <ul className="flex space-x-6 text-lg">
          <li>
            <Link
              href="/"
              className={`cursor-pointer font-medium ${
                pathname === "/" ? "border-b-2 border-black" : "text-gray-600 hover:text-black"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={`cursor-pointer ${
                pathname === "/contact" ? "border-b-2 border-black" : "text-gray-600 hover:text-black"
              }`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`cursor-pointer ${
                pathname === "/about" ? "border-b-2 border-black" : "text-gray-600 hover:text-black"
              }`}
            >
              About
            </Link>
          </li>
          <li>
            {session ? (
              <button onClick={() => handleLogOut()} className="text-gray-600 hover:text-black">
                Log Out
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                className={`cursor-pointer ${
                  pathname === "/signup" ? "border-b-2 border-black" : "text-gray-600 hover:text-black"
                }`}
              >
                Sign Up
              </Link>
            )}
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FiSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
          </div>

          <Link href="/wishlist">
            <div className="relative">
              <FiHeart className="text-2xl cursor-pointer hover:text-gray-700" />
              {hasMounted && wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>
          </Link>

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

          <Link href="/account">
            <FiUser className="text-2xl cursor-pointer hover:text-gray-700" />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
