"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  ClipboardList,
  Compass,
  Heart,
  LogOut,
  Menu,
  Star,
  User,
  X,
  ChevronDown,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";

const createBaseLinks = () => [
  { name: "Home", href: "/", icon: Compass }
];

export default function Navbar({ user = null, isAuthenticated = false }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Scroll logic for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Outside click logic
  useEffect(() => {
    const handleOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const navLinks = useMemo(() => {
    const links = createBaseLinks();
    if (isAuthenticated) {
      links.push(
        { name: "Dashboard", href: "/dashboard/browse", icon: Briefcase },
        { name: "Orders", href: "/my-orders", icon: ClipboardList },
        { name: "Reviews", href: "/my-reviews", icon: Star },
        { name: "Wishlist", href: "/wishlist", icon: Heart }
      );
    }
    return links;
  }, [isAuthenticated]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const handleLogout = async () => {
    setIsMenuOpen(false);
    setProfileOpen(false);
    await signOut({ callbackUrl: "/login" });
  };

  // User Info Fallbacks
  const displayName = user?.name || "User";
  const shortName = displayName.split(" ")[0];
  const fallbackInitial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-2" 
          : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
                <span className="font-bold text-xl italic">E</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">
                  EvoPulse
                </span>
                <span className="text-[10px] uppercase tracking-widest font-medium text-indigo-600">
                  Smart Commerce
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                      active
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-gray-600 hover:text-indigo-600"
                    }`}
                  >
                    <link.icon size={16} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Actions Area */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border border-indigo-200">
                      {user?.image ? (
                        <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-indigo-700 font-bold text-sm">{fallbackInitial}</span>
                      )}
                    </div>
                    <span className="hidden sm:block text-sm font-semibold text-gray-700">{shortName}</span>
                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                      </div>
                      <div className="p-1">
                        <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                          <User size={16} /> Profile Setting
                        </Link>
                        <Link href="/dashboard/browse" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                          <Briefcase size={16} /> Dashboard
                        </Link>
                        <hr className="my-1 border-gray-50" />
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link href="/login" className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition-colors">
                    Log in
                  </Link>
                  <Link href="/register" className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md shadow-indigo-200 transition-all active:scale-95">
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-gray-100 text-gray-600 md:hidden hover:bg-gray-200 transition-colors"
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-2xl p-4 md:hidden animate-in slide-in-from-top duration-300">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 p-3 rounded-xl text-base font-medium ${
                    isActive(link.href) ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <link.icon size={20} />
                  {link.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                  <Link href="/login" className="flex justify-center p-3 text-sm font-bold text-gray-700 bg-gray-100 rounded-xl">Login</Link>
                  <Link href="/register" className="flex justify-center p-3 text-sm font-bold text-white bg-indigo-600 rounded-xl">Sign Up</Link>
                </div>
              )}
              {isAuthenticated && (
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-3 mt-2 text-red-600 font-medium hover:bg-red-50 rounded-xl"
                >
                  <LogOut size={20} /> Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" />
    </>
  );
}