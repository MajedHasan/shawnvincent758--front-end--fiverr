"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  Info,
  Truck,
  Package,
  Shield,
  ArrowLeft,
  Copy,
  Ruler,
  Clock,
  ShoppingBag,
  Eye,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/store/productCartSlice";

const productImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
    alt: "Blue shirt front view",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800",
    alt: "Model wearing blue shirt",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800",
    alt: "Casual style showcase",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1624206112918-f140f087f9b5?w=800",
    alt: "Fabric detail",
  },
];

const sizeGuideData = [
  { size: "S", chest: 96, length: 68, shoulder: 42 },
  { size: "M", chest: 100, length: 70, shoulder: 44 },
  { size: "L", chest: 104, length: 72, shoulder: 46 },
  { size: "XL", chest: 108, length: 74, shoulder: 48 },
  { size: "2XL", chest: 112, length: 76, shoulder: 50 },
];

const reviews = [
  {
    id: 1,
    user: "John D.",
    rating: 5,
    date: "2024-01-27",
    comment:
      "Perfect fit and great quality material. Very comfortable for daily wear.",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300",
    ],
  },
];

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [countdown, setCountdown] = useState({
    hours: 4,
    minutes: 59,
    seconds: 59,
  });
  const [showZoomModal, setShowZoomModal] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const dispatch = useDispatch();

  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`http://localhost:5001/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        setSelectedImage(data?.images[0]);
      }
    };
    getProduct();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Live viewers count simulation
  const [liveViewers, setLiveViewers] = useState(142);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers((prev) => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleImageZoom = (e) => {
    if (!showZoomModal) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    dispatch(addToCart(products));
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const handleCopySKU = async () => {
    try {
      await navigator.clipboard.writeText("sm24102337171159092");
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy SKU:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <button className="flex items-center text-sm text-gray-600 hover:text-black">
            <ArrowLeft size={20} className="mr-2" />
            Back to Shop
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square bg-white rounded-lg overflow-hidden cursor-zoom-in"
              onClick={() => setShowZoomModal(true)}
              onMouseMove={handleImageZoom}
            >
              <img
                src={`http://localhost:5001/uploads/product/img/${selectedImage}`}
                alt={selectedImage}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  className={`p-2 rounded-full ${
                    isWishlisted
                      ? "bg-red-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsWishlisted(!isWishlisted);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    size={20}
                    className={isWishlisted ? "fill-current" : ""}
                  />
                </motion.button>
                <motion.button
                  className="p-2 rounded-full bg-white text-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowShareModal(true);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Share2 size={20} />
                </motion.button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {products?.images?.map((image) => (
                <motion.button
                  key={image}
                  className={`relative aspect-square rounded-lg overflow-hidden ${
                    selectedImage === image ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => setSelectedImage(image)}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src={`http://localhost:5001/uploads/product/img/${image}`}
                    alt={image}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Product Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{products?.name}</h1>
              {/* <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">5.0</span>
                  <span className="ml-1 text-gray-500">(1 Review)</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex items-center text-green-600">
                  <Eye size={20} className="mr-1" />
                  <span>{liveViewers} viewing</span>
                </div>
              </div> */}
            </div>

            {/* Price and Promotion */}
            <div className="space-y-4">
              <div className="flex items-end gap-4">
                <span className="text-4xl font-bold">${products?.price}</span>
                {/* <span className="text-xl text-gray-500 line-through">
                  $35.00
                </span>
                <span className="text-red-500 font-medium">-20%</span> */}
              </div>

              {/* <div className="flex items-center gap-2 text-red-500">
                <Clock size={20} />
                <span className="font-medium">Flash Sale Ends In:</span>
                <div className="flex items-center gap-1">
                  <span className="bg-black text-white px-2 py-1 rounded">
                    {String(countdown.hours).padStart(2, "0")}
                  </span>
                  :
                  <span className="bg-black text-white px-2 py-1 rounded">
                    {String(countdown.minutes).padStart(2, "0")}
                  </span>
                  :
                  <span className="bg-black text-white px-2 py-1 rounded">
                    {String(countdown.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div> */}
            </div>

            {/* Size Selection */}
            <div>
              {/* <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Size</h3>
                <button
                  className="text-sm text-blue-600 flex items-center"
                  onClick={() => setShowSizeGuide(true)}
                >
                  <Ruler size={16} className="mr-1" />
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizeGuideData.map((size) => (
                  <motion.button
                    key={size.size}
                    className={`py-3 rounded-lg border-2 transition-colors ${
                      selectedSize === size.size
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size.size)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {size.size}
                  </motion.button>
                ))}
              </div> */}
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-gray-300"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-4">
              <motion.button
                className="flex-1 bg-black text-white py-4 rounded-lg flex items-center justify-center gap-2"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag size={20} />
                Add to Cart
              </motion.button>
              <motion.button
                className="w-14 h-14 flex items-center justify-center border-2 border-gray-200 rounded-lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart
                  size={24}
                  className={isWishlisted ? "text-red-500 fill-current" : ""}
                />
              </motion.button>
            </div>

            {/* Product Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="text-blue-500" size={24} />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-500">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Shield className="text-green-500" size={24} />
                <div>
                  <h4 className="font-medium">Secure Payment</h4>
                  <p className="text-sm text-gray-500">100% secure payment</p>
                </div>
              </div>
            </div>

            {/* SKU */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>SKU: sm24102337171159092</span>
              <button
                className="flex items-center text-blue-600 hover:text-blue-700"
                onClick={handleCopySKU}
              >
                <Copy size={14} className="mr-1" />
                Copy
              </button>
            </div>

            {/* Shipping Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="text-gray-400" size={20} />
                <div>
                  <h4 className="font-medium">Delivery</h4>
                  <p className="text-sm text-gray-500">
                    Free shipping does not apply to this item.
                    <br />
                    Estimated to be delivered on 02/05/2025 - 02/17/2025.
                  </p>
                </div>
                <Info className="text-gray-400 ml-auto" size={20} />
              </div>

              <div className="flex items-center gap-3">
                <Package className="text-gray-400" size={20} />
                <div>
                  <h4 className="font-medium">Return Policy</h4>
                  <button className="text-sm text-blue-600">Learn More</button>
                </div>
                <Info className="text-gray-400 ml-auto" size={20} />
              </div>

              <div className="flex items-center gap-3">
                <Shield className="text-gray-400" size={20} />
                <div>
                  <h4 className="font-medium">Shopping Security</h4>
                  <div className="text-sm text-gray-500">
                    ✓ Safe Payments ✓ Secure Logistics ✓ Customer Service
                  </div>
                </div>
                <Info className="text-gray-400 ml-auto" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b">
            <div className="container mx-auto px-4">
              <div className="flex gap-8">
                {/* {["description", "size", "reviews", "store"].map((tab) => ( */}
                {["description"].map((tab) => (
                  <button
                    key={tab}
                    className={`py-4 px-2 font-medium capitalize relative ${
                      activeTab === tab ? "text-black" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                        layoutId="activeTab"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold mb-4">Product Details</h3>
                    {/* <p>
                      Experience comfort and style with our casual solid color
                      long sleeve shirt. Made from premium materials, this
                      versatile piece is perfect for any occasion.
                    </p>
                    <ul className="list-disc pl-4 mt-4 space-y-2">
                      <li>Material: 100% Cotton</li>
                      <li>Style: Casual</li>
                      <li>Sleeve Length: Long Sleeve</li>
                      <li>Collar: Stand Collar</li>
                      <li>Pattern: Solid</li>
                    </ul> */}
                    {products?.description}
                  </div>
                </motion.div>
              )}

              {/* {activeTab === "size" && (
                <motion.div
                  key="size"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Size</th>
                          <th className="px-4 py-2 text-left">Chest (cm)</th>
                          <th className="px-4 py-2 text-left">Length (cm)</th>
                          <th className="px-4 py-2 text-left">Shoulder (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeGuideData.map((size) => (
                          <tr key={size.size} className="border-b">
                            <td className="px-4 py-2">{size.size}</td>
                            <td className="px-4 py-2">{size.chest}</td>
                            <td className="px-4 py-2">{size.length}</td>
                            <td className="px-4 py-2">{size.shoulder}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )} */}

              {/* {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-8">
                    <div>
                      <div className="text-5xl font-bold">5.0</div>
                      <div className="flex items-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Based on 1 review
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {rating} stars
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{
                                  width: rating === 5 ? "100%" : "0%",
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-500">
                              {rating === 5 ? "1" : "0"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="font-medium">{review.user}</div>
                            <div className="flex items-center mt-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 text-yellow-400 fill-current"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{review.comment}</p>
                        {review.images && (
                          <div className="flex gap-2">
                            {review.images.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Review ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )} */}

              {/* {activeTab === "store" && (
                <motion.div
                  key="store"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100"
                      alt="Store"
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold">Manfinity RSRT</h3>
                      <button className="text-sm text-blue-600">
                        View Store
                      </button>
                    </div>
                    <button className="ml-auto px-6 py-2 bg-black text-white rounded-lg">
                      Follow
                    </button>
                  </div>
                </motion.div>
              )} */}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowSizeGuide(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Size Guide</h3>
                  <button onClick={() => setShowSizeGuide(false)}>
                    <X size={24} />
                  </button>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-left">Size</th>
                      <th className="px-4 py-2 text-left">Chest (cm)</th>
                      <th className="px-4 py-2 text-left">Length (cm)</th>
                      <th className="px-4 py-2 text-left">Shoulder (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuideData.map((size) => (
                      <tr key={size.size} className="border-b">
                        <td className="px-4 py-2">{size.size}</td>
                        <td className="px-4 py-2">{size.chest}</td>
                        <td className="px-4 py-2">{size.length}</td>
                        <td className="px-4 py-2">{size.shoulder}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Share this product</h3>
              <div className="grid grid-cols-4 gap-4">
                {["Facebook", "Twitter", "Pinterest", "Email"].map(
                  (platform) => (
                    <button
                      key={platform}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Share2 size={20} />
                      </div>
                      <span className="text-sm">{platform}</span>
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Added to Cart Notification */}
      <AnimatePresence>
        {showAddedToCart && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50"
          >
            Added to cart successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;
