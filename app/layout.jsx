import { Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata = {
  title: "EvoPulse Admin",
  description: "Industry-standard Next.js frontend with public/private layouts and NextAuth"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${spaceGrotesk.variable} ${sora.variable}`}>
        <div className="app-root">{children}</div>
      </body>
    </html>
  );
}
