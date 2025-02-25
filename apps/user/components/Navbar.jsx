import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

const Navbar = () => {
  return (
    <header className="w-full border-b">
      {/* Top Banner */}
      <div className="bg-black text-white text-center text-sm py-2">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
        <span className="font-bold cursor-pointer">ShopNow</span>
      </div>
      
      {/* Navbar */}
      <nav className="flex justify-between items-center py-4 px-8 bg-white shadow-md">
        {/* Logo */}
        <div className="text-2xl font-bold">KHARID LO</div>
        
        {/* Navigation Links */}
        <ul className="flex space-x-6 text-lg">
          <li className="cursor-pointer font-medium text-black border-b-2 border-black">Home</li>
          <li className="cursor-pointer text-gray-600 hover:text-black">Contact</li>
          <li className="cursor-pointer text-gray-600 hover:text-black">About</li>
          <li className="cursor-pointer text-gray-600 hover:text-black">Sign Up</li>
        </ul>
        
        {/* Search and Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="border px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-gray-300"
            />
            <FiSearch className="absolute right-3 top-3 text-gray-500 cursor-pointer" />
          </div>
          <FiHeart className="text-2xl cursor-pointer hover:text-gray-700" />
          <div className="relative">
            <FiShoppingCart className="text-2xl cursor-pointer hover:text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">2</span>
          </div>
          <FiUser className="text-2xl cursor-pointer hover:text-gray-700" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
