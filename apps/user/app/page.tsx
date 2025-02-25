"use client"
import { useState } from "react";
import Image from "next/image";
import Carousel from "../components/imageCarousel";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useEffect } from "react";

const slides = [
  {
    image: "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    title: "iPhone 14 Series",
    subtitle: "Up to 10% off Voucher",
    buttonText: "Shop Now",
  },
  {
    image: "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    title: "iPhone 13 Series",
    subtitle: "Special Discount Available",
    buttonText: "Explore",
  },
  {
    image: "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    title: "Apple Accessories",
    subtitle: "Save Big on Bundles",
    buttonText: "Discover",
  },
];

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
  const [bestSellingProducts, setBestSellingProducts] = useState<{ id: string; name: string; price: number; image: string[] }[]>([]);


  useEffect(() => {
    axios.get("http://localhost:3000/api/product/getBestSelling")
      .then(response => {
        setBestSellingProducts(response.data.products);
      })
      .catch(error => {
        console.error("Error fetching best selling products:", error);
      });
  }, []);


  return (
    <>
    <div className="flex w-full px-2 py-8 space-x-4">
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
      <div className=" w-full px-6 "><Carousel/></div>
    </div>

    <section className="w-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Best Selling Products</h2>
        <button className="bg-red-500 text-white px-8 py-2 rounded">View All</button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {bestSellingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>

    </>
  );
}


