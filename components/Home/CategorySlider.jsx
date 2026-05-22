"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

const CategorySlider = () => {
  const [mustPlay, setMustPlay] = useState(true);

  const categories = [
    {
      id: 1,
      title: "Tablet",
      imgUrl:
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&auto=format&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Smartphone",
      imgUrl:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&auto=format&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Game Console",
      imgUrl:
        "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=200&auto=format&fit=crop&q=80",
    },
    {
      id: 4,
      title: "Camera",
      imgUrl:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&auto=format&fit=crop&q=80",
    },
    {
      id: 5,
      title: "Smartwatch",
      imgUrl:
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=200&auto=format&fit=crop&q=80",
    },
    {
      id: 6,
      title: "Drone & Flycam",
      imgUrl:
        "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=200&auto=format&fit=crop&q=80",
    },
    {
      id: 7,
      title: "Audio",
      imgUrl:
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&auto=format&fit=crop&q=80",
    },
    {
      id: 8,
      title: "Computer",
      imgUrl:
        "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=200&auto=format&fit=crop&q=80",
    },
  ];

  // লুপটি যেন ব্রেক না করে অবিরাম চলে, তাই ডেটা ট্রিপল করা হয়েছে
  const duplicatedCategories = [...categories, ...categories, ...categories];

  return (
    <div className="w-full   mx-auto px-4 py-8">
      {/* প্রিমিয়াম গ্রেডিয়েন্ট ব্যাকগ্রাউন্ড কন্টেইনার */}
      <div className="relative bg-gradient-to-tr from-indigo-100/60 via-purple-100/50 to-blue-50 border border-white rounded-[2.5rem]   shadow-2xl shadow-indigo-100/30 overflow-hidden">
        <div className="w-full overflow-hidden flex items-center relative py-4">
          {/* দুই পাশের ফেডিং শ্যাডো যাতে কার্ডগুলো সাইড থেকে স্মুথলি ভ্যানিশ হয় */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-indigo-100/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-blue-50/50 to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-10 md:gap-14"
            // একমুখী কন্টিনিউয়াস স্লাইড অ্যানিমেশন
            animate={mustPlay ? { x: ["0%", "-33.33%"] } : {}}
            transition={{
              ease: "linear",
              duration: 22, // স্লাইড হওয়ার গতি নিয়ন্ত্রণ করার জন্য (সেকেন্ড)
              repeat: Infinity,
            }}
            onMouseEnter={() => setMustPlay(false)} // মাউস কার্ডের ওপর আনলে স্লাইড থামবে
            onMouseLeave={() => setMustPlay(true)} // মাউস সরালে আবার স্লাইড শুরু হবে
          >
            {duplicatedCategories.map((category, index) => (
              <CategoryCard
                key={`${category.id}-${index}`}
                title={category.title}
                imgUrl={category.imgUrl}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
