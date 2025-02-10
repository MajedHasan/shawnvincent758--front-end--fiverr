"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  Info,
  Search,
  Heart,
  ShoppingBag,
  X,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { updateQuantity } from "@/lib/store/productCartSlice";

// const cartItems = [
//   {
//     id: 1,
//     name: "Men's Casual Solid Color Long Sleeve Shirt And Shorts Set",
//     brand: "Manfinity RSRT",
//     image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300",
//     price: 25.2,
//     originalPrice: 28.0,
//     discount: 10,
//     color: "Blue",
//     size: "M",
//     quantity: 1,
//     itemsLeft: 5,
//   },
//   {
//     id: 2,
//     name: "4pcs/Set Women Vintage Oil Painting Floral Striped Print Silk Scarf Headband",
//     brand: "BJ",
//     image: "https://images.unsplash.com/photo-1623091411395-09e79fdbfcf3?w=300",
//     price: 1.8,
//     originalPrice: 2.0,
//     discount: 10,
//     color: "Multicolor",
//     size: "one-size",
//     quantity: 1,
//     itemsLeft: 8,
//   },
// ];

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.productCart?.cartItems) || [];
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity || 0),
    0
  );

  const [items, setItems] = useState(cartItems);
  const [couponCode, setCouponCode] = useState("");
  const [selectedItems, setSelectedItems] = useState(
    items.map((item) => item._id)
  );
  const [showCouponInput, setShowCouponInput] = useState(false);

  const isItemSelected = (id) => selectedItems.includes(id);

  const toggleItemSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleAllSelection = () => {
    setSelectedItems((prev) =>
      prev.length === items.length ? [] : items.map((item) => item._id)
    );
  };

  const updateQTY = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    const itemToRemove = items.find((item) => item._id === id);
    if (!itemToRemove) return;

    // Animate the removal
    const element = document.getElementById(`cart-item-${id}`);
    if (element) {
      element.style.height = `${element.offsetHeight}px`;
      element.style.transition = "all 0.3s ease-out";

      setTimeout(() => {
        element.style.height = "0";
        element.style.opacity = "0";
        element.style.padding = "0";

        setTimeout(() => {
          setItems((prev) => prev.filter((item) => item._id !== id));
          setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
        }, 300);
      }, 0);
    }
  };

  const calculateTotal = () => {
    const selectedItemsData = items.filter((item) =>
      selectedItems.includes(item.id)
    );
    const subtotal = selectedItemsData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const savings = selectedItemsData.reduce(
      (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
      0
    );
    return { subtotal, savings };
  };

  const { subtotal, savings } = calculateTotal();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center text-sm">
            <div className="flex items-center">
              <span className="font-medium text-black">Cart</span>
              <div className="w-3 h-3 rounded-full bg-black ml-2"></div>
            </div>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <div className="flex items-center">
              <span className="text-gray-400">Place Order</span>
              <div className="w-3 h-3 rounded-full bg-gray-200 ml-2"></div>
            </div>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <div className="flex items-center">
              <span className="text-gray-400">Pay</span>
              <div className="w-3 h-3 rounded-full bg-gray-200 ml-2"></div>
            </div>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <div className="flex items-center">
              <span className="text-gray-400">Order Complete</span>
              <div className="w-3 h-3 rounded-full bg-gray-200 ml-2"></div>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="container mx-auto px-4 py-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Cart Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coupon Alert */}
            {/* <motion.div
              className="bg-red-50 border border-red-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center text-red-600">
                <span className="mr-2 flex items-center justify-center w-5 h-5 bg-red-100 rounded-full">
                  ✓
                </span>
                <span className="font-medium">
                  Use coupon now to save $3.00
                </span>
              </div>
            </motion.div> */}

            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <motion.input
                      type="checkbox"
                      checked={selectedItems.length === items.length}
                      onChange={toggleAllSelection}
                      className="mr-2 w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                      whileTap={{ scale: 0.9 }}
                    />
                    <span className="font-bold text-lg">
                      ALL ITEMS ({items.length})
                    </span>
                  </div>
                  <button className="text-sm text-gray-600 hover:text-black transition-colors">
                    Select
                  </button>
                </div>
              </div>

              {/* Buy X Get Y Promotion */}
              {/* <motion.div
                className="p-4 bg-red-50 border-b cursor-pointer"
                whileHover={{ backgroundColor: "#FEF2F2" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">BUY</span>
                    <span className="text-red-600 font-bold">4</span>
                    <span className="font-bold">GET</span>
                    <span className="text-red-600 font-bold">40%</span>
                    <span className="font-bold">OFF. Add</span>
                    <span className="text-red-600 font-bold">3</span>
                    <span className="font-bold">more for the discount!</span>
                  </div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={20} />
                  </motion.div>
                </div>
              </motion.div> */}

              {/* Cart Items List */}
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item._id}
                    id={`cart-item-${item._id}`}
                    className="p-4 border-b"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, height: 0, padding: 0 }}
                  >
                    <div className="flex gap-4">
                      <motion.input
                        type="checkbox"
                        checked={isItemSelected(item._id)}
                        onChange={() => toggleItemSelection(item._id)}
                        className="mt-2 w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                        whileTap={{ scale: 0.9 }}
                      />
                      <motion.div
                        className="w-24 h-24 overflow-hidden rounded-lg"
                        whileHover={{ scale: 1.05 }}
                      >
                        <img
                          src={`http://localhost:5001/uploads/product/img/${item.images[0]}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium mb-1 hover:text-blue-600 cursor-pointer transition-colors">
                              {item.name}
                            </h3>
                            <motion.div
                              className="flex items-center text-sm text-gray-600 mb-2 cursor-pointer"
                              whileHover={{ x: 5 }}
                            >
                              <span className="mr-2">{item.category}</span>
                              <ChevronRight size={16} />
                            </motion.div>
                            {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>{item.color}</span>
                              <span>|</span>
                              <span>{item.size}</span>
                            </div> */}
                          </div>
                          <motion.button
                            onClick={() => removeItem(item._id)}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X
                              size={20}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            />
                          </motion.button>
                        </div>
                        <div className="flex items-end justify-between mt-4">
                          <div>
                            <div className="text-red-500 font-medium text-lg">
                              ${item?.price?.toFixed(2)}
                            </div>
                            {/* <div className="text-sm text-gray-500 line-through">
                              ${item?.originalPrice?.toFixed(2)}
                            </div> */}
                          </div>
                          <div className="flex items-center gap-4">
                            <select
                              value={item.quantity}
                              onChange={(e) =>
                                updateQTY(item._id, parseInt(e.target.value))
                              }
                              className="border rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-black focus:border-black"
                            >
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))}
                            </select>
                            {/* <div className="flex gap-2">
                              <motion.button
                                className="p-2 hover:bg-gray-100 rounded-full"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Search size={20} />
                              </motion.button>
                              <motion.button
                                className="p-2 hover:bg-gray-100 rounded-full"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Heart size={20} />
                              </motion.button>
                            </div> */}
                          </div>
                        </div>
                        {item.itemsLeft <= 5 && (
                          <motion.div
                            className="text-red-500 text-sm mt-2 flex items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                            Only {item.itemsLeft} left!
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="p-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Info size={16} className="mr-2" />
                  Some items cannot be returned/enjoy discounts.
                  <button className="text-blue-600 ml-2 hover:underline">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-lg shadow-sm p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <p className="text-sm text-gray-500 mb-6">
                Proceed to enjoy discounts and accept seeds then confirm the
                final price
              </p>

              {/* Selected Items Preview */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {items
                  .filter((item) => selectedItems.includes(item._id))
                  .map((item) => (
                    <motion.div
                      key={item.id}
                      className="relative w-16 h-16 flex-shrink-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={`http://localhost:5001/uploads/product/img/${item.images[0]}`}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute top-0 right-0 bg-black text-white text-xs px-1.5 py-0.5 rounded">
                        {item.quantity}
                      </div>
                    </motion.div>
                  ))}
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                <motion.div
                  className="flex justify-between items-center mb-2 cursor-pointer"
                  onClick={() => setShowCouponInput(!showCouponInput)}
                >
                  <span className="font-medium">Coupon:</span>
                  <div className="flex items-center text-red-500">
                    <span>-$3.00</span>
                    <ChevronDown
                      size={16}
                      className={`ml-1 transform transition-transform ${
                        showCouponInput ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </motion.div>
                <AnimatePresence>
                  {showCouponInput && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                        />
                        <motion.button
                          className="px-4 py-2 bg-black text-white rounded-lg"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Apply
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p className="text-xs text-gray-500">
                  This is an estimated price, the actual price after discount
                  will be calculated at checkout.
                </p>
              </div>

              {/* Price Summary */}
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Estimated Price:</span>
                  <motion.span
                    className="text-2xl font-bold text-red-500"
                    key={subtotal}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    ${(totalPrice - 3).toFixed(2)}
                  </motion.span>
                </div>
                <div className="text-sm text-red-500">
                  Saved ${(savings + 3).toFixed(2)}
                </div>
                {/* <div className="flex items-center text-sm mt-2">
                  <span>Reward</span>
                  <motion.span
                    className="font-bold mx-1"
                    key={Math.floor(subtotal)}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                  >
                    {Math.floor(subtotal)}
                  </motion.span>
                  <span>SHEIN Points</span>
                  <Info size={14} className="ml-1 cursor-help" />
                </div> */}
              </div>

              {/* Checkout Button */}
              <Link href={"/merchandise/checkout"}>
                <motion.button
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors mb-6 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">
                    Checkout Now ({selectedItems.length})
                  </span>
                  <motion.span
                    className="text-red-400 ml-2 relative z-10"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Almost sold out!
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gray-800 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </Link>

              <p className="text-sm text-gray-600 mb-6">
                Apply a <span className="font-medium">Coupon Code</span>,{" "}
                <span className="font-medium">SHEIN Points</span> on the next
                step.
              </p>

              {/* Payment Methods */}
              <div>
                <h3 className="font-bold mb-4">We Accept</h3>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    "visa",
                    "mastercard",
                    "amex",
                    "discover",
                    "paypal",
                    "applepay",
                    "googlepay",
                    "klarna",
                  ].map((method) => (
                    <motion.div
                      key={method}
                      className="h-10 bg-gray-50 rounded-lg flex items-center justify-center p-2"
                      whileHover={{ scale: 1.05, backgroundColor: "#F9FAFB" }}
                    >
                      <img
                        src={`https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png`}
                        alt={method}
                        className="h-6 object-contain"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CartPage;
