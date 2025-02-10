"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Bitcoin,
  Apple,
  Google,
  CheckCircle,
  Tag,
  Lock,
  Loader2,
} from "lucide-react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cart = [
    { id: 1, title: "Chill Beats", type: "Song", price: 1.99 },
    { id: 2, title: "Lofi Vibes", type: "Album", price: 9.99 },
    { id: 3, title: "Synthwave Dreams", type: "Playlist", price: 4.99 },
  ];

  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const total = (subtotal - (subtotal * discount) / 100).toFixed(2);

  // Apply Promo Code
  const applyPromo = () => {
    if (promoCode === "MUSIC10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  // Simulate Checkout Process
  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 pb-20">
      {/* 🔥 Checkout Header */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-[#1D1D1D] to-[#121212] p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-extrabold">Secure Checkout</h1>
        <p className="text-gray-400 mt-2">
          Complete your purchase and start listening instantly
        </p>
      </div>

      {!orderPlaced ? (
        <div className="mt-6 w-full max-w-4xl bg-gray-900 p-8 rounded-lg shadow-lg">
          {/* 🎵 Order Summary */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between py-3 border-b border-gray-700"
                >
                  <p className="font-semibold">
                    {item.title}{" "}
                    <span className="text-gray-400">({item.type})</span>
                  </p>
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-gray-400 mt-4">
              <p>Subtotal:</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Discount:</p>
              <p>- ${((subtotal * discount) / 100).toFixed(2)}</p>
            </div>
            <hr className="border-gray-700 my-2" />
            <div className="flex justify-between text-xl font-bold text-green-400">
              <p>Total:</p>
              <p>${total}</p>
            </div>
          </div>

          {/* 🎟️ Promo Code */}
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-3 rounded-l bg-gray-800 text-white placeholder-gray-500 outline-none"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              onClick={applyPromo}
              className="bg-green-500 px-5 py-3 rounded-r text-black font-bold hover:bg-green-600 transition"
            >
              Apply <Tag size={18} className="inline ml-2" />
            </button>
          </div>

          {/* 🏡 Billing Details */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
            <input
              type="text"
              className="w-full p-3 mb-3 rounded bg-gray-800 text-white"
              placeholder="Full Name"
            />
            <input
              type="email"
              className="w-full p-3 mb-3 rounded bg-gray-800 text-white"
              placeholder="Email Address"
            />
            <input
              type="text"
              className="w-full p-3 mb-3 rounded bg-gray-800 text-white"
              placeholder="Billing Address"
            />
          </div>

          {/* 💳 Payment Methods */}
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setPaymentMethod("credit-card")}
                className={`flex-1 p-4 rounded-lg ${
                  paymentMethod === "credit-card"
                    ? "bg-green-500"
                    : "bg-gray-800"
                } transition`}
              >
                <CreditCard size={24} className="inline mr-2" /> Credit Card
              </button>
              <button
                onClick={() => setPaymentMethod("paypal")}
                className={`flex-1 p-4 rounded-lg ${
                  paymentMethod === "paypal" ? "bg-green-500" : "bg-gray-800"
                } transition`}
              >
                {/* <PayPal size={24} className="inline mr-2" /> */}
                PayPal
              </button>
              <button
                onClick={() => setPaymentMethod("crypto")}
                className={`flex-1 p-4 rounded-lg ${
                  paymentMethod === "crypto" ? "bg-green-500" : "bg-gray-800"
                } transition`}
              >
                <Bitcoin size={24} className="inline mr-2" /> Crypto
              </button>
            </div>
            {paymentMethod === "credit-card" && (
              <div className="mt-4">
                <input
                  type="text"
                  className="w-full p-3 mb-3 rounded bg-gray-800 text-white"
                  placeholder="Card Number"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="w-full p-3 rounded bg-gray-800 text-white"
                    placeholder="MM/YY"
                  />
                  <input
                    type="text"
                    className="w-full p-3 rounded bg-gray-800 text-white"
                    placeholder="CVV"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 🔒 Secure Checkout */}
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-green-500 px-6 py-4 rounded-full text-black font-bold hover:bg-green-600 transition text-xl flex justify-center items-center"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 size={24} className="animate-spin mr-2" />
            ) : (
              "Complete Purchase"
            )}{" "}
            <Lock size={20} className="ml-2" />
          </button>
        </div>
      ) : (
        <div className="p-10 text-center">
          <CheckCircle size={80} className="text-green-500 mx-auto" />
          <h2 className="text-3xl font-bold mt-4">Order Confirmed!</h2>
          <p className="text-gray-400 mt-2">
            Your music is now available for instant download.
          </p>
        </div>
      )}
    </div>
  );
}
