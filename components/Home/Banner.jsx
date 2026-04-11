"use client";

import Link from "next/link";
import { MoveRight, ShoppingBag, Zap, ShieldCheck } from "lucide-react"; // React Icons/Lucide icons ব্যবহার করা হচ্ছে
import Image from "next/image"; // Next.js Image Component

export default function HomeBanner() {
  return (
    <div className="relative bg-[#f8fafc] overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-[20%] left-[10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Area */}
          <div className="md:col-span-7 space-y-8 text-center md:text-left">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Zap size={14} className="animate-pulse" />
                The Future of Shopping is Here
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
                Experience Smart Commerce with <span className="text-indigo-600 relative inline-block">EvoPulse<span className="absolute -bottom-2 left-0 w-full h-1 bg-indigo-600 rounded-full"></span></span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto md:mx-0">
                Elevate your shopping journey with AI-driven recommendations, seamless checkout, and premium products delivered to your doorstep.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                href="/shop" 
                className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95 group"
              >
                Shop Now
                <MoveRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-gray-900 font-bold rounded-2xl border border-gray-200 shadow-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-6 justify-center md:justify-start text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-indigo-500" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-indigo-500" />
                <span>Genuine Products</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={20} className="text-indigo-500" />
                <span>Express Delivery</span>
              </div>
            </div>
          </div>

          {/* Image / Illustration Area */}
          <div className="md:col-span-5 relative flex justify-center items-center group">
            <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px]">
              {/* Decorative rings and elements */}
              <div className="absolute inset-0 bg-white rounded-full shadow-2xl shadow-indigo-100 opacity-90 transition-transform group-hover:scale-105" />
              <div className="absolute -top-[10%] -right-[10%] w-[30%] h-[30%] bg-indigo-600/10 rounded-full blur-xl" />
              <div className="absolute -bottom-[10%] -left-[10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-xl" />
              
              {/* Product Illustration Placeholder - Replace with your own image */}
              <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                  {/* Option 1: Using a placeholder */}
                  {/* <ShoppingBag size={120} className="text-indigo-400 opacity-40" strokeWidth={1}/> */}
                  
                  {/* Option 2: Using a real Image (Recommended) */}
                  <Image 
                    src="/brand/evopulse.jpeg" // Replace with your image path (e.g., a 3D e-commerce scene)
                    alt="E-commerce Experience" 
                    width={450} 
                    height={450}
                    className="object-contain" // ensure the image doesn't get stretched
                  />
                  
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}