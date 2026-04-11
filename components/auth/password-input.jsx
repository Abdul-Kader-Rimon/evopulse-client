"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react"; // React Icons/Lucide icons ব্যবহার করা হচ্ছে

export default function PasswordInput({
  id,
  name,
  placeholder,
  required = true,
  minLength,
  autoComplete = "current-password",
  className = "" // এক্সট্রা ক্লাস প্রপস হিসেবে নেওয়ার জন্য
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`relative group ${className}`}>
      {/* বাম পাশের লক আইকন */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
        <Lock size={18} />
      </div>

      {/* মেইন ইনপুট ফিল্ড */}
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        autoComplete={autoComplete}
        className="block w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none placeholder:text-gray-400"
      />

      {/* শো/হাইড বাটন */}
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? (
          <EyeOff size={20} strokeWidth={1.8} />
        ) : (
          <Eye size={20} strokeWidth={1.8} />
        )}
      </button>
    </div>
  );
}