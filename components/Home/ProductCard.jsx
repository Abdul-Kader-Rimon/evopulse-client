import React from "react";

const ProductCard = ({
  subTitle,
  title,
  bgClass,
  imgUrl,
  badgeColor = "text-lime-300",
}) => {
  return (
    <div
      className={`relative ${bgClass} rounded-2xl p-6 flex flex-col justify-between overflow-hidden h-[300px]`}
    >
      <div className="z-10">
        <span className={`text-xs font-semibold uppercase ${badgeColor}`}>
          {subTitle}
        </span>
        <h3 className="text-xl font-bold text-white mt-1 mb-4">{title}</h3>
        <a
          href="#"
          className="text-white text-sm font-medium inline-flex items-center gap-1 hover:underline"
        >
          Shop Now &rarr;
        </a>
      </div>

      {/* background image */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imgUrl})` }}
      />
    </div>
  );
};

export default ProductCard;
