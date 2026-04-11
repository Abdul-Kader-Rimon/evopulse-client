"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
// React Icons থেকে স্টাইলিশ আইকন ইম্পোর্ট
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export default function Footer({ isAuthenticated = false }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const year = new Date().getFullYear();

  // Hydration Error এড়ানোর জন্য
  if (!mounted) return null;

  return (
    <footer className="bg-[#0f172a] text-gray-400 pt-16 pb-8 mt-auto w-full border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Social */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                E
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                EvoPulse
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Experience the future of smart commerce with EvoPulse. High-quality products, delivered to your doorstep.
            </p>
            <div className="flex items-center gap-3">
              <SocialLink href="#" icon={<FaFacebookF />} color="hover:bg-blue-600" />
              <SocialLink href="#" icon={<FaTwitter />} color="hover:bg-sky-500" />
              <SocialLink href="#" icon={<FaInstagram />} color="hover:bg-pink-600" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-indigo-400 transition-colors">Products</Link></li>
              <li>
                <Link href={isAuthenticated ? "/dashboard" : "/register"} className="hover:text-indigo-400 transition-colors">
                  {isAuthenticated ? "User Dashboard" : "Create Account"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Support</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/faq" className="hover:text-indigo-400 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-widest">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-indigo-500 mt-1" />
                <span>123 Smart Way, Digital Tower, Dhaka</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-indigo-500" />
                <span>support@evopulse.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-indigo-500" />
                <span>+880 1700 000000</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide">
          <p>&copy; {year} EvoPulse. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="px-2 py-1 border border-gray-700 rounded text-gray-500 font-bold">VISA</span>
            <span className="px-2 py-1 border border-gray-700 rounded text-gray-500 font-bold">MASTERCARD</span>
            <span className="px-2 py-1 border border-gray-700 rounded text-gray-500 font-bold">BKASH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Social Icon Component for better design
function SocialLink({ href, icon, color }) {
  return (
    <Link 
      href={href} 
      className={`w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-white transition-all duration-300 ${color}`}
    >
      {icon}
    </Link>
  );
}