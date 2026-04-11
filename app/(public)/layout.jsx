import { auth } from "@/auth";
import Footer from "@/components/Layout/footer";
import Navbar from "@/components/Layout/navbar";

export default async function PublicLayout({ children }) {
  const session = await auth();
  const isAuthenticated = Boolean(session?.user);
  const navbarUser = session?.user
    ? {
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
        role: session.user.role || "user"
      }
    : null;

  return (
    <div className="public-shell">
      <Navbar isAuthenticated={isAuthenticated} user={navbarUser} />
      <main className="public-main">{children}</main>
      <Footer isAuthenticated={isAuthenticated} />
    </div>
  );
}
