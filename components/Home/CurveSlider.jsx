"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  { id: 1, title: "TOKYO", img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1400", desc: "A SEAMLESS BLEND OF TRADITION AND FUTURISM. FROM CENTURIES-OLD TEMPLES TO NEON-LIT DISTRICTS." },
  { id: 2, title: "NYC", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1400", desc: "A CITY THAT MOVES AT FULL SPEED, ALL THE TIME. KNOWN AS A GLOBAL HUB FOR FINANCE AND MEDIA." },
  { id: 3, title: "PARIS", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1400", desc: "THE CITY OF LIGHT, WHERE HISTORY MEETS ROMANCE IN EVERY STREET CORNER AND CAFE." },
  { id: 4, title: "LONDON", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1400", desc: "A HISTORIC METROPOLIS WITH A MODERN HEART, ICONIC LANDMARKS, AND RICH CULTURE." },
];

export default function VideoExactCarousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  // --- Auto Sliding Logic ---
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // 5 Seconds Interval
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="relative h-screen w-full bg-[#0a0a0a] flex items-center overflow-hidden font-sans">
      
      {/* --- LEFT SIDE: THE CURVED IMAGE CAROUSEL --- */}
      <div className="relative w-[50%] h-full flex items-center">
        {/* Container adjusted to 75% visual size using scale */}
        <div className="absolute -left-[40%] w-[90vh] h-[100vh] rounded-full overflow-hidden border border-white/10 scale-[1.2]">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={index}
              initial={{ rotate: 60, opacity: 0, scale: 1.2 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -60, opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slides[index].img}
                alt={slides[index].title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a] z-10" />
      </div>

      {/* --- RIGHT SIDE: CONTENT --- */}
      <div className="relative z-20 w-[50%] pr-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Choto kora Title (text-9xl er jaygay text-8xl ba 9vw) */}
            <h1 className="text-[9vw] font-black leading-[0.8] text-white/90 tracking-tighter mb-4">
              {slides[index].title}
            </h1>
            
            <div className="max-w-sm border-l border-white/20 pl-6 ml-1">
              {/* Samanno choto kora description */}
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed tracking-[0.2em] uppercase mb-8">
                {slides[index].desc}
              </p>
              
              <button
                onClick={nextSlide}
                className="group flex items-center gap-4 text-white tracking-[0.3em] text-[10px] font-bold uppercase transition-all"
              >
                <span className="w-8 h-[1px] bg-white group-hover:w-12 transition-all" />
                Next Destination
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Background Numbering */}
      <div className="absolute top-10 right-10 text-white/5 text-[8vw] font-black select-none">
        0{index + 1}
      </div>
    </div>
  );
}