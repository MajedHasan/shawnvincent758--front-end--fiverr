"use client";
import React, { useEffect, useState } from "react";
import HeroSlider from "./heroSlider";
import { Truck, RotateCcw, Gift, Flame } from "lucide-react";

const HeroSection = () => {
  // const products = [
  //   {
  //     id: 1,
  //     image:
  //       "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300",
  //     price: 13.8,
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=300",
  //     price: 29.75,
  //   },
  //   {
  //     id: 3,
  //     image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300",
  //     price: 42.0,
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=300",
  //     price: 35.0,
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://images.unsplash.com/photo-1512353087810-25dfcd100962?w=300",
  //     price: 18.3,
  //   },
  //   {
  //     id: 6,
  //     image:
  //       "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=300",
  //     price: 24.65,
  //   },
  // ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(
        `http://localhost:5001/api/products?limit=6`
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data?.products);
      }
    };
    getProduct();
  }, []);

  return (
    <div className="relative z-0">
      {/* Top Banner */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm w-full max-w-[1350px]">
          <div className="flex items-center">
            <Truck className="w-5 h-5 mr-2" />
            <span className="font-medium">SHIPPING INFO</span>
          </div>
          <div className="flex items-center">
            <RotateCcw className="w-5 h-5 mr-2" />
            <span className="font-medium">RETURN POLICY</span>
          </div>
          <div className="flex items-center">
            <Gift className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-medium">SHARE & EARN</div>
              <div className="text-xs text-gray-600">GET AN EXTRA 15% OFF</div>
            </div>
          </div>
        </div>
      </div>
      {/* Top Banner */}
      <div className="container mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-4 w-full max-w-[1350px]">
        {/* Sale Zone */}
        <div className="lg:col-span-3 bg-gradient-to-br from-pink-400 to-red-400 rounded-lg p-8 text-white flex flex-col justify-between min-h-[400px]">
          <div>
            <h2 className="text-6xl font-bold leading-tight">
              SALE
              <br />
              ZONE
            </h2>
            <p className="mt-4 text-lg">Super coupons every day!</p>
          </div>
          <button className="bg-black text-white px-6 py-3 rounded-full mt-4 hover:bg-gray-800 transition-colors w-fit">
            CLICK TO GET
          </button>
        </div>
        {/* Sale Zone */}
        <HeroSlider />
        {/* Super Deals */}
        <div className="lg:col-span-3">
          <div className="bg-pink-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Flame className="w-5 h-5 mr-2 text-pink-500" />
              Super Deals
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {products.map((product) => (
                <div key={product._id} className="relative group">
                  <img
                    src={`http://localhost:5001/uploads/product/img/${product.images[0]}`}
                    alt={`Product ${product._id}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-sm font-semibold">
                    ${product?.price?.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Super Deals */}
      </div>
    </div>
  );
};

export default HeroSection;
