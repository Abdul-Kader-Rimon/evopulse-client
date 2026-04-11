"use client";
import React from "react";
import { 
  TrendingUp, 
  Users, 
  Target, 
  ArrowUpRight, 
  Activity 
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* --- Top Stats Grid --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Revenues Card */}
        <StatCard 
          title="Revenues" 
          value="15%" 
          trend="+2.4%" 
          description="Increase compared to last week" 
          icon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
        />

        {/* Lost Deals Card */}
        <StatCard 
          title="Lost deals" 
          value="4%" 
          trend="-1.2%" 
          description="You closed 96 out of 100 deals" 
          icon={<Activity className="w-5 h-5 text-rose-500" />}
        />

        {/* Customers Card */}
        <StatCard 
          title="New Customers" 
          value="1,284" 
          trend="+12%" 
          description="Active users this month" 
          icon={<Users className="w-5 h-5 text-indigo-500" />}
        />

        {/* Quarter Goal Card */}
        <StatCard 
          title="Quarter goal" 
          value="84%" 
          description="Progress towards target" 
          icon={<Target className="w-5 h-5 text-orange-500" />}
          isProgress
        />
      </section>

      {/* --- Content Area --- */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Main Chart/Activity Placeholder */}
        <div className="xl:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Growth Overview</h2>
            <select className="text-xs font-bold bg-slate-50 border-none rounded-lg px-3 py-2 outline-none">
              <option>Yearly</option>
              <option>Monthly</option>
            </select>
          </div>
          {/* এখানে আপনার Chart Component বসাতে পারেন */}
          <div className="w-full h-64 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center">
            <p className="text-slate-400 text-sm font-medium italic">Chart Visualization Placeholder</p>
          </div>
        </div>

        {/* Side Info Panel */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold mb-6">Top Performers</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100" />
                <div className="flex-1">
                  <p className="text-sm font-bold">Member Name {i}</p>
                  <p className="text-xs text-slate-400">Top Sales Target</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-300" />
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}

// --- Internal Reusable Component for Stat Cards ---
const StatCard = ({ title, value, description, icon, trend, isProgress }) => (
  <div className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-orange-50 transition-colors">
        {icon}
      </div>
      {trend && (
        <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend}
        </span>
      )}
    </div>
    
    <div>
      <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
      <p className="text-sm font-bold text-slate-800 mt-1">{title}</p>
      <p className="text-xs text-slate-400 mt-2 leading-relaxed">{description}</p>
    </div>

    {isProgress && (
      <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500 rounded-full" style={{ width: value }} />
      </div>
    )}
  </div>
);