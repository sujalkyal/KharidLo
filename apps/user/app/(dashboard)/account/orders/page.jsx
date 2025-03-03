"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user/getAllOrders");
        setOrders(response.data);
      } catch (error) {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };
    fetchOrders();
  }, []);

  const generateInvoice = (order) => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("KHARID LO", 105, 20, null, null, "center");
      doc.setFontSize(14);
      doc.text("Luxury Shoes & Watches", 105, 30, null, null, "center");
      doc.text("www.kharidlo.com", 105, 40, null, null, "center");
      doc.line(10, 50, 200, 50);

      doc.setFont("helvetica", "normal");
      doc.text(`Invoice No: ${order.id}`, 10, 60);
      doc.text(`Date: ${order.createdAt}`, 10, 70);

      doc.text("Bill To:", 10, 85);
      doc.text(`${order.name || "N/A"}`, 10, 95);
      doc.text(`${order.address || "N/A"}`, 10, 105);
      doc.text(`${order.phone || "N/A"}`, 10, 115);

      const tableColumn = ["Product", "Qty", "Price", "Total"];
      const tableRows = order.products?.map((product) => [
        product.productId || "N/A",
        product.quantity || 0,
        `₹${product.price || 0}`,
        `₹${(product.price || 0) * (product.quantity || 0)}`,
      ]) || [];

      autoTable(doc, {
        startY: 130,
        head: [tableColumn],
        body: tableRows,
        styles: { halign: "center" },
      });

      const finalY = doc.lastAutoTable.finalY || 150;
      doc.text(`Total Amount: ₹${order.amount || 0}`, 10, finalY + 10);
      doc.text("Thank you for shopping with us!", 10, finalY + 20);
      doc.save(`Invoice_Order_${order.id}.pdf`);
    } catch (error) {
      toast.error("Failed to generate invoice");
    }
  };

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
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                    My Profile
                  </button>
                </Link>
                <Link href="/account/orders">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-red-500 text-white hover:cursor-pointer">
                    My Orders
                  </button>
                </Link>
                <Link href="/wishlist">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 hover:cursor-pointer">
                    My Wishlist
                  </button>
                </Link>
              </nav>
            </div>
            <div className="w-3/4 pl-6">
              <h3 className="text-lg font-semibold text-red-500 mb-4">Your Orders</h3>

              {loading ? (
                <p className="text-gray-500">Loading orders...</p> // Show loading indicator
              ) : orders.length === 0 ? (
                <p className="text-gray-500">You have no orders yet.</p>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-gray-50 border p-4 rounded-lg">
                      <p><strong>Order ID:</strong> {order.id}</p>
                      <p><strong>Date:</strong> {order.createdAt}</p>
                      <p><strong>Address:</strong> {order.address}, {order.phone}</p>
                      <p><strong>Total Amount:</strong> ₹{order.amount}</p>
                      <p>
                        <strong>Status:</strong>
                        <span className={`font-semibold ${order.status === "pending" ? "text-red-500" : "text-green-500"}`}>
                          {order.status}
                        </span>
                      </p>                      
                      <h4 className="text-md font-semibold mt-4">Items:</h4>
                      <ul className="list-disc list-inside text-gray-600">
                        {order.products?.map((product, index) => (
                          <li key={index}>
                            <strong>Product ID:</strong> {product.productId} | <strong>Qty:</strong> {product.quantity}
                          </li>
                        ))}
                      </ul>
                      {order.status === "completed" && (
                        <button
                          onClick={() => generateInvoice(order)}
                          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer block"
                        >
                          Download Invoice
                        </button>
                      )}
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
