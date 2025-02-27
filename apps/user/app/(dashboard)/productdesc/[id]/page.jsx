"use client";
import { useParams } from "next/navigation";
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
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (id) {
      axios.get(`/api/product/${encodeURIComponent(id)}`)
        .then((res) => setProduct(res.data))
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

  if (!product) return <p className="text-center text-gray-500 text-lg">Loading...</p>;

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

  return (
    <div className="container mx-auto p-6 md:p-12 max-w-6xl">
      <div className="flex flex-col md:flex-row bg-white p-8 shadow-lg rounded-2xl">
        <div className="w-full md:w-1/2">
          <Swiper navigation pagination={{ clickable: true }} modules={[Navigation, Pagination]}>  
            {product.image.map((img, index) => (
              <SwiperSlide key={index}>
                <Image src={img} alt={product.name} width={600} height={600} className="rounded-xl" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex space-x-4 mt-4">
            {product.image.map((img, index) => (
              <Image key={index} src={img} alt={product.name} width={80} height={80} className="rounded-lg cursor-pointer" />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between px-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-yellow-500">★★★★☆</span>
              <span className="text-gray-600">(150 Reviews)</span>
              <span className="text-green-600 ml-4">In Stock</span>
            </div>
            <p className="text-2xl text-gray-800 mt-3">${product.price}</p>
            <p className="mt-4 text-gray-600 text-lg leading-relaxed">{product.description}</p>
          </div>
          <div className="mt-6">
            <button className="w-full px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-xl shadow-md hover:bg-red-600 transition-all">
              Add to Cart
            </button>
            <button onClick={toggleWishlist} className="w-full mt-4 p-3 border rounded-xl flex justify-center items-center space-x-2 hover:shadow-lg transition-all">
              <FaHeart className={`text-2xl ${isWishlisted ? "text-red-500" : "text-gray-400"}`} />
            </button>
          </div>
          <div className="mt-6 border-t pt-4">
            <div className="flex items-center space-x-4">
              <FaTruck className="text-xl text-gray-700" />
              <p className="text-gray-700">Free Delivery - Enter your postal code for delivery availability</p>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <FaUndo className="text-xl text-gray-700" />
              <p className="text-gray-700">Free 30 Days Delivery Returns. Details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}