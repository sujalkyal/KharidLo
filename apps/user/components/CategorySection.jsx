"use client";
import { useState } from "react";
import { FiMonitor, FiShoppingBag, FiHome, FiActivity, FiHeart } from "react-icons/fi";

const categories = [
  { name: "Electronics", icon: <FiMonitor /> },
  { name: "Fashion", icon: <FiShoppingBag /> },
  { name: "Home & Lifestyle", icon: <FiHome /> },
  { name: "Sports & Outdoor", icon: <FiActivity /> },
  { name: "Health & Beauty", icon: <FiHeart /> },
];

const CategoryCard = ({ text, icon, selected, onClick }) => (
  <div
    className={`flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer transition ${
      selected ? "bg-red-500 text-white" : "bg-white text-black"
    }`}
    onClick={onClick}
  >
    <div className="text-3xl">{icon}</div>
    <p className="font-medium mt-2">{text}</p>
  </div>
);

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Electronics");

  return (
    <section className="w-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-red-500 font-medium">Categories</p>
          <h2 className="text-3xl font-bold">Browse By Category</h2>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {categories.map(({ name, icon }) => (
          <CategoryCard
            key={name}
            text={name}
            icon={icon}
            selected={selectedCategory === name}
            onClick={() => setSelectedCategory(name)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
