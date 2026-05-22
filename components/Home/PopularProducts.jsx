"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: "NeuralLink Headphones", price: 299, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=500", category: "Audio" },
  { id: 2, name: "Vortex Smartwatch", price: 199, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500", category: "Wearables" },
  { id: 3, name: "Omni Pro Keyboard", price: 150, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=500", category: "Accessories" },
  { id: 4, name: "Titan Gaming Mouse", price: 89, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=500", category: "Accessories" },
];

const PopularProducts = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Section Title Animation
    gsap.fromTo(
      ".section-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Cards Stagger Animation
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.9, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="section-title text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Popular Tech Picks
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Explore our most-wanted gadgets, designed for performance and style.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group relative bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100"
            >
              {/* Image Container */}
              <div className="relative h-64 w-full mb-6 overflow-hidden rounded-2xl bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                  {product.category}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                  <button className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors group/btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Background Glow Effect on Hover */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;