import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Apple,
  CreditCard,
  Mail,
} from "lucide-react";

const Footer = () => {
  const links = [
    { title: "About", items: ["About SHEIN", "Careers", "Blog"] },
    {
      title: "Help",
      items: ["Shipping", "Returns", "Track Order", "Size Guide"],
    },
    {
      title: "Legal",
      items: ["Privacy Policy", "Terms of Use", "Cookie Policy"],
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Instagram, label: "Instagram" },
    { icon: Twitter, label: "Twitter" },
    { icon: Youtube, label: "Youtube" },
    { icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-white border-t">
      {/* Newsletter Section */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto text-center">
            <Mail className="w-8 h-8 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Stay in the loop</h3>
            <p className="text-gray-600 mb-6">
              Subscribe for exclusive offers, style updates, and more
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Links */}
          {links.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-bold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-black transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Download App */}
          <div>
            <h3 className="font-bold mb-4">Get the App</h3>
            <div className="space-y-3">
              <button className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <Apple size={20} />
                App Store
              </button>
              <button className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  fill="none"
                >
                  <path d="M3 3h18v18H3z" />
                  <path d="M17 7l-5 5-5-5" />
                </svg>
                Play Store
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mt-12 mb-8">
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <a
                key={idx}
                href="#"
                className="text-gray-400 hover:text-black transition-colors"
                aria-label={social.label}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>

        {/* Payment Info */}
        <div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
          <CreditCard size={20} />
          <span className="text-sm">
            Secure payment with major credit cards
          </span>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
          <p>©2009-2025 SHEIN All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
