import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/login-form";
import { auth } from "@/auth";
import Link from "next/link";

export const metadata = {
  title: "Sign In | EvoPulse"
};

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="w-full max-w-md z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
              E
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">EvoPulse</span>
          </Link>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-indigo-100/50 border border-white p-8 sm:p-10 transition-all">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider mb-3">
              Secure Access
            </span>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed">
              Sign in to manage your products, orders, and business operations seamlessly.
            </p>
          </div>

          {/* Login Form Wrapper */}
          <div className="auth-form-container">
            <LoginForm />
          </div>

          {/* Footer Links */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8-0v4h8z" />
            </svg>
            AES-256 Encrypted Connection
          </p>
        </div>
      </div>
    </div>
  );
}