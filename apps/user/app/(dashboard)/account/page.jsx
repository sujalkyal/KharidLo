"use client"

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (field) => (e) => {
    setUserDetails((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const saveFunction = async () => {
    const { currentPassword, newPassword, confirmPassword, ...otherDetails } = userDetails;

    if (newPassword && newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password do not match");
      return;
    }

    try {
      const authResponse = await axios.post("http://localhost:3000/api/user/checkPassword", { currentPassword });
      if (!authResponse.data.valid) {
        toast.error("Incorrect current password");
        return;
      }

      const updatedDetails = newPassword ? { ...otherDetails, newPassword } : otherDetails;
      const response = await axios.post("http://localhost:3000/api/user/updateDetails", updatedDetails);
      
      if (response.data.success) {
        toast.success("Changes Saved");
      } else {
        toast.error("Error Saving Changes");
      }
    } catch (error) {
      toast.error("Failed to save changes");
    }
  };

  const cancelFunction = () => {
    setUserDetails({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    toast.success("Form cleared");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-grow justify-center py-10 bg-gray-100">
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Manage My Account</h2>
          <div className="flex">
            <div className="w-1/4 border-r pr-4">
              <nav className="space-y-3">
                <Link href="/account/profile">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-red-500 text-white">My Profile</button>
                </Link>
                <Link href="/account/orders">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">My Orders</button>
                </Link>
                <Link href="/wishlist">
                  <button className="w-full text-left px-3 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">My Wishlist</button>
                </Link>
              </nav>
            </div>
            <div className="w-3/4 pl-6">
              <h3 className="text-lg font-semibold text-red-500 mb-4">Edit Your Profile</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" className="w-full p-2 border rounded" placeholder="First Name" value={userDetails.firstName} onChange={handleInputChange("firstName")} />
                  <input type="text" className="w-full p-2 border rounded" placeholder="Last Name" value={userDetails.lastName} onChange={handleInputChange("lastName")} />
                </div>
                <input type="email" className="w-full p-2 border rounded" placeholder="example@gmail.com" value={userDetails.email} onChange={handleInputChange("email")} />
                <input type="text" className="w-full p-2 border rounded" placeholder="Address" value={userDetails.address} onChange={handleInputChange("address")} />
                <h4 className="text-md font-semibold mt-6">Password Changes</h4>
                <input type="password" className="w-full p-2 border rounded" placeholder="Current Password" value={userDetails.currentPassword} onChange={handleInputChange("currentPassword")} />
                <input type="password" className="w-full p-2 border rounded" placeholder="New Password" value={userDetails.newPassword} onChange={handleInputChange("newPassword")} />
                <input type="password" className="w-full p-2 border rounded" placeholder="Confirm New Password" value={userDetails.confirmPassword} onChange={handleInputChange("confirmPassword")} />
                <div className="flex justify-between mt-4">
                  <button type="button" className="text-gray-600" onClick={cancelFunction}>Cancel</button>
                  <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={saveFunction}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
