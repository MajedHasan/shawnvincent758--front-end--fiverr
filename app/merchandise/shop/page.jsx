"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Plus,
  ShoppingCart,
  Heart,
  Star,
  Sparkles,
  Tag,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Search,
  Sliders,
  ArrowUpDown,
  Eye,
  Share2,
  Percent,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Manfinity ModaGents Men's Woven Short Sleeve Shirt",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500",
    price: 23.0,
    category: "Shirts",
    rating: 4.8,
    reviews: 245,
    colors: ["#FFFFFF", "#000000", "#B8C4CC"],
    size: ["S", "M", "L", "XL"],
    description:
      "Classic woven short sleeve shirt perfect for any occasion. Features a comfortable fit and breathable fabric.",
  },
  {
    id: 2,
    name: "Manfinity RSRT Men's Casual Solid Color Long Sleeve Shirt",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
    price: 28.0,
    category: "Shirts",
    rating: 4.7,
    reviews: 189,
    bestSeller: true,
    colors: ["#87CEEB", "#FFFFFF", "#FFB6C1"],
    size: ["M", "L", "XL"],
    description:
      "Versatile long sleeve shirt in solid colors. Perfect for both casual and semi-formal occasions.",
  },
  {
    id: 3,
    name: "Manfinity RSRT 2pcs/Set Men Solid Front Button Up Shirt",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500",
    price: 30.0,
    originalPrice: 45.0,
    discount: 33,
    category: "Sets",
    rating: 4.9,
    reviews: 567,
    colors: ["#B8C4CC", "#000000", "#87CEEB"],
    size: ["S", "M", "L"],
    description:
      "Complete set featuring a button-up shirt and matching pants. Made from premium materials for lasting comfort.",
  },
  {
    id: 4,
    name: "SHEIN Baby Girl Colorblock Striped Print Button Front Dress",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500",
    price: 10.0,
    category: "Kids",
    rating: 4.6,
    reviews: 123,
    bestSeller: true,
    colors: ["#FFB6C1", "#FFFFFF"],
    size: ["2T", "3T", "4T"],
    description:
      "Adorable striped dress for little girls. Features easy-to-use buttons and comfortable fabric.",
  },
];

const QuickViewModal = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || null
  );
  const [selectedSize, setSelectedSize] = useState(product.size?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                -{product.discount}% OFF
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>

            <div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="ml-1 text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>
              {product.bestSeller && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                  Best Seller
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {product.colors && (
              <div>
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? "border-black scale-110"
                          : "border-gray-200"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.size && (
              <div>
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md border-2 transition-all ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800">
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="w-12 h-12 flex items-center justify-center border-2 border-gray-200 rounded-lg hover:border-gray-300">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ y: -4 }}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Percent size={12} className="mr-1" />
              {product.discount}% OFF
            </span>
          )}
          {product.bestSeller && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <Star size={12} className="mr-1" />
              Best Seller
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <motion.button
            className={`p-2 rounded-full transition-colors ${
              isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-800"
            }`}
            onClick={() => setIsWishlisted(!isWishlisted)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
          </motion.button>
          <motion.button
            className="p-2 rounded-full bg-white text-gray-800"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 size={20} />
          </motion.button>
        </div>

        {/* Quick View Button */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2"
              onClick={() => onQuickView(product)}
            >
              <Eye size={20} />
              Quick View
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center text-yellow-400">
            <Star size={16} className="fill-current" />
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="text-sm text-red-500">-{product.discount}%</span>
            </>
          )}
        </div>

        {/* Color Options */}
        {product.colors && (
          <div className="flex gap-1 mt-2">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        {/* Add to Cart Button */}
        <motion.button
          className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingCart size={20} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

const FilterSection = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-gray-200 py-4">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left"
    >
      <span className="text-sm font-medium text-gray-900">{title}</span>
      <Plus
        size={16}
        className={`transform transition-transform ${
          isOpen ? "rotate-45" : ""
        }`}
      />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden pt-4"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const ShopPage = () => {
  const [openFilter, setOpenFilter] = useState(null);
  const [sortBy, setSortBy] = useState("recommend");
  const [showFilters, setShowFilters] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const toggleFilter = (filter) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 text-sm font-medium"
            >
              <Filter size={20} />
              Filter
            </button>

            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-8 py-1 text-sm font-medium focus:outline-none"
                >
                  <option value="recommend">Recommend</option>
                  <option value="newest">Newest</option>
                  <option value="trending">Trending</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-6">Filters</h2>
              <div className="space-y-6">
                <FilterSection
                  title="Category"
                  isOpen={openFilter === "category"}
                  onToggle={() => toggleFilter("category")}
                >
                  <div className="space-y-2">
                    {["All", "Shirts", "Sets", "Kids"].map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Size"
                  isOpen={openFilter === "size"}
                  onToggle={() => toggleFilter("size")}
                >
                  <div className="grid grid-cols-3 gap-2">
                    {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                      <button
                        key={size}
                        className="px-3 py-2 border rounded-md text-sm hover:border-black"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Color"
                  isOpen={openFilter === "color"}
                  onToggle={() => toggleFilter("color")}
                >
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      "#000000",
                      "#FFFFFF",
                      "#FF0000",
                      "#00FF00",
                      "#0000FF",
                      "#FFFF00",
                    ].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Price Range"
                  isOpen={openFilter === "price"}
                  onToggle={() => toggleFilter("price")}
                >
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded-lg">
                      Apply
                    </button>
                  </div>
                </FilterSection>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-4 border-b sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Filter</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <FilterSection
                  title="Category"
                  isOpen={openFilter === "category"}
                  onToggle={() => toggleFilter("category")}
                >
                  <div className="space-y-2">
                    {["All", "Shirts", "Sets", "Kids"].map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="ml-2 text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Size"
                  isOpen={openFilter === "size"}
                  onToggle={() => toggleFilter("size")}
                >
                  <div className="grid grid-cols-4 gap-2">
                    {["S", "M", "L", "XL", "2XL", "3XL"].map((size) => (
                      <button
                        key={size}
                        className="px-3 py-2 border rounded-md text-sm hover:border-black"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Color"
                  isOpen={openFilter === "color"}
                  onToggle={() => toggleFilter("color")}
                >
                  <div className="grid grid-cols-6 gap-2">
                    {[
                      "#000000",
                      "#FFFFFF",
                      "#FF0000",
                      "#00FF00",
                      "#0000FF",
                      "#FFFF00",
                    ].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full border-2 border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </FilterSection>

                <FilterSection
                  title="Price Range"
                  isOpen={openFilter === "price"}
                  onToggle={() => toggleFilter("price")}
                >
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <button className="w-full bg-black text-white py-2 rounded-lg">
                      Apply
                    </button>
                  </div>
                </FilterSection>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopPage;
