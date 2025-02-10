"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/store/productCartSlice";
import Link from "next/link";

// const products = [
//   {
//     id: 1,
//     name: "SHEIN Raffinéa Adjustable Strap Loose Maxi Dress",
//     image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500",
//     price: 9.25,
//     originalPrice: 12.0,
//     discount: 23,
//     rating: 4.8,
//     reviews: 2453,
//     isNew: true,
//     category: "Dresses",
//     quantity: 1, // ✅ Added for cart compatibility
//   },
//   {
//     id: 2,
//     name: "INAWLY 2pcs Set: Abstract Print Casual Dress",
//     image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500",
//     price: 21.0,
//     originalPrice: 21.0, // ✅ Added originalPrice for consistency
//     discount: 0, // ✅ No discount for clarity
//     rating: 4.5,
//     reviews: 1289,
//     isBestSeller: true,
//     category: "Sets",
//     quantity: 1,
//   },
//   {
//     id: 3,
//     name: "SHEIN MOD Women's Pink Maxi Wedding Dress",
//     image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500",
//     price: 53.55,
//     originalPrice: 63.0,
//     discount: 15,
//     rating: 4.9,
//     reviews: 3421,
//     category: "Dresses",
//     quantity: 1,
//   },
//   {
//     id: 4,
//     name: "SHEIN Raffinéa Women's Striped Split Blazer",
//     image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=500",
//     price: 12.75,
//     originalPrice: 17.0,
//     discount: 25,
//     rating: 4.6,
//     reviews: 892,
//     category: "Outerwear",
//     quantity: 1,
//   },
//   {
//     id: 5,
//     name: "Aloruh Women Casual American Street Style Set",
//     image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
//     price: 7.75,
//     originalPrice: 10.0,
//     discount: 23,
//     rating: 4.7,
//     reviews: 1567,
//     isBestSeller: true,
//     category: "Sets",
//     quantity: 1,
//   },
//   {
//     id: 6,
//     name: "Elegant Floral Print Summer Dress",
//     image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
//     price: 15.99,
//     originalPrice: 19.99,
//     discount: 20,
//     rating: 4.4,
//     reviews: 756,
//     isNew: true,
//     category: "Dresses",
//     quantity: 1,
//   },
//   {
//     id: 7,
//     name: "Casual Linen Button-Down Shirt",
//     image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500",
//     price: 11.5,
//     originalPrice: 13.0,
//     discount: 12,
//     rating: 4.3,
//     reviews: 432,
//     category: "Tops",
//     quantity: 1,
//   },
//   {
//     id: 8,
//     name: "High-Waist Palazzo Pants",
//     image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=500",
//     price: 16.25,
//     originalPrice: 25.0,
//     discount: 35,
//     rating: 4.8,
//     reviews: 1893,
//     isBestSeller: true,
//     category: "Bottoms",
//     quantity: 1,
//   },
//   {
//     id: 9,
//     name: "Bohemian Style Maxi Skirt",
//     image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500",
//     price: 18.99,
//     originalPrice: 24.99,
//     discount: 24,
//     rating: 4.6,
//     reviews: 678,
//     category: "Skirts",
//     quantity: 1,
//   },
//   {
//     id: 10,
//     name: "Oversized Knit Sweater",
//     image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500",
//     price: 22.5,
//     originalPrice: 30.0,
//     discount: 25,
//     rating: 4.7,
//     reviews: 1245,
//     isNew: true,
//     category: "Sweaters",
//     quantity: 1,
//   },
// ];

// const categories = [
//   "All",
//   "Dresses",
//   "Sets",
//   "Tops",
//   "Bottoms",
//   "Outerwear",
//   "Skirts",
//   "Sweaters",
// ];

const RecommendationsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const dispatch = useDispatch(); // ✅ Call useDispatch at the top level

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
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full max-w-[1350px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recommend</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                ${
                  activeCategory === "All"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category?._id}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                ${
                  activeCategory === category.name
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product._id}
            className="group cursor-pointer"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
            onHoverStart={() => setHoveredProduct(product._id)}
            onHoverEnd={() => setHoveredProduct(null)}
          >
            <div className="relative overflow-hidden rounded-lg">
              <Link href={`/merchandise/product/${product._id}`}>
                <img
                  src={`http://localhost:5001/uploads/product/img/${product.images[0]}`}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    New
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    Best Seller
                  </span>
                )}
              </div>

              {/* Quick actions */}
              <div className="absolute right-2 top-2 flex flex-col gap-2">
                <motion.button
                  className={`p-2 rounded-full transition-all duration-200 ${
                    hoveredProduct === product._id
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-10"
                  } ${
                    wishlist.includes(product.id)
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={() => toggleWishlist(product._id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    size={20}
                    className={
                      wishlist.includes(product._id) ? "fill-current" : ""
                    }
                  />
                </motion.button>
                {/* Add to Cart Button */}
                <motion.button
                  className={`p-2 rounded-full bg-black text-white transition-all duration-200 ${
                    hoveredProduct === product._id
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-10"
                  }`}
                  onClick={() => dispatch(addToCart(product))} // Add to Cart Function
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ShoppingCart size={20} />
                </motion.button>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center gap-2">
                <div className="flex items-center text-yellow-400">
                  <Star size={16} className="fill-current" />
                  <span className="text-sm text-gray-600 ml-1">
                    {product.rating}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  ({product.reviews})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-orange-500">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="text-xs text-orange-500 font-medium">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsSection;
