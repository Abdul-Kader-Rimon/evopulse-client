"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Revolutionize Your Workflow",
    description: "Streamline your tasks with our intuitive AI-driven dashboard.",
    color: "bg-indigo-600",
  },
  {
    id: 2,
    title: "Global Collaboration",
    description: "Connect with teams across the world in real-time without lag.",
    color: "bg-emerald-600",
  },
  {
    id: 3,
    title: "Secure by Design",
    description: "Enterprise-grade encryption for all your sensitive data.",
    color: "bg-rose-600",
  },
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    // Removed ": number" from the parameter below
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    // Removed ": number" from the parameter below
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const moveSlide = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[400px] overflow-hidden rounded-2xl shadow-2xl group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className={`absolute inset-0 flex flex-col items-center justify-center p-12 text-white ${slides[currentIndex].color}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {slides[currentIndex].title}
          </h2>
          <p className="text-lg md:text-xl text-white/80 text-center max-w-xl">
            {slides[currentIndex].description}
          </p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => moveSlide(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={() => moveSlide(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-8" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}