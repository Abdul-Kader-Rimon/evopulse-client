"use client";

import React from "react";
import { motion } from "framer-motion";

const CategoryCard = ({ title, imgUrl }) => {
  return (
    <div className="flex flex-col items-center cursor-pointer shrink-0 py-8 group">
      {/* মূল ৩D অবজেক্ট এরিয়া */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center mb-6 select-none">
        {/* ১. পিছনের গ্লসি ৩D ডোম (অর্ধবৃত্তাকার ক্রিস্টাল গ্লাস ইফেক্ট) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-transparent backdrop-blur-[2px] rounded-t-full rounded-b-[45%] shadow-[inset_0_4px_12px_rgba(255,255,255,0.9),_0_8px_20px_rgba(0,0,0,0.04)] border border-white/60 transform group-hover:scale-105 group-hover:from-white/90 transition-all duration-500" />

        {/* ২. পোডিয়ামের উপরের প্রথম ৩D লেয়ার (স্ট্যান্ডের উপরিভাগ) */}
        <div className="absolute bottom-[-2px] w-[84%] h-7 bg-gradient-to-b from-white to-slate-200 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.8),_0_4px_8px_rgba(0,0,0,0.06)] border-b border-slate-300/80 z-10" />

        {/* ৩. পোডিয়ামের মাঝের দ্বিতীয় ৩D লেয়ার */}
        <div className="absolute bottom-[-10px] w-[92%] h-7 bg-gradient-to-b from-slate-100 to-slate-300/90 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.05)] border-b-2 border-slate-400/60 z-10" />

        {/* ৪. পোডিয়ামের নিচের মূল বেস লেয়ার (সবচেয়ে বড় ৩D রিং) */}
        <div className="absolute bottom-[-18px] w-[100%] h-7 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.08),_0_1px_3px_rgba(0,0,0,0.05)] border-b-2 border-slate-300 z-10" />

        {/* ৫. প্রোডাক্টের শ্যাডো/ছায়া (পোডিয়ামের উপর বাস্তবসম্মত লুক দেওয়ার জন্য) */}
        <div className="absolute bottom-2 w-[55%] h-3 bg-black/15 rounded-full blur-[3px] z-10 group-hover:scale-90 transition-transform duration-500" />

        {/* ৬. বাস্তব প্রোডাক্ট ইমেজ (স্মুথ ফ্লোটিং এবং হোভার অ্যানিমেশনসহ) */}
        <motion.img
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.12, y: -10 }}
          src={imgUrl}
          alt={title}
          className="w-[68%] h-[68%] object-contain z-20 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.12)] transition-all duration-500"
        />
      </div>

      {/* টেক্সট ডিজাইন */}
      <span className="text-xs sm:text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors duration-300 text-center tracking-wide mt-3">
        {title}
      </span>
    </div>
  );
};

export default CategoryCard;
