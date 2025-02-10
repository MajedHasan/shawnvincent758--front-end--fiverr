"use client";
import React, { useState } from "react";
import {
  Trash,
  Minus,
  Plus,
  ShoppingCart,
  Play,
  Heart,
  Tag,
} from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([
    {
      id: 1,
      title: "Chill Beats",
      type: "Song",
      price: 1.99,
      quantity: 1,
      image: "https://source.unsplash.com/100x100/?music,song",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      id: 2,
      title: "Lofi Vibes",
      type: "Album",
      price: 9.99,
      quantity: 1,
      image: "https://source.unsplash.com/100x100/?album,music",
    },
    {
      id: 3,
      title: "Deep Focus",
      type: "Playlist",
      price: 14.99,
      quantity: 1,
      image: "https://source.unsplash.com/100x100/?playlist,music",
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [wishlist, setWishlist] = useState([]);

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove Item
  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Move to Wishlist
  const moveToWishlist = (item) => {
    setWishlist([...wishlist, item]);
    removeItem(item.id);
  };

  // Apply Promo Code
  const applyPromo = () => {
    if (promoCode === "MUSIC10") {
      setDiscount(10);
    } else {
      setDiscount(0);
    }
  };

  // Calculate Total Price
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = (subtotal - (subtotal * discount) / 100).toFixed(2);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 🛒 Cart Header */}
      <div className="bg-gradient-to-b from-[#1D1D1D] to-black p-6 text-center">
        <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
        <p className="text-gray-400">Review your selected music and albums</p>
      </div>

      {/* 🛍️ Cart Items */}
      <div className="p-6 max-w-4xl mx-auto space-y-4">
        {cart.length === 0 ? (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <img src={item.image} className="w-16 h-16 rounded-lg" />
              <div className="ml-4 flex-1">
                <p className="text-lg font-bold">{item.title}</p>
                <p className="text-sm text-gray-400">{item.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-gray-700 p-2 rounded-full"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-gray-700 p-2 rounded-full"
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="ml-4 font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              {/* 🎵 Play Song Preview */}
              {item.url && (
                <button className="ml-4 text-green-400 hover:text-green-500">
                  <Play size={20} />
                </button>
              )}

              {/* ❤️ Move to Wishlist */}
              <button
                onClick={() => moveToWishlist(item)}
                className="ml-4 text-red-400 hover:text-red-500"
              >
                <Heart size={20} />
              </button>

              {/* 🗑️ Remove Item */}
              <button
                onClick={() => removeItem(item.id)}
                className="ml-4 text-gray-400 hover:text-red-600"
              >
                <Trash size={20} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* 💰 Price Breakdown */}
      {cart.length > 0 && (
        <div className="p-6 max-w-4xl mx-auto bg-gray-900 rounded-lg mt-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Price Breakdown</h2>
          <div className="flex justify-between">
            <p className="text-gray-400">Subtotal:</p>
            <p className="font-bold">${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400">Discount:</p>
            <p className="font-bold">
              - ${((subtotal * discount) / 100).toFixed(2)}
            </p>
          </div>
          <hr className="border-gray-700 my-2" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-lg font-bold">${total}</p>
          </div>

          {/* 🎟️ Promo Code Input */}
          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-1 p-2 rounded-l bg-gray-800 text-white placeholder-gray-500 outline-none"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              onClick={applyPromo}
              className="bg-green-500 px-4 py-2 rounded-r text-black font-bold hover:bg-green-600 transition"
            >
              Apply <Tag size={16} className="inline ml-1" />
            </button>
          </div>

          {/* ✅ Checkout Button */}
          <Link href={"/music/checkout"}>
            <button className="mt-6 w-full bg-green-500 px-6 py-2 rounded-full text-black font-bold hover:bg-green-600 transition">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}

      {/* ❤️ Wishlist */}
      {wishlist.length > 0 && (
        <div className="p-6 max-w-4xl mx-auto bg-gray-900 rounded-lg mt-6 shadow-lg">
          <h2 className="text-xl font-bold">Wishlist</h2>
          {wishlist.map((item) => (
            <p key={item.id} className="text-gray-400">
              {item.title} - {item.type}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
