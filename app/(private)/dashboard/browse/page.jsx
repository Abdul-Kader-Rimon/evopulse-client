"use client";
import React from "react";
import { 
  ArrowUpRight, 
  MoreVertical, 
  MessageSquare, 
  Star, 
  Edit3, 
  TrendingUp, 
  Package, 
  Eye 
} from "lucide-react";
import Link from "next/link";

export default function Browse() {
  // ডামি ডাটা (পরবর্তীতে এপিআই থেকে আসবে)
  const trendingProducts = [
    {
      id: 1,
      name: "Wireless Noise Cancelling Headphones",
      category: "Electronics",
      price: "$299.00",
      sales: "+12.5%",
      stock: 45,
      rating: 4.8,
      status: "Trending",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Smart Fitness Watch Series 7",
      category: "Wearables",
      price: "$199.00",
      sales: "+8.2%",
      stock: 12,
      rating: 4.9,
      status: "Low Stock",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Ergonomic Mechanical Keyboard",
      category: "Accessories",
      price: "$159.00",
      sales: "+15.0%",
      stock: 89,
      rating: 4.7,
      status: "Trending",
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="space-y-8 p-6 lg:p-10 bg-gray-50/50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Overview</h1>
          <p className="text-gray-500 text-sm">Monitor your best performing products and inventory.</p>
        </div>
        <Link 
          href="/dashboard/products" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
        >
          View All Products <ArrowUpRight size={16} />
        </Link>
      </div>

      {/* Trending Products Table Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h2 className="font-bold text-gray-800">Trending Now</h2>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 uppercase text-[11px] font-bold tracking-wider">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4 text-center">Sales Trend</th>
                <th className="px-6 py-4 text-center">Stock</th>
                <th className="px-6 py-4 text-center">Rating</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {trendingProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden border border-gray-200">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm line-clamp-1">{product.name}</p>
                        <p className="text-xs text-gray-400">{product.category} • <span className="text-indigo-600 font-medium">{product.price}</span></p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">
                      <ArrowUpRight size={12} /> {product.sales}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-sm font-bold ${product.stock < 20 ? 'text-red-500' : 'text-gray-700'}`}>
                        {product.stock}
                      </span>
                      <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${product.stock < 20 ? 'bg-red-500' : 'bg-indigo-500'}`} 
                          style={{ width: `${Math.min(product.stock, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-bold text-gray-700">{product.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit Product">
                        <Edit3 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <Eye size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats Grid (Optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-white/20 rounded-xl">
                  <Package size={24} />
               </div>
               <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">Update Today</span>
            </div>
            <p className="text-indigo-100 text-sm font-medium">Total Active Products</p>
            <h3 className="text-3xl font-bold mt-1">1,284</h3>
         </div>
         {/* More stats cards could go here */}
      </div>
    </div>
  );
}