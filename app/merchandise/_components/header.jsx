"use client";
import React, { useState } from "react";
import {
  Search,
  User,
  ShoppingCart,
  Heart,
  RotateCcw,
  Globe,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer, Badge } from "antd";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);

  const categoriesWithSubcategories = {
    Categories: {
      Women: ["Dresses", "Tops", "Bottoms", "Outerwear", "Activewear"],
      Men: ["Shirts", "Pants", "Jackets", "Suits", "Activewear"],
      Kids: ["Girls", "Boys", "Baby", "Shoes", "Accessories"],
      Home: ["Bedding", "Decor", "Kitchen", "Bath", "Storage"],
    },
    "New In": {
      "Trending Now": [
        "Summer Collection",
        "Festival Fashion",
        "Vacation Edit",
        "Workwear",
      ],
      "New Arrivals": ["This Week", "Last Week", "Coming Soon"],
      Collections: ["Designer Collaboration", "Limited Edition", "Exclusive"],
    },
    Sale: {
      Clearance: ["Up to 30% Off", "Up to 50% Off", "Up to 70% Off"],
      "Special Offers": ["Bundle Deals", "Flash Sale", "Last Chance"],
      Seasonal: ["Summer Sale", "Winter Sale", "Holiday Deals"],
    },
    "Women Clothing": {
      Tops: ["T-Shirts", "Blouses", "Sweaters", "Hoodies", "Cardigans"],
      Dresses: ["Casual", "Party", "Maxi", "Mini", "Formal"],
      Bottoms: ["Jeans", "Skirts", "Shorts", "Pants", "Leggings"],
      Outerwear: ["Jackets", "Coats", "Blazers"],
    },
  };

  const categories = [
    "Categories",
    "New In",
    "Sale",
    "Women Clothing",
    "Beachwear",
    "Kids",
    "Curve",
    "Men Clothing",
    "Underwear & Sleepwear",
    "Shoes",
    "Home & Kitchen",
    "Jewelry & Accessories",
    "Beauty & Health",
    "Baby & Maternity",
    "Sports & Outdoors",
    "Electronics",
  ];

  // const cartItems = [
  //   {
  //     id: 1,
  //     name: "Men's Casual Shirt",
  //     price: 24.99,
  //     image:
  //       "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=100",
  //   },
  //   {
  //     id: 2,
  //     name: "Women's Summer Dress",
  //     price: 39.99,
  //     image:
  //       "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100",
  //   },
  // ];

  // ✅ Get cart items from Redux
  const cartItems = useSelector((state) => state.productCart?.cartItems) || [];
  const user = useSelector((state) => state.user.user) || [];

  // ✅ Calculate total price from Redux state
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity || 0),
    0
  );

  console.log("Cart Items:", cartItems);

  const wishlistItems = [
    {
      id: 1,
      name: "Leather Jacket",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100",
    },
  ];

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const handleDropdownInteraction = (dropdown, isMobile) => {
    if (isMobile) {
      toggleDropdown(dropdown);
    }
  };

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  const handleMobileCategoryClick = (category) => {
    setActiveMobileCategory(
      activeMobileCategory === category ? null : category
    );
  };

  return (
    <div className="bg-white ">
      <header className="border-b border-gray-200 relative">
        {/* Top Header */}
        <div className="container mx-auto px-4 py-4  ">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Logo */}
            <h1 className="text-2xl font-bold tracking-wider">
              <Link href={"/merchandise"}>
                <Image
                  src={"/img/merchandise-logo.png"}
                  alt="Logo"
                  width="200"
                  height="100"
                  className="w-full max-w-[80px]"
                />
              </Link>
            </h1>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Dress Shirts For Men"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-r hover:bg-gray-800">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Account Dropdown */}
              <div
                className="relative"
                onClick={() =>
                  handleDropdownInteraction("account", window.innerWidth < 768)
                }
                onMouseEnter={() =>
                  window.innerWidth >= 768 && setActiveDropdown("account")
                }
                onMouseLeave={() =>
                  window.innerWidth >= 768 && setActiveDropdown(null)
                }
              >
                <button className="flex items-center hover:text-gray-600">
                  <User size={24} />
                </button>
                <AnimatePresence>
                  {activeDropdown === "account" && (
                    <motion.div
                      className="absolute right-0 w-64 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <div className="p-4">
                        {user ? (
                          <>
                            <div className="space-y-2">
                              <Link
                                href="/dashboard"
                                className="block hover:bg-gray-50 py-2 px-4 rounded"
                              >
                                My Orders
                              </Link>
                              <Link
                                href="/dashboard/profile"
                                className="block hover:bg-gray-50 py-2 px-4 rounded"
                              >
                                My Profile
                              </Link>
                              <Link
                                href="/dashboard/settings"
                                className="block hover:bg-gray-50 py-2 px-4 rounded"
                              >
                                Settings
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="mb-4">
                              <Link href={"/dashboard/auth/signin"}>
                                <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                                  Sign In
                                </button>
                              </Link>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Cart Dropdown */}
              <div
                className="relative"
                onClick={() =>
                  handleDropdownInteraction("cart", window.innerWidth < 768)
                }
                onMouseEnter={() =>
                  window.innerWidth >= 768 && setActiveDropdown("cart")
                }
                onMouseLeave={() =>
                  window.innerWidth >= 768 && setActiveDropdown(null)
                }
              >
                <Badge count={cartItems.length} size="small">
                  <button className="flex items-center hover:text-gray-600">
                    <ShoppingCart size={24} />
                  </button>
                </Badge>
                <AnimatePresence>
                  {activeDropdown === "cart" && (
                    <motion.div
                      className="absolute right-0 w-80 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <div className="p-4">
                        <h3 className="font-semibold mb-3">
                          Shopping Cart ({cartItems.length} items)
                        </h3>
                        <div className="space-y-4">
                          {cartItems.length > 0 ? (
                            cartItems.map((item) => (
                              <div key={item._id} className="flex gap-4">
                                <img
                                  src={`http://localhost:5001/uploads/product/img/${item.images[0]}`}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium">
                                    {item.name}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    ${item.price?.toFixed(2)}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    QTY: ({item.quantity})
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-sm">
                              Your cart is empty.
                            </p>
                          )}
                        </div>
                        {cartItems.length > 0 && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="flex justify-between mb-4">
                              <span>Total:</span>
                              <span className="font-semibold">
                                ${totalPrice.toFixed(2)}
                              </span>
                            </div>
                            <Link href={"/merchandise/cart"}>
                              <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                                View Cart
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Wishlist Dropdown */}
              {/* <div
                className="relative"
                onClick={() =>
                  handleDropdownInteraction("wishlist", window.innerWidth < 768)
                }
                onMouseEnter={() =>
                  window.innerWidth >= 768 && setActiveDropdown("wishlist")
                }
                onMouseLeave={() =>
                  window.innerWidth >= 768 && setActiveDropdown(null)
                }
              >
                <Badge count={1} size="small">
                  <button className="flex items-center hover:text-gray-600">
                    <Heart size={24} />
                  </button>
                </Badge>
                <AnimatePresence>
                  {activeDropdown === "wishlist" && (
                    <motion.div
                      className="absolute right-0 w-80 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                    >
                      <div className="p-4">
                        <h3 className="font-semibold mb-3">
                          Wishlist (1 item)
                        </h3>
                        <div className="space-y-4">
                          {wishlistItems.map((item) => (
                            <div key={item.id} className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="text-sm font-medium">
                                  {item.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  ${item.price}
                                </p>
                              </div>
                              <button className="text-sm text-black hover:text-gray-600">
                                Add to Cart
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div> */}

              {/* <button className="hidden md:flex items-center hover:text-gray-600">
                <RotateCcw size={24} />
              </button>
              <button className="hidden md:flex items-center hover:text-gray-600">
                <Globe size={24} />
              </button> */}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="mt-4 md:hidden">
            <div className="relative">
              <input
                type="text"
                placeholder="Dress Shirts For Men"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400"
              />
              <button className="absolute right-0 top-0 h-full px-4 bg-black text-white rounded-r hover:bg-gray-800">
                <Search size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {/* <nav className="container mx-auto px-4 hidden lg:block relative">
          <ul className="flex items-center space-x-6 py-3 text-sm overflow-x-scroll">
            {categories.map((category, index) => (
              <li
                key={index}
                className="relative group whitespace-nowrap"
                onMouseEnter={() => handleCategoryHover(category)}
                onMouseLeave={() => handleCategoryHover("")}
              >
                <button className="flex items-center hover:text-gray-600">
                  {category}
                  {categoriesWithSubcategories[category] && (
                    <ChevronDown size={16} className="ml-1" />
                  )}
                </button>
                {categoriesWithSubcategories[category] &&
                  activeCategory === category && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[9999999999] w-[800px]"
                    >
                      <div className="grid grid-cols-4 gap-6 p-6">
                        {Object.entries(
                          categoriesWithSubcategories[category]
                        ).map(([mainSubcat, items]) => (
                          <div key={mainSubcat}>
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {mainSubcat}
                            </h3>
                            <ul className="space-y-2">
                              {items.map((item, idx) => (
                                <li key={idx}>
                                  <a
                                    href="#"
                                    className="text-gray-600 hover:text-gray-900"
                                  >
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </li>
            ))}
            <li>
              <button className="flex items-center text-gray-600">
                <ChevronRight size={20} />
              </button>
            </li>
          </ul>
        </nav> */}

        {/* Mobile Menu Drawer */}
        <Drawer
          placement="left"
          open={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          width="100%"
          styles={{
            header: {
              display: "none",
            },
          }}
        >
          <div className="h-full">
            <div className="flex justify-between items-center mb-6 p-4">
              <h1 className="text-2xl font-bold tracking-wider">SHEIN</h1>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <ul className="space-y-4 px-4">
              {categories.map((category, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div>
                    <button
                      className="flex items-center justify-between w-full py-2 hover:text-gray-600"
                      onClick={() => handleMobileCategoryClick(category)}
                    >
                      {category}
                      {categoriesWithSubcategories[category] &&
                        (activeMobileCategory === category ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        ))}
                    </button>
                    {categoriesWithSubcategories[category] &&
                      activeMobileCategory === category && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 mt-2 space-y-4"
                        >
                          {Object.entries(
                            categoriesWithSubcategories[category]
                          ).map(([mainSubcat, items]) => (
                            <div key={mainSubcat} className="space-y-2">
                              <h3 className="font-semibold text-gray-900">
                                {mainSubcat}
                              </h3>
                              <ul className="space-y-2 pl-4">
                                {items.map((item, idx) => (
                                  <li key={idx}>
                                    <a
                                      href="#"
                                      className="text-gray-600 hover:text-gray-900"
                                    >
                                      {item}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </motion.div>
                      )}
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </Drawer>
      </header>
    </div>
  );
}

export default Header;
