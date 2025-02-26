"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../../../components/ProductCard";

export default function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/product/getAllProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    axios
      .get("/api/user/wishlist/getAllItems")
      .then(({ data }) => setWishlist(data.map(item => item.id) || []))
      .catch((error) => console.error("Error fetching wishlist:", error));
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">All Products</h2>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} wishlist={wishlist} setWishlist={setWishlist} />
          ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
}
