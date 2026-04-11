"use client";
import { useEffect, useState } from "react";
import { User, Mail, ShieldCheck, Calendar, Loader2 } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found. Please login.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (result.success) {
          setUser(result.data);
        } else {
          setError(result.message || "Failed to load profile.");
        }
      } catch (err) {
        setError("Network error. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // তারিখ ফরম্যাট করার জন্য ছোট ফাংশন
  const formatDate = (dateData) => {
    if (!dateData) return "N/A";
    // MongoDB $date অবজেক্ট থাকলে সেটা বের করবে, নাহলে সরাসরি তারিখ নিবে
    const dateValue = dateData.$date || dateData;
    return new Date(dateValue).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
        <p className="text-gray-500 font-medium">Fetching your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-20 p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
        <p className="text-red-600 font-semibold">{error}</p>
        <button 
          onClick={() => window.location.href = '/login'}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  // ইমেজ না আসলে ব্যাকআপ ইউআরএল
  const profileImage = user?.avatar || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=6366f1&color=fff`;

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <div className="bg-white shadow-xl rounded-[2.5rem] overflow-hidden border border-gray-100">
        
        {/* Banner */}
        <div className="h-48 bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 relative">
          <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
            {user?.role || "Explorer"}
          </div>
        </div>

        <div className="px-6 md:px-12 pb-12">
          {/* Header */}
          <div className="relative -mt-24 mb-10 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
            <div className="relative group">
              <img
                src={profileImage}
                alt="Profile"
                className="w-44 h-44 rounded-[2rem] border-8 border-white shadow-2xl object-cover bg-white"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = `https://ui-avatars.com/api/?name=${user?.firstName}&background=6366f1&color=fff`; 
                }}
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 border-4 border-white rounded-2xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
            </div>
            
            <div className="flex-1 pb-4">
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-gray-500 font-medium text-lg flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" /> {user?.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
            {/* Details */}
            <div className="space-y-6">
              <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <User className="w-4 h-4" /> Account Info
              </h3>
              <div className="space-y-4 bg-gray-50/50 p-6 rounded-3xl">
                <DetailRow label="Phone" value={user?.phone} />
                <DetailRow label="Gender" value={user?.gender} />
                <DetailRow label="Tier" value={user?.tier || "General Member"} />
              </div>
            </div>

            {/* Status */}
            <div className="space-y-6">
              <h3 className="text-sm font-black text-indigo-600 uppercase tracking-widest flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Activity
              </h3>
              <div className="space-y-4 bg-gray-50/50 p-6 rounded-3xl">
                <DetailRow label="Member Since" value={formatDate(user?.createdAt)} />
                <DetailRow label="Last Active" value={formatDate(user?.lastLogin)} />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-400 text-xs font-bold uppercase">Status</span>
                  <span className="px-4 py-1 bg-green-500 text-white text-[10px] font-black rounded-lg">
                    {user?.isActive ? "VERIFIED" : "PENDING"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
    <span className="text-gray-400 text-sm font-medium">{label}</span>
    <span className="text-gray-800 font-bold">{value || "Not Set"}</span>
  </div>
);

export default Profile;