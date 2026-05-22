"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaVimeoV,
  FaPinterestP,
  FaChevronUp,
} from "react-icons/fa";
// Custom X (formerly Twitter) and Instagram icons to closely match the image
import { RiTwitterXFill } from "react-icons/ri";
import { FiInstagram } from "react-icons/fi";

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <footer className="bg-[#050b14] text-[#8a94a6] text-[14px] font-sans w-full">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-14 pb-8">
        {/* TOP SECTION: Social, Payments, Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 pb-10 border-b border-gray-800/60">
          {/* Follow Us */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm">Follow Us:</h4>
            <div className="flex items-center gap-2">
              <SocialLink href="#" icon={<FaFacebookF size={14} />} />
              <SocialLink href="#" icon={<FaVimeoV size={14} />} />
              <SocialLink href="#" icon={<FaPinterestP size={14} />} />
              <SocialLink href="#" icon={<RiTwitterXFill size={14} />} />
              <SocialLink href="#" icon={<FiInstagram size={14} />} />
            </div>
          </div>

          {/* We Accept */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm">We Accept:</h4>
            <div className="flex flex-wrap items-center gap-2">
              {/* Payment Gateways */}
              <div className="bg-[#1a2232] px-3 py-2 rounded flex items-center justify-center h-9 w-16">
                <span className="text-[#00579f] font-black italic text-sm tracking-tighter">
                  VISA
                </span>
              </div>
              <div className="bg-white px-3 py-2 rounded flex items-center justify-center h-9 w-16">
                <span className="text-[#003087] font-black italic text-xs">
                  PayPal
                </span>
              </div>
              <div className="bg-[#1a2232] px-3 py-2 rounded flex items-center justify-center h-9 w-16">
                <span className="text-[#007bc4] font-bold text-[10px] uppercase leading-none text-center">
                  American Express
                </span>
              </div>
              <div className="bg-[#22301c] px-3 py-2 rounded flex items-center justify-center h-9 w-16">
                <span className="text-[#a4c539] font-extrabold text-sm">
                  Pay<span className="text-white">U</span>
                </span>
              </div>
              <div className="bg-white px-3 py-2 rounded flex items-center justify-center h-9 w-16">
                <span className="text-[#194b8c] font-black italic text-[11px]">
                  RuPay<span className="text-orange-500">▸</span>
                </span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 w-full max-w-md">
            <h4 className="text-white font-bold text-sm">
              Subscribe to Our Newsletter
            </h4>
            <form className="flex w-full bg-white rounded overflow-hidden">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL"
                className="w-full bg-white text-gray-800 text-xs px-4 py-3 outline-none uppercase placeholder-gray-400 font-medium"
              />
              <button
                type="submit"
                className="bg-white text-black font-bold text-xs px-6 py-3 border-l border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* MIDDLE SECTION: Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-14">
          {/* Customer Care */}
          <div>
            <h3 className="text-white font-bold mb-5 text-[15px] uppercase tracking-wide">
              Customer Care
            </h3>
            <ul className="space-y-[10px]">
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/gift-card"
                  className="hover:text-white transition-colors"
                >
                  Gift Card
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-white font-bold mb-5 text-[15px] uppercase tracking-wide">
              Help & Support
            </h3>
            <ul className="space-y-[10px]">
              <li>
                <Link
                  href="/shipping-info"
                  className="hover:text-white transition-colors"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-white transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-order"
                  className="hover:text-white transition-colors"
                >
                  How To Order
                </Link>
              </li>
              <li>
                <Link
                  href="/how-to-track"
                  className="hover:text-white transition-colors"
                >
                  How To Track
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="hover:text-white transition-colors"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold mb-5 text-[15px] uppercase tracking-wide">
              Company Info
            </h3>
            <ul className="space-y-[10px]">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-white transition-colors"
                >
                  Our Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/store-locations"
                  className="hover:text-white transition-colors"
                >
                  Store Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonial"
                  className="hover:text-white transition-colors"
                >
                  Testimonial
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Shop */}
          <div>
            <h3 className="text-white font-bold mb-5 text-[15px] uppercase tracking-wide">
              Our Shop
            </h3>
            <ul className="space-y-[10px]">
              <li>
                <Link
                  href="/shop/gaming-gear"
                  className="hover:text-white transition-colors"
                >
                  Gaming Gear
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/electronics"
                  className="hover:text-white transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/home-appliance"
                  className="hover:text-white transition-colors"
                >
                  Home Appliance
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/audio"
                  className="hover:text-white transition-colors"
                >
                  Audio
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/smartphone"
                  className="hover:text-white transition-colors"
                >
                  Smartphone
                </Link>
              </li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-white font-bold mb-5 text-[15px] uppercase tracking-wide">
              My Account
            </h3>
            <ul className="space-y-[10px]">
              <li>
                <Link
                  href="/login"
                  className="hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-white transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="hover:text-white transition-colors"
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Link
                  href="/track-orders"
                  className="hover:text-white transition-colors"
                >
                  Track Your Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/checkout"
                  className="hover:text-white transition-colors"
                >
                  Checkout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright, Address, Contact & Scroll to Top */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col md:flex-row justify-between items-center gap-6 relative">
          {/* Copyright text */}
          <div className="text-left w-full md:w-auto">
            <p>Copyright &copy; 2024 RisingBamboo.</p>
            <p>All Rights Reserved.</p>
          </div>

          {/* Store Location */}
          <div className="flex items-start gap-3 w-full md:w-auto md:justify-center">
            <svg
              className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <h5 className="text-white font-bold">Store Location :</h5>
              <p className="text-gray-400 text-sm mt-0.5">
                15 West 21th Street, Miami FL, USA
              </p>
            </div>
          </div>

          {/* Call Us & Email */}
          <div className="flex items-start gap-3 w-full md:w-auto md:justify-end pr-12">
            {/* Custom 24/7 Support Icon */}
            <div className="w-9 h-9 border border-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-green-500 font-bold text-[11px] leading-none">
              24
            </div>
            <div>
              <h5 className="text-white font-bold">
                Call Us Now{" "}
                <span className="text-[#2b85e4] ml-1">+123-456-789</span>
              </h5>
              <p className="text-gray-400 text-sm mt-0.5">
                Email:{" "}
                <span className="hover:text-white cursor-pointer">
                  info@example.com
                </span>
              </p>
            </div>
          </div>

          {/* Scroll to top floating button */}
          <button
            onClick={scrollToTop}
            className="absolute right-0 bottom-1 bg-white text-gray-900 p-2.5 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Scroll to top"
          >
            <FaChevronUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

// Social icon layout with uniform thin border boxes
function SocialLink({ href, icon }) {
  return (
    <Link
      href={href}
      className="w-9 h-9 border border-gray-800 rounded flex items-center justify-center text-[#8a94a6] hover:text-white hover:border-gray-600 transition-all duration-200"
    >
      {icon}
    </Link>
  );
}
