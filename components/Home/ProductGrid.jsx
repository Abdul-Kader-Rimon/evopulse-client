import React from "react";
import HeroSlider from "./HomeSlider";
import ProductCard from "./ProductCard";
 

const ProductGrid = () => {
  return (
    <div className=" p-4   flex items-center justify-center">
      {/* মেইন ৪ নম্বর প্যারেন্ট ডিভ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full  ">
        {/* ১ম বড় ডিভ (Slider Component) */}
        <HeroSlider />

        {/* ডান পাশের ২টি ডিভের কন্টেইনার */}
        <div className="flex flex-col gap-6 justify-between">
          {/* ২য় ডিভ: BambooBuds */}
          <ProductCard
            subTitle="New Arrivals"
            title="BAMBOOBUDS"
            bgClass="bg-gradient-to-r from-purple-500 to-pink-500"
            imgUrl="/path-to-earbuds-image.jpg"
            badgeColor="text-lime-300"
          />

          {/* ৩য় ডিভ: HomePod Pro */}
          <ProductCard
            subTitle="New Arrivals"
            title="HOMEPOD PRO"
            bgClass="bg-gradient-to-r from-slate-800 to-slate-950 border border-slate-700/50"
            imgUrl="/path-to-speaker-image.png"
            badgeColor="text-lime-400"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
