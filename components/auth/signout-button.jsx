"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutButton() {
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    try {
      setPending(true);
      await signOut({
        callbackUrl: "/login"
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <button type="button" className="signout-btn" onClick={handleSignOut} disabled={pending}>
      {pending ? "Signing Out..." : "Sign Out"}
    </button>
  );
}
