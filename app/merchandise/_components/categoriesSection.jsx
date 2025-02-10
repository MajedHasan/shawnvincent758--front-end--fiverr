"use client";
import React, { useEffect, useState } from "react";
import { Flame } from "lucide-react";

const categories = [
  {
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Kids & Baby",
    image:
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    hot: true,
  },
  {
    name: "Tops",
    image:
      "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Co-ords",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
    hot: true,
  },
  {
    name: "Beachwear",
    image:
      "https://images.unsplash.com/photo-1582564286939-400a311013a2?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Sports & Outdoor",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Underwear & Sleepwear",
    image:
      "https://images.unsplash.com/photo-1592923513198-74f5aa9d4b8b?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Home & Living",
    image:
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Shoes & Bags",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Jewelry & Watches",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    hot: false,
  },
  {
    name: "Beauty & Health",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    hot: false,
  },
];

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        `http://localhost:5001/api/product-categories?limit=14`
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    };
    getCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 w-full max-w-[1350px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 lg:gap-16">
        {categories?.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="relative w-full pb-[100%] bg-gray-50 rounded-full overflow-hidden mb-3">
              <img
                src={`http://localhost:5001/uploads/product/category/${category.image}`}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {category?.hot && (
                <div className="absolute top-2 right-2">
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Flame size={12} className="mr-1" />
                    Hot
                  </div>
                </div>
              )}
            </div>
            <span className="text-sm text-center font-medium">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
