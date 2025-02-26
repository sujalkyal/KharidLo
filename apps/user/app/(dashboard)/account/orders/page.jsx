"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/getAllOrders"); // Fetch orders
        setOrders(response.data);
      } catch (error) {
        toast.error("Failed to load orders");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <main className="flex flex-grow justify-center py-10 bg-gray-100">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <div className="flex">
            <div className="w-1/4 border-r pr-4">
              <nav className="space-y-3">
                <Link href="/account">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">My Profile</button>
                </Link>
                <Link href="/account/orders">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-red-500 text-white">My Orders</button>
                </Link>
                <Link href="/wishlist">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">My Wishlist</button>
                </Link>
              </nav>
            </div>
            <div className="w-3/4 pl-6">
              <h3 className="text-lg font-semibold text-red-500 mb-4">Your Orders</h3>

              {orders.length === 0 ? (
                <p className="text-gray-500">You have no orders yet.</p>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-gray-50 border p-4 rounded-lg">
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Date:</strong> {order.createdAt}</p>
                      <p><strong>Address:</strong> {order.address}, {order.phone}</p>
                      <p><strong>Total Amount:</strong> ₹{order.amount}</p>
                      <p><strong>Status:</strong> <span className="text-red-500 font-semibold">{order.status}</span></p>
                      <h4 className="text-md font-semibold mt-4">Items:</h4>
                      <ul className="list-disc list-inside text-gray-600">
                      {order.products.map((product, index) => (
                        <li key={index}>
                        <strong>Product ID:</strong> {product.productId} | <strong>Qty:</strong> {product.quantity}
                        </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
