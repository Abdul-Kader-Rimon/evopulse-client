import "server-only";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1)
});

const normalizeEmail = (value) => String(value || "").trim().toLowerCase();

const createAuthUser = (record) => {
  const email = normalizeEmail(record?.email);
  const firstName = String(record?.firstName || "").trim();
  const lastName = String(record?.lastName || "").trim();
  const fullName = `${firstName} ${lastName}`.trim();
  const image = String(
    record?.avatar ||
      record?.avatarUrl ||
      record?.image ||
      record?.photoURL ||
      record?.profileImage ||
      ""
  ).trim();

  if (!email) {
    return null;
  }

  return {
    id: String(record?._id || record?.id || email),
    name: fullName || record?.name || record?.username || "EvoPulse User",
    email,
    role: record?.role || "user",
    image: image || null,
    backendToken: record?.backendToken || null
  };
};

const resolveAdminFromEnv = ({ email, password }) => {
  const adminEmail = normalizeEmail(process.env.AUTH_ADMIN_EMAIL);
  const adminPassword = process.env.AUTH_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return null;
  }

  if (email !== adminEmail || password !== adminPassword) {
    return null;
  }

  return {
    id: "admin",
    name: process.env.AUTH_ADMIN_NAME || "EvoPulse Admin",
    email: adminEmail,
    role: "admin"
  };
};

const loginWithBackend = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),
      cache: "no-store"
    });

    if (!response.ok) {
      return null;
    }

    const payload = await response.json();

    if (!payload?.success) {
      return null;
    }

    const userRecord = payload?.data?.user || payload?.data;
    const authUser = createAuthUser({
      ...userRecord,
      backendToken: payload?.data?.token || null
    });

    if (!authUser) {
      return null;
    }

    return authUser;
  } catch {
    return null;
  }
};

const authorizeWithCredentials = async (rawCredentials) => {
  const parsed = loginSchema.safeParse(rawCredentials);

  if (!parsed.success) {
    return null;
  }

  const email = normalizeEmail(parsed.data.email);
  const password = parsed.data.password;

  const authenticatedUser = await loginWithBackend({ email, password });

  if (authenticatedUser) {
    return authenticatedUser;
  }

  return resolveAdminFromEnv({ email, password });
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@evopulse.com" },
        password: { label: "Password", type: "password" }
      },
      authorize: authorizeWithCredentials
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || "user";
        token.backendToken = user.backendToken || null;
        token.image = user.image || token.image || null;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = String(token.sub || "");
        session.user.role = token.role || "user";
        session.user.image = token.image || session.user.image || null;
      }

      session.backendToken = token.backendToken || null;

      return session;
    }
  }
});
