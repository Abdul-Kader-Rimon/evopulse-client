import { auth } from "@/auth";
import HomeBanner from "@/components/Home/Banner";
import Slider from "@/components/Home/Slider";
 
 
 
export const metadata = {
  title: "EvoPulse Store | Premium Ecommerce"
};

export default async function PublicHomePage() {
  const session = await auth();
  const isAuthenticated = Boolean(session?.user);

  return (
    <div className="storefront">
  <HomeBanner isAuthenticated={isAuthenticated} />
  <Slider/>
    </div>
  );
}
