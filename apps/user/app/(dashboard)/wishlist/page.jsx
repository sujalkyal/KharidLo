"use client";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import ProductCard from "../../../components/ProductCard";
import axios from "axios";
import { useRecoilState } from "recoil";
import { wishlistAtom } from "../../../atoms/wishlistAtom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useRecoilState(wishlistAtom); // Use Recoil for state management
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/wishlist/getAllItems");
        setWishlist(response.data); // Store entire product object
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [setWishlist]);

  const handleMoveAllToBag = async () => {
    if (loading || wishlist.length === 0) return;
    setLoading(true);

    try {
      await Promise.all(
        wishlist.map(async (product) => {
          await axios.post("http://localhost:3000/api/user/addToCart", { productId: product.id, choice: true });
        })
      );

      await axios.delete("http://localhost:3000/api/user/wishlist/clearAll");
      setWishlist([]); // Update Recoil state
    } catch (error) {
      console.error("Error moving wishlist items to cart:", error);
    }

    setLoading(false);
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.post("http://localhost:3000/api/user/wishlist/removeItem", { productId });
      setWishlist((prev) => prev.filter((product) => product.id !== productId)); // Update Recoil state
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Wishlist</h2>
          <button
            onClick={handleMoveAllToBag}
            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            disabled={loading || wishlist.length === 0}
          >
            {loading ? "Moving..." : "Move All To Bag"}
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {wishlist.length > 0 ? (
            wishlist.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <button
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                  onClick={() => handleRemoveFromWishlist(product.id)}
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
