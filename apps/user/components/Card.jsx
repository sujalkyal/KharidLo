import { useState } from "react";
import { Heart, Eye } from "lucide-react";

const ProductCard = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="p-4 w-72 bg-white rounded-xl shadow-md">
      <div
        className="relative w-full overflow-hidden rounded-lg"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src="/pink-winter-coat.jpeg"
          alt="The north coat"
          className="w-full h-64 object-cover"
        />
        {hovered && (
          <button className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md shadow-md">
            Add to Cart
          </button>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button className="p-2 bg-white rounded-full shadow-md">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-semibold">The north coat</h3>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-red-500 text-lg font-bold">$260</span>
        <span className="text-gray-400 line-through">$360</span>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-yellow-500 text-lg">★★★★★</span>
        <span className="text-gray-600">(65)</span>
      </div>
    </div>
  );
};

export default ProductCard;
