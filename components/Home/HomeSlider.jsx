import React from "react";

const HeroSlider = () => {
  return (
    <div className="lg:col-span-2 relative bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl p-8 lg:p-12 flex flex-col justify-between overflow-hidden min-h-[600px]">
      {/* text content */}
      <div className="z-10 max-w-xs">
        <span className="text-xs font-semibold tracking-wider text-blue-100 uppercase">
          Gaming Gear
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mt-2 mb-1">
          GAME CONTROLLER
        </h2>
        <p className="text-sm text-blue-100 mb-6">
          Controller Type: Wireless Controller
        </p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-2.5 rounded-md hover:bg-blue-50 transition duration-300 shadow-md">
          SHOP NOW
        </button>
      </div>

      {/* image placeholder */}
      <div className="absolute inset-0 flex items-center justify-end p-4 pointer-events-none">
        <div
          className="w-1/2 h-full bg-contain bg-center bg-no-repeat opacity-90"
          style={{
            backgroundImage: "url('/path-to-your-controller-image.png')",
          }}
        />
      </div>

      {/* slider controls */}
      <div className="mt-8 flex items-center gap-4 z-10">
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm">
          <button className="hover:opacity-70">&lt;</button>
          <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
          <button className="hover:opacity-70">&gt;</button>
        </div>
        <button className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full text-white text-sm hover:bg-white/30">
          ⏸
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
