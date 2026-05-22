import { auth } from "@/auth";
import CategorySlider from "@/components/Home/CategorySlider";
 
 
import PopularProducts from "@/components/Home/PopularProducts";
import ProductGrid from "@/components/Home/ProductGrid";
 
 
 
 
export const metadata = {
  title: "EvoPulse Store | Premium Ecommerce"
};

export default async function PublicHomePage() {
  const session = await auth();
  const isAuthenticated = Boolean(session?.user);

  return (
    <div className="storefront">
   
  <PopularProducts/>
    
      <ProductGrid/>
       <CategorySlider/>
    </div>
  );
}
