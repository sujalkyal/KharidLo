"use client"
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import ProductCard from "../../../components/ProductCard"; // Ensure correct import
import axios from "axios";

const Wishlist = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
      const fetchWishlist = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/user/wishlist/getAllItems`);
          setItems(response.data); // Assuming the API response contains the wishlist items
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };
      fetchWishlist();
    }, []);// Run the effect only once, when the component mounts
  return (
    <div className="p-8">
      {/* Wishlist Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Wishlist</h2>
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Move All To Bag
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-6">
          {items.length > 0 ? (
            items.map((product) => (
              <div key={product.id} className="relative">
                {/* Product Card */}
                <ProductCard product={product} />
                
                {/* Remove Button */}
                <button
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                >
                  <Trash2 className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your wishlist is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
