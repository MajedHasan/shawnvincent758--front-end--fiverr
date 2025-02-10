"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  Edit,
  Camera,
  ChevronRight,
  Star,
  Eye,
  ShoppingBag,
  Bell,
  Lock,
  Shield,
  CreditCard,
  HelpCircle,
  Trash2,
  MapPin,
} from "lucide-react";

const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-03-10",
    status: "processing",
    total: 89.97,
    items: [
      {
        id: 1,
        name: "Men's Casual Solid Color Long Sleeve Shirt",
        image:
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300",
        price: 29.99,
        quantity: 3,
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-03-05",
    status: "shipped",
    total: 45.98,
    items: [
      {
        id: 2,
        name: "Women's Summer Floral Dress",
        image:
          "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300",
        price: 45.98,
        quantity: 1,
      },
    ],
  },
];

const wishlistItems = [
  {
    id: 1,
    name: "Elegant Evening Dress",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300",
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    inStock: true,
  },
  {
    id: 2,
    name: "Casual Summer Set",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300",
    price: 59.99,
    inStock: false,
  },
];

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"
  );

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, New York, NY 10001",
    notifications: {
      orders: true,
      promotions: true,
      security: true,
    },
  });

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-yellow-100 text-yellow-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
              <label className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                <Camera size={16} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{`${profile.firstName} ${profile.lastName}`}</h1>
              <p className="text-gray-600">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "orders", label: "Orders", icon: Package },
              { id: "wishlist", label: "Wishlist", icon: Heart },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 relative ${
                  activeTab === tab.id ? "text-black" : "text-gray-500"
                }`}
              >
                <tab.icon size={20} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl"
            >
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Personal Information</h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 flex items-center gap-2"
                  >
                    <Edit size={16} />
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profile.firstName}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profile.lastName}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Address
                    </label>
                    <textarea
                      value={profile.address}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:border-black disabled:bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="p-6 border-b">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <p className="text-sm text-gray-500">
                            Placed on{" "}
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </div>

                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-sm font-medium">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 bg-gray-50 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Total:{" "}
                        <span className="font-medium text-black">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                      <button className="text-blue-600 text-sm hover:underline">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "wishlist" && (
            <motion.div
              key="wishlist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden group"
                  >
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all" />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <motion.button
                          className="p-2 rounded-full bg-white text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Eye size={20} />
                        </motion.button>
                        <motion.button
                          className="p-2 rounded-full bg-white text-red-500"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={20} />
                        </motion.button>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium mb-2">{item.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-semibold">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <>
                            <span className="text-sm text-gray-500 line-through">
                              ${item.originalPrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-red-500">
                              -{item.discount}%
                            </span>
                          </>
                        )}
                      </div>

                      <motion.button
                        className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 ${
                          item.inStock
                            ? "bg-black text-white hover:bg-gray-800"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                        whileHover={item.inStock ? { scale: 1.02 } : undefined}
                        whileTap={item.inStock ? { scale: 0.98 } : undefined}
                        disabled={!item.inStock}
                      >
                        <ShoppingBag size={20} />
                        {item.inStock ? "Add to Cart" : "Out of Stock"}
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl space-y-6"
            >
              {/* Notifications */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Notifications</h2>
                <div className="space-y-4">
                  {[
                    { id: "orders", label: "Order updates", icon: Package },
                    {
                      id: "promotions",
                      label: "Promotions and offers",
                      icon: Star,
                    },
                    { id: "security", label: "Security alerts", icon: Shield },
                  ].map((setting) => (
                    <label
                      key={setting.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <setting.icon size={20} className="text-gray-400" />
                        <span>{setting.label}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.notifications[setting.id]}
                        onChange={() => {}}
                        className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                <div className="space-y-4">
                  {[
                    { icon: Lock, label: "Change Password", action: "Update" },
                    {
                      icon: MapPin,
                      label: "Manage Addresses",
                      action: "Manage",
                    },
                    {
                      icon: CreditCard,
                      label: "Payment Methods",
                      action: "Manage",
                    },
                    {
                      icon: Bell,
                      label: "Communication Preferences",
                      action: "Configure",
                    },
                    {
                      icon: HelpCircle,
                      label: "Help & Support",
                      action: "View",
                    },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} className="text-gray-400" />
                        <span>{item.label}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <span className="text-sm mr-2">{item.action}</span>
                        <ChevronRight size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-red-100">
                <h2 className="text-xl font-bold text-red-600 mb-6">
                  Danger Zone
                </h2>
                <button className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors">
                  <LogOut size={20} />
                  <span>Delete Account</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;
