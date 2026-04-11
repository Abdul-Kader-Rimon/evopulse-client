"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import PasswordInput from "@/components/auth/password-input";
import { Loader2, Mail, AlertCircle } from "lucide-react"; // আইকন ব্যবহারের জন্য

export default function LoginForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Invalid email or password.");
        setPending(false);
        return;
      }

      localStorage.setItem("token", data.data.token);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Session sync failed. Please try again.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Unable to sign in right now. Check your connection.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl text-sm animate-in fade-in slide-in-from-top-1">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label 
          htmlFor="email" 
          className="text-sm font-semibold text-gray-700 ml-1"
        >
          Email Address
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-600 transition-colors">
            <Mail size={18} />
          </div>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <div className="flex justify-between items-center ml-1">
          <label 
            htmlFor="password" 
            className="text-sm font-semibold text-gray-700"
          >
            Password
          </label>
          <Link 
            href="/forgot-password" 
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput 
          id="password" 
          name="password" 
          placeholder="••••••••" 
          autoComplete="current-password"
          // নিশ্চিত করুন আপনার PasswordInput কম্পোনেন্টে এই ক্লাসগুলো প্রপস হিসেবে কাজ করে 
          className="w-full" 
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={pending}
        className="relative w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md shadow-indigo-100 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
      >
        {pending ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-2" size={18} />
            Verifying...
          </>
        ) : (
          "Sign In to Account"
        )}
      </button>

      {/* Register Link (Mobile/Bottom) */}
      <p className="text-center text-sm text-gray-500 pt-2">
        New here?{" "}
        <Link 
          href="/register" 
          className="font-bold text-indigo-600 hover:underline underline-offset-4"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}