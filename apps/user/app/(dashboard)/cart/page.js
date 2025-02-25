"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import CartItem from "../components/CartItem";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 0; // Free shipping

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/user/cart/getAllItems");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    // Calculate subtotal when cart changes
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setSubtotal(total);
  }, [cart]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`/api/user/cart/removeItem/${productId}`);
      setCart(cart.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="grid gap-4">
        {cart.length > 0 ? (
          cart.map((product) => (
            <CartItem key={product.id} product={product} onRemove={handleRemove} />
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
