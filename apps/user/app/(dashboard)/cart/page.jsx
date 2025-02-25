"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "../../../components/CartItem";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 0; // Free shipping

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/user/getCartDetails");
        setCart(response.data.result);  // ✅ Correctly extracting cart items
        setSubtotal(response.data.totalAmount);  // ✅ Using API totalAmount
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCart();
  }, [cart]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/deleteitemcart/${productId}`);
      setCart(cart.filter((item) => item.product.id !== productId)); // ✅ Fixing remove filter
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="grid gap-4">
        {cart.length > 0 ? (
          cart.map(({ product, quantity }) => (
            <CartItem key={product.id} product={product} quantity={quantity} onRemove={handleRemove} />
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 p-6 border rounded-lg shadow-md w-96">
        <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
        <p className="flex justify-between"><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></p>
        <p className="flex justify-between"><span>Shipping:</span> <span>{shippingCost === 0 ? "Free" : `$${shippingCost}`}</span></p>
        <hr className="my-3" />
        <p className="flex justify-between font-bold text-lg"><span>Total:</span> <span>${(subtotal + shippingCost).toFixed(2)}</span></p>
        <button className="w-full mt-4 bg-red-500 text-white py-2 rounded-md">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
