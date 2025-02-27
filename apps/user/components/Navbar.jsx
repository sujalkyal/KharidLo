"use client";

import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { signOut, useSession, getSession } from "next-auth/react";
import { toast } from "react-toastify";


const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/searched?query=${encodeURIComponent(search)}`);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const handleLogOut = async () => {
    await signOut();
    router.push("/api/auth/signin");
  };

  useEffect(() => {
    setHasMounted(true);

    if (!session) return;

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
  }, [session]);


  const handleHomeClick = async () => {
    const userSession = await getSession();
    if (!userSession) {
      toast.error("Please log in to access Home", { position: "top-center" });
    } else {
      router.push("/");
    }
  };

  const handleWishlistClick = async () => {
    const userSession = await getSession();
    if (!userSession) {
      toast.error("Please log in to access Wishlist", { position: "top-center" });
    } else {
      router.push("/wishlist");
    }
  }

  const handleCartClick = async () => {
    const userSession = await getSession();
    if (!userSession) {
      toast.error("Please log in to access Cart", { position: "top-center" });
    } else {
      router.push("/cart");
    }
  }

  const handleAccountClick = async () => {
    const userSession = await getSession();
    if (!userSession) {
      toast.error("Please log in to access Account", { position: "top-center" });
    } else {
      router.push("/account");
    }
  }


  return (
    <header className="w-full border-b">
      <nav className="flex justify-between items-center py-6 px-8 bg-white shadow-md">
        <Link href="/">
          <div className="text-2xl font-bold cursor-pointer">KHARID LO</div>
        </Link>

        <ul className="flex space-x-6 text-lg">
          <li>
            <button onClick={handleHomeClick} className="cursor-pointer font-medium text-gray-600 hover:text-black">
              Home
            </button>
          </li>
          <li>
            <Link
              href="/contact"
              className={`cursor-pointer ${pathname === "/contact" ? "border-b-2 border-black" : "text-gray-600 hover:text-black"
                }`}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`cursor-pointer ${pathname === "/about" ? "border-b-2 border-black" : "text-gray-600 hover:text-black"
                }`}
            >
              About
            </Link>
          </li>
          <li>
            {session ? (
              <button onClick={handleLogOut} className="text-gray-600 hover:text-black">
                Log Out
              </button>
            ) : (
              <Link
                href="/api/auth/signin"
                className="text-gray-600 hover:text-black"
              >
                Sign Up
              </Link>
            )}
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-gray-300"
              />
              <button type="submit">
                <FiSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
              </button>
            </form>
          </div>

          <button onClick={handleWishlistClick}>
            <div className="relative">
              <FiHeart className="text-2xl cursor-pointer hover:text-gray-700" />
              {hasMounted && wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>
          </button>

          <button onClick={handleCartClick}>
            <div className="relative">
              <FiShoppingCart className="text-2xl cursor-pointer hover:text-gray-700" />
              {hasMounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </button>

          <button onClick={handleAccountClick}>
            <FiUser className="text-2xl cursor-pointer hover:text-gray-700" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
