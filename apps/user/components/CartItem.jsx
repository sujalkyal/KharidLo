import { X } from "lucide-react";
import { useState } from "react";

const CartItem = ({ product, onRemove }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
      {/* Product Image & Name */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded"
          />
          <button
            onClick={() => onRemove(product.id)}
            className="absolute top-0 left-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            <X size={14} />
          </button>
        </div>
        <span className="text-gray-700">{product.name}</span>
      </div>

      {/* Product Price */}
      <span className="text-gray-700">${product.price}</span>

      {/* Quantity Selector */}
      <select
        value={quantity}
        onChange={handleQuantityChange}
        className="border border-gray-300 rounded-lg px-3 py-1"
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num.toString().padStart(2, "0")}
          </option>
        ))}
      </select>

      {/* Total Price */}
      <span className="text-gray-700">${(product.price * quantity).toFixed(2)}</span>
    </div>
  );
};

export default CartItem;
