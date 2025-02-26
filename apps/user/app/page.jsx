"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Carousel from "../components/imageCarousel";
import ProductCard from "../components/ProductCard";
import CategorySection from "../components/CategorySection";
import FeatureCard from "../components/FeatureCard";

const categories = [
  "Electronics",
  "Fashion",
  "Home & Lifestyle",
  "Sports & Outdoor",
  "Baby's & Toys",
  "Groceries & Pets",
  "Health & Beauty",
];

export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [wishlist, setWishlist] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [newlyAddedProducts, setNewlyAddedProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/getBestSelling")
      .then(({ data }) => setBestSellingProducts(data.products))
      .catch((error) => console.error("Error fetching best selling products:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/getAllProducts")
      .then(({ data }) => setAllProducts(data))
      .catch((error) => console.error("Error fetching all products:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/getNewlyAddedProducts")
      .then(({ data }) => setNewlyAddedProducts(data))
      .catch((error) => console.error("Error fetching newly added products:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user/wishlist/getAllItems")
      .then(({ data }) => setWishlist(data.map((item) => item.id) || []))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, []);

  if (status === "loading") return null; // Avoid rendering while checking auth

  return (
    <>
      {/* Hero Section with Sidebar & Carousel */}
      <div className="flex w-full px-10 py-8 space-x-6">
        {/* Category Sidebar */}
        <aside className="w-1/5 p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Categories</h3>
          <ul className="space-y-3">
            {categories.map((category, index) => (
              <li key={index} className="text-gray-700 cursor-pointer hover:text-black transition">
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Vertical Divider */}
        <div className="w-[1px] bg-gray-300"></div>

        {/* Carousel Section */}
        <div className="flex-grow">
          <Carousel />
        </div>
      </div>

      {/* Section Divider */}
      <hr className="border-gray-300 my-6 w-[90%] mx-auto" />

      <div className="px-10 py-6 space-y-10">
        {/* Best Selling Products */}
        <section className="w-full bg-white p-6 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Best Selling Products</h2>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {bestSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} wishlist={wishlist} setWishlist={setWishlist} />
            ))}
          </div>
        </section>

        {/* Section Divider */}
        <hr className="border-gray-300 w-[90%] mx-auto" />

        {/* All Products */}
        <section className="w-full bg-white p-6 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">All Products</h2>
            <button
              onClick={() => router.push("/allProducts")}
              className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} wishlist={wishlist} setWishlist={setWishlist} />
            ))}
          </div>
        </section>

        {/* Section Divider */}
        <hr className="border-gray-300 w-[90%] mx-auto" />

        {/* Categories Section */}
        <CategorySection />

        {/* Section Divider */}
        <hr className="border-gray-300 w-[90%] mx-auto" />

        {/* Newly Added Products */}
        <section className="w-full bg-white p-6 shadow-md rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Newly Added Products</h2>
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {newlyAddedProducts.map((product) => (
              <ProductCard key={product.id} product={product} wishlist={wishlist} setWishlist={setWishlist} />
            ))}
          </div>
        </section>

        {/* Feature Card Section */}
        <FeatureCard />
      </div>
    </>
  );
}
