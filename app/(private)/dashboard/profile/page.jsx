 

import Profile from "@/components/share/ProfileClient";

export const metadata = {
  title: "User Profile | EvoPulse",
};

const ProfilePage = () => {
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-gray-500 mb-6 font-medium">Account Dashboard</h2>
        <Profile />
      </div>
    </main>
  );
};

export default ProfilePage;