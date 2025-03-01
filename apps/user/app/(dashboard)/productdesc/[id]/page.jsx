



"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaHeart, FaTruck, FaUndo } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [inCart, setInCart] = useState(false); // Track if the item is in the cart
  const [loading, setLoading] = useState(false);
  const reviews = product?.reviews || [];
  const reviewCount = reviews.length;
  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / reviews.length : 0;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!id || !isHydrated) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/product/${encodeURIComponent(id)}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const checkCart = async () => {
      try {
        const response = await axios.get("/api/user/getCartDetails");
        const cartItems = response.data.result || [];
        setInCart(cartItems.some((item) => item.product.id === id));
      } catch (error) {
        console.error("Error checking cart:", error);
      }
    };

    const fetchWishlist = async () => {
      try {
        const response = await axios.get("/api/user/wishlist/getAllItems");
        const wishlistItems = response.data || [];
        setWishlist(wishlistItems.map((item) => item.id)); // Store only product IDs
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchProduct();
    checkCart();
    fetchWishlist(); // Fetch wishlist data on initial load
  }, [id, isHydrated]);

  if (!isHydrated || !product) return <p className="text-center text-gray-500 text-lg">Loading...</p>;

  const isWishlisted = wishlist.includes(product.id);

  const toggleWishlist = async () => {
    try {
      const endpoint = isWishlisted
        ? "/api/user/wishlist/removeItem"
        : "/api/user/wishlist/addItem";
      await axios.post(endpoint, { productId: product.id });
      setWishlist((prev) =>
        isWishlisted ? prev.filter((pid) => pid !== product.id) : [...prev, product.id]
      );
    } catch (error) {
      console.error("Wishlist update error:", error);
    }
  };

  const handleAddToCart = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await axios.post("/api/user/addToCart", { productId: product.id, choice: true });
      setInCart(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 md:p-12 max-w-7xl">
      <div className="flex flex-col md:flex-row bg-white p-10 shadow-xl rounded-3xl">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <Swiper navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]} className="w-full rounded-xl shadow-lg">
            {product.image.map((img, index) => (
              <SwiperSlide key={index}>
                <Image src={img} alt={product.name} width={600} height={600} className="rounded-xl object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex space-x-2 mt-4">
            {product.image.map((img, index) => (
              <Image key={index} src={img} alt={product.name} width={80} height={80} className="rounded-lg cursor-pointer border-2 border-gray-300 hover:border-black transition-all" />
            ))}
          </div>
        </div>
        {/* Product Info Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-between px-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 text-lg text-gray-600">
              <span className="text-yellow-500 text-2xl">
              {"★".repeat(Math.round(averageRating))}{"☆".repeat(5 - Math.round(averageRating))}
              </span>
              <span>{reviewCount}</span>
              <span className="text-green-600 ml-4">In Stock</span>
            </div>
            <p className="text-3xl font-semibold text-gray-800 mt-4">${product.price}</p>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">{product.description}</p>
          </div>
          {/* Buttons */}
          <div className="mt-8 space-y-4">
            <button
              className={`w-full px-6 py-4 text-white text-xl font-bold rounded-xl shadow-md transition-all hover:cursor-pointer ${
                inCart ? "bg-black hover:bg-gray-800" : "bg-red-500 hover:bg-red-600"
              }`}
              onClick={() => (inCart ? router.push("/cart") : handleAddToCart())}
              disabled={loading}
            >
              {loading ? "Processing..." : inCart ? "Move to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={toggleWishlist}
              className="w-full p-4 border rounded-xl flex justify-center items-center space-x-3 hover:shadow-lg transition-all"
            >
              <FaHeart className={`text-3xl ${isWishlisted ? "text-red-500" : "text-gray-400"}`} />
              <span className="text-lg font-medium">{isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}</span>
            </button>
          </div>
          {/* Delivery Info */}
          <div className="mt-8 border-t pt-4 space-y-3">
            <div className="flex items-center space-x-4">
              <FaTruck className="text-2xl text-gray-700" />
              <p className="text-gray-700 text-lg">Free Delivery - Enter your postal code for availability</p>
            </div>
            <div className="flex items-center space-x-4">
              <FaUndo className="text-2xl text-gray-700" />
              <p className="text-gray-700 text-lg">Free 30 Days Returns. Details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
