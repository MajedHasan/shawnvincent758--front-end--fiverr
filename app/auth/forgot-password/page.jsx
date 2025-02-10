"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, AlertCircle, Check } from "lucide-react";

const ForgotPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Back to Login */}
        <div className="mb-8">
          <button className="flex items-center text-sm text-gray-600 hover:text-black transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to login
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Reset password</h2>
          <p className="mt-2 text-gray-600">
            Enter your email address and we'll send you instructions to reset
            your password
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email"
                />
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-500 flex items-center"
                >
                  <AlertCircle size={16} className="mr-1" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                "Send reset instructions"
              )}
            </motion.button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check size={32} className="text-green-500" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Check your email</h3>
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to
              <br />
              <span className="font-medium text-black">{formData.email}</span>
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-sm text-blue-600 hover:underline"
            >
              Try another email address
            </button>
          </motion.div>
        )}

        <div className="mt-8 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
