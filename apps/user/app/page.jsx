"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Carousel from "../components/imageCarousel";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import CategorySection from "../components/CategorySection";

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
      .then((response) => {
        setBestSellingProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching best selling products:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/getAllProducts")
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching all products:", error);
      });
  }, []);

  //get 5 newly added products from the database
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/getNewlyAddedProducts")
      .then((response) => {
        setNewlyAddedProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching newly added products:", error);
      });
  }, []);

  useEffect(() => {
    axios.get("/api/user/wishlist/getAllItems")
      .then(({ data }) => setWishlist(data.map(item => item.id) || []))
      .catch(error => console.error("Error fetching wishlist:", error));
  }, []);


  if (status === "loading") return null; // Avoid rendering while checking auth

  return (
    <>
      <div className="flex w-full px-10 py-8 space-x-4">
        {/* Category Sidebar */}
        <aside className="w-1/5 p-4">
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index} className="text-gray-700 cursor-pointer hover:text-black">
                {category}
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex items-center border-r border-gray-400"></div>
        {/* Product Listing */}
        <div className="w-full px-6">
          <Carousel />
        </div>
      </div>

      <hr className="border-gray-300 my-4 w-[90%] mx-auto" />

      <div className="px-10 py-6">

      <section className="w-full p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Best Selling Products</h2>
          <button className="bg-red-500 text-white px-8 py-2 rounded">View All</button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {bestSellingProducts.map((product) => (
            <ProductCard key={product.id} product={product} wishlist={wishlist} setWishlist={setWishlist} />
          ))}
        </div>
      </section>


      <hr className="border-gray-300 my-4 w-[90%] mx-auto" />

      <section className="w-full p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">All Products</h2>
          <button className="bg-red-500 text-white px-8 py-2 rounded">View All</button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} wishlist={wishlist} setWishlist={setWishlist} />
          ))}
        </div>
      </section>

      <hr className="border-gray-300 my-6 w-[90%] mx-auto" />

      <CategorySection />

      <hr className="border-gray-300 my-6 w-[90%] mx-auto" />

      <section className="w-full p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Newly Added Products</h2>
          <button className="bg-red-500 text-white px-8 py-2 rounded">View All</button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {newlyAddedProducts.map((product) => (
            <ProductCard key={product.id} product={product} wishlist={wishlist} setWishlist={setWishlist} />
          ))}
        </div>
      </section>

      </div>
    </>
  );
}
