"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Info,
  CreditCard,
  Lock,
  Shield,
  AlertCircle,
  Check,
  X,
  Handshake,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
} from "@/lib/store/productCartSlice";
import { Modal } from "antd";
import axios from "axios";

const orderItems = [
  {
    id: 1,
    name: "Men's Casual Solid Color Long Sleeve Shirt And Shorts Set",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300",
    price: 28.0,
    quantity: 1,
  },
  {
    id: 2,
    name: "4pcs/Set Women Vintage Oil Painting Floral Striped Print Silk Scarf Headband",
    image: "https://images.unsplash.com/photo-1623091411395-09e79fdbfcf3?w=300",
    price: 2.0,
    quantity: 1,
  },
];

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    location: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    stateProvince: "",
    postZipCode: "",
    addressLine1: "",
    addressLine2: "",
    makeDefault: false,
  });

  const [couponCode, setCouponCode] = useState("");
  const [giftCard, setGiftCard] = useState({ number: "", pin: "" });
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cod");
  const [showCouponInput, setShowCouponInput] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [orderId, setOrderId] = useState("");

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.productCart?.cartItems) || [];
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * item.quantity || 0),
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescreaseQTY = (id) => {
    dispatch(decreaseQuantity(id));
  };
  const handleIncreaseQTY = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handlePlaceOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("shawnvincent-user"));

      if (!user || cartItems.length === 0) {
        return alert("Cart is empty or user not logged in!");
      }

      if (!formData.location) return alert("Please add the Location");
      if (!formData.firstName) return alert("Please add the First Name");
      if (!formData.lastName) return alert("Please add the Last Name");
      if (!formData.phoneNumber) return alert("Please add the Phone Number");
      if (!formData.city) return alert("Please add the City");
      if (!formData.addressLine1) return alert("Please add an Address");

      const orderData = {
        orderFrom: user._id,
        orderTo: "SELLER_ID_OR_CUSTOM_STRING", // ✅ Can be a user ID, a string, or empty
        orderType: "product",
        products: cartItems, // ✅ Dynamic products
        customer: formData, // ✅ Dynamic customer data
        totalAmount: totalPrice,
        payment: {
          method: "cod",
          status: "pending",
        },
        delivery: {
          method: "shipping",
        },
      };

      const response = await axios.post(
        "http://localhost:5001/api/orders",
        orderData
      );

      if (response.data.message === "Order placed successfully!") {
        dispatch(clearCart());
        setOrderId(response.data.order.orderId);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Order placement failed!", error);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center text-sm">
            <div className="flex items-center text-gray-400">
              <span>Cart</span>
              <ChevronRight size={16} className="mx-2" />
            </div>
            <div className="flex items-center">
              <span className="font-medium text-black">Place Order</span>
              <div className="w-3 h-3 rounded-full bg-black ml-2"></div>
            </div>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <span className="text-gray-400">Pay</span>
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            <span className="text-gray-400">Order Complete</span>
          </div>
        </div>
      </div>

      {/* ✅ Success Modal (TailwindCSS) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold text-green-600">
              Order Placed Successfully!
            </h2>
            <p className="mt-2">Your order has been placed successfully.</p>
            <p className="mt-2">
              Order ID: <strong>{orderId}</strong>
            </p>
            <p className="mt-2">Thank you for shopping with us!</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <motion.div
              className="bg-white rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">SHIPPING ADDRESS</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium mb-1">
                    Location*
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      placeholder="Please choose your location"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-24">
                    <label className="block text-sm font-medium mb-1">
                      Code
                    </label>
                    <input
                      type="text"
                      value="AO +244"
                      disabled
                      className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      State/Province(Optional)
                    </label>
                    <input
                      type="text"
                      name="stateProvince"
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      value={formData.stateProvince}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Post/Zip Code
                  </label>
                  <input
                    type="text"
                    name="postZipCode"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    value={formData.postZipCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address Line 1*
                  </label>
                  <textarea
                    name="addressLine1"
                    placeholder="Street, Address, Company Name, C/O"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    rows={2}
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Address Line 2
                  </label>
                  <textarea
                    name="addressLine2"
                    placeholder="Apartment, Suite, Unit, Building, Floor, etc. (Optional)"
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                    rows={2}
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="makeDefault"
                      checked={formData.makeDefault}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          makeDefault: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <label htmlFor="makeDefault" className="ml-2 text-sm">
                      Make Default
                    </label>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <a href="#" className="text-gray-600 hover:text-black">
                      General Address Tips
                    </a>
                    <a href="#" className="text-gray-600 hover:text-black">
                      Privacy & Cookie Policy
                    </a>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <Info size={16} className="mr-2" />
                  <p>
                    We maintain industry-standard physical, technical, and
                    administrative measures to safeguard your personal
                    information.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Order Details */}
            <motion.div
              className="bg-white rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Order Details</h2>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="text-sm text-blue-600 hover:underline flex items-center"
                  >
                    View {cartItems.length} items
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b"
                  >
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="p-6 border-b last:border-b-0"
                      >
                        <div className="flex gap-4">
                          <img
                            src={`http://localhost:5001/uploads/product/img/${item.images[0]}`}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-2">
                              {item.name}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="text-sm font-medium">
                                ${item?.price?.toFixed(2)}
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleDescreaseQTY(item?._id)}
                                  className="w-8 h-8 flex items-center justify-center border rounded-full"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleIncreaseQTY(item?._id)}
                                  className="w-8 h-8 flex items-center justify-center border rounded-full"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              className="bg-white rounded-lg shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">PAYMENT METHOD</h2>
              </div>

              <div className="p-6">
                {/* Payment Method Selection */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {[
                    {
                      id: "credit",
                      label: "Credit/Debit Card",
                      icon: CreditCard,
                    },
                    { id: "digital", label: "Digital Wallet", icon: Lock },
                    { id: "bank", label: "Bank Transfer", icon: AlertCircle },
                    { id: "cod", label: "Cash On Delivery", icon: Handshake },
                  ].map((method) => (
                    <motion.button
                      key={method.id}
                      className={`relative p-6 rounded-xl border-2 transition-all ${
                        selectedPaymentMethod === method.id
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => {
                        if (method.id === "cod") {
                          setSelectedPaymentMethod(method.id);
                        } else {
                          alert("Currently We are accepting Cash On Delivery");
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <method.icon size={24} />
                        <span className="font-medium">{method.label}</span>
                      </div>
                      {selectedPaymentMethod === method.id && (
                        <motion.div
                          className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check size={14} className="text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Credit Card Options */}
                {selectedPaymentMethod === "credit" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        {
                          id: "visa",
                          name: "Visa",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
                        },
                        {
                          id: "mastercard",
                          name: "Mastercard",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
                        },
                        {
                          id: "amex",
                          name: "American Express",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg",
                        },
                        {
                          id: "discover",
                          name: "Discover",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Discover_Card_logo.svg",
                        },
                        {
                          id: "diners",
                          name: "Diners Club",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Diners_Club_Logo3.svg",
                        },
                        {
                          id: "jcb",
                          name: "JCB",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/JCB_logo.svg",
                        },
                        {
                          id: "unionpay",
                          name: "UnionPay",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/UnionPay_logo.svg",
                        },
                        {
                          id: "maestro",
                          name: "Maestro",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Maestro_logo.svg",
                        },
                      ].map((card) => (
                        <motion.div
                          key={card.id}
                          className="aspect-[3/2] p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center cursor-pointer transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={card.logo}
                            alt={card.name}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                          />
                          <CreditCard
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          placeholder="JOHN DOE"
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Security Code
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="CVV"
                            className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                          />
                          <Lock
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Digital Wallet Options */}
                {selectedPaymentMethod === "digital" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    {[
                      {
                        id: "paypal",
                        name: "PayPal",
                        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
                      },
                      {
                        id: "applepay",
                        name: "Apple Pay",
                        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg",
                      },
                      {
                        id: "googlepay",
                        name: "Google Pay",
                        logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Google_Pay_logo.svg",
                      },
                    ].map((wallet) => (
                      <motion.button
                        key={wallet.id}
                        className="p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 flex flex-col items-center gap-4"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img
                          src={wallet.logo}
                          alt={wallet.name}
                          className="h-8 object-contain"
                        />
                        <span className="font-medium">{wallet.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {/* Bank Transfer Options */}
                {selectedPaymentMethod === "bank" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          id: "ach",
                          name: "ACH Transfer",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/8/81/ACH_logo.svg",
                        },
                        {
                          id: "wire",
                          name: "Wire Transfer",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Wire_transfer_icon.svg",
                        },
                        {
                          id: "sepa",
                          name: "SEPA",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/SEPA_logo.svg",
                        },
                        {
                          id: "klarna",
                          name: "Klarna",
                          logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Klarna_Payment_Badge_Pink.svg",
                        },
                      ].map((method) => (
                        <motion.button
                          key={method.id}
                          className="p-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 flex items-center gap-4"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <img
                            src={method.logo}
                            alt={method.name}
                            className="h-8 w-8 object-contain"
                          />
                          <span className="font-medium">{method.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Security Badges */}
                <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                      <Shield className="text-green-500" size={24} />
                      <div>
                        <h3 className="font-medium">Secure Payment</h3>
                        <p className="text-sm text-gray-600">
                          256-bit SSL encryption
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Lock className="text-blue-500" size={24} />
                      <div>
                        <h3 className="font-medium">Data Protection</h3>
                        <p className="text-sm text-gray-600">
                          PCI DSS compliant
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold">Order Summary</h2>
              </div>

              <div className="p-6">
                {/* Selected Items */}
                <div className="flex gap-2 mb-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img
                        src={`http://localhost:5001/uploads/product/img/${item.images[0]}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white rounded-full flex items-center justify-center text-xs">
                        {item.quantity}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Price:</span>
                    <span>${totalPrice}</span>
                  </div>
                  {/* <div className="flex items-center gap-2 text-sm">
                    <span className="bg-yellow-400 rounded-full p-1">🏅</span>
                    <span>Reward</span>
                    <span className="font-bold">30</span>
                    <span>points</span>
                    <Info size={14} className="text-gray-400" />
                  </div> */}
                </div>

                {/* Coupon Code */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Coupon Code</span>
                    <button
                      onClick={() => setShowCouponInput(!showCouponInput)}
                    >
                      <Info size={14} className="text-gray-400" />
                    </button>
                  </div>
                  <AnimatePresence>
                    {showCouponInput && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                            placeholder="Enter code"
                          />
                          <motion.button
                            className="px-6 py-2 bg-black text-white rounded-lg"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Apply
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Gift Card */}
                {/* <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Gift Card</span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={giftCard.number}
                      onChange={(e) =>
                        setGiftCard((prev) => ({
                          ...prev,
                          number: e.target.value,
                        }))
                      }
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      placeholder="Card Number"
                    />
                    <input
                      type="text"
                      value={giftCard.pin}
                      onChange={(e) =>
                        setGiftCard((prev) => ({
                          ...prev,
                          pin: e.target.value,
                        }))
                      }
                      className="w-24 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black"
                      placeholder="PIN"
                    />
                  </div>
                  <motion.button
                    className="w-full px-6 py-2 bg-gray-100 text-gray-600 rounded-lg"
                    whileHover={{ scale: 1.02, backgroundColor: "#f3f4f6" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Apply
                  </motion.button>
                </div> */}

                {/* Place Order Button */}
                <motion.button
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-600 transition-colors mb-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePlaceOrder}
                >
                  PLACE ORDER
                </motion.button>

                {/* Security Info */}
                <div className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                      <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                      Payment Security
                    </h3>
                    <p className="text-gray-600">
                      SHEIN is committed to protecting your payment information
                      and only shares your credit card information with our
                      payment service providers who agreed to safeguard your
                      information.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-green-600 mb-2 flex items-center gap-2">
                      <span className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                      Security & Privacy
                    </h3>
                    <p className="text-gray-600">
                      SHEIN's payment processor partner stores your credit card
                      details by using industry-standard data encryption
                      technology. SHEIN will not store your actual credit card
                      information.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
