import { redirect } from "next/navigation";
import RegisterForm from "@/components/auth/register-form";
import { auth } from "@/auth";
import Link from "next/link";

export const metadata = {
  title: "Register | EvoPulse"
};

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[5%] -right-[5%] w-[35%] h-[35%] bg-indigo-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-[5%] -left-[5%] w-[35%] h-[35%] bg-blue-100 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="w-full max-w-2xl z-10">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
              E
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">EvoPulse</span>
          </Link>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-indigo-100/50 border border-white p-6 sm:p-10 transition-all">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider mb-3">
              Create Account
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Join EvoPulse
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md mx-auto">
              Create your account to access the operations dashboard and manage your store data efficiently.
            </p>
          </div>

          {/* Register Form */}
          <div className="auth-form-container">
            <RegisterForm />
          </div>
        </div>

        {/* Bottom Trust Badge */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-gray-400">
          <p className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            GDPR Compliant
          </p>
          <p className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 4.908-3.333 9.277-8 10.127-4.667-.85-8-5.22-8-10.127 0-.68.056-1.35.166-2.001z" clipRule="evenodd" />
            </svg>
            SSL Secure Registration
          </p>
        </div>
      </div>
    </div>
  );
}