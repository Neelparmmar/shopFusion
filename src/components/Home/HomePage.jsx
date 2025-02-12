import React from "react";
import HeroSection from "./HeroSection";
// import iphone16 from "../../assets/iPhone16.png";
import iphone16 from "../../assets/iphone-14.png";
import FeaturedProduct from "./FeaturedProduct";
import mac from "../../assets/mac.png";
const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="Buy Iphone14 Pro"
        subtitle="Buy the most popular phone in the world with new camera Features"
        link="http://localhost:5173/product/66ed965295d76bfd16f428d0"
        image={iphone16}
      />
      <FeaturedProduct />
      <HeroSection
        title="Buy MacBook Pro"
        subtitle="New MacBook Pro features up to 6x faster performance than fastest 
        Intel-based MacBook Pro and support for up to 96GB of unified memory for demanding pro workflows"
        link="http://localhost:5173/product/66e5324bb5566b931fe4de14"
        image={mac}
      />
    </div>
  );
};
export default HomePage;
