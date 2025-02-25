import { useState } from "react";
import { Heart, Eye } from "lucide-react";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  // Ensure product exists before accessing properties
  if (!product) return null;

  // Get first image from array or fallback
  const productImage = product?.image?.length > 0 ? product.image[0] : "/placeholder.png";

  // Calculate average rating safely
  const reviews = product?.reviews || []; // Ensure reviews is always an array
  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + (review.rating || 0), 0) / reviews.length
    : 0;

  return (
    <div className="p-4 w-72 bg-white rounded-xl shadow-md">
      {/* Product Image */}
      <div
        className="relative w-full overflow-hidden rounded-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={productImage}
          alt={product?.name || "Product"}
          className="w-full h-64 object-cover"
        />

        {/* Add to Cart Button (Appears on Hover) */}
        {hovered && (
          <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-md">
            Add to Cart
          </button>
        )}

        {/* Wishlist & View Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button className="p-2 bg-white rounded-full shadow-md">
            <Heart className="w-5 h-5 text-red-500" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md">
            <Eye className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Product Name */}
      <h3 className="mt-4 text-lg font-semibold">{product?.name || "Unnamed Product"}</h3>

      {/* Price Section */}
      <div className="flex items-center gap-2 mt-1">
        <span className="text-red-500 text-lg font-bold">${product?.price || 0}</span>
        <span className="text-gray-400 line-through">${(product?.price || 0) + 100}</span>
      </div>

      {/* Rating Section */}
      <div className="flex items-center gap-1 mt-1">
        <span className="text-yellow-500 text-lg">
          {"★".repeat(Math.round(averageRating))}
          {"☆".repeat(5 - Math.round(averageRating))}
        </span>
        <span className="text-gray-600">({reviews.length})</span>
      </div>

      {/* Stock Availability */}
      <p className={`mt-2 text-sm ${product?.stock > 0 ? "text-green-600" : "text-red-500"}`}>
        {product?.stock > 0 ? `In stock: ${product.stock}` : "Out of stock"}
      </p>
    </div>
  );
};

export default ProductCard;
