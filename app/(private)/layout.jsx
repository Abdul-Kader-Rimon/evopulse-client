"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Users, FileText, Globe, MessageSquare, 
  Tag, Download, Settings, LogOut, Search, ChevronDown 
} from "lucide-react";

export default function PrivateLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Browse", href: "/dashboard/browse", icon: Users },
    { name: "Profile", href: "/dashboard/profile", icon: Users },
    { name: "Wishlist", href: "/dashboard/wishlist", icon: FileText },
    { name: "Geography", href: "/dashboard/geography", icon: Globe },
    { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
    { name: "Deals", href: "/dashboard/deals", icon: Tag },
    { name: "Export", href: "/dashboard/export", icon: Download },
  ];

  return (
    <div className="flex flex-row h-screen">
      {/* --- Sidebar (Aside) --- */}
      <div>
        <aside className=" h-screen bg-white border-r border-slate-100 flex flex-col p-6 sticky top-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 mb-8 px-2 group cursor-pointer">
  {/* লোগো আইকন */}
  <div className="w-9 h-9 bg-[#FFA000] rounded-full flex items-center justify-center shadow-lg shadow-orange-200 transition-transform group-hover:scale-110">
    <div className="w-4 h-4 bg-white rounded-full translate-x-[-2px] translate-y-[1px]"></div>
  </div>
  
  {/* লোগো টেক্সট */}
  <span className="text-xl font-black tracking-tight text-slate-800 italic">
    EvoPulse
  </span>
</Link>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search" 
            className="w-full bg-[#F3F4F6] border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                  isActive ? "bg-white text-slate-900 shadow-sm border border-slate-100" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-orange-500" : "text-slate-400 group-hover:text-slate-600"}`} />
                  <span>{item.name}</span>
                </div>
                {item.hasSub && <ChevronDown size={14} className="text-slate-400" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section (Settings & Logout) */}
        <div className="mt-auto pt-6 border-t border-slate-50 space-y-1">
          <Link href="#" className="flex items-center gap-3.5 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
            <Settings className="w-5 h-5 text-slate-400" /> Settings
          </Link>
          <button className="flex items-center gap-3.5 px-4 py-2.5 text-sm font-semibold text-[#E03137] hover:bg-red-50 w-full rounded-xl transition-all">
            <LogOut className="w-5 h-5" /> Log out
          </button>
        </div>
      </aside>
      </div>
      

<div>
     {/* --- Main Content Area --- */}
      <main className="flex-1 overflow-y-auto bg-[#FDFDFD]">
        <div className="p-10 max-w-[1600px] mx-auto">
            {children}
        </div>
      </main>
</div>
   
    </div>
  );
}