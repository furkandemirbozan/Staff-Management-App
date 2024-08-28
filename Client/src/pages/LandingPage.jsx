import React from "react";
import HomePageLayoutHeaderComponent from "../components/Landing/HomePageLayoutHeaderComponent";
import HomePageLayoutHeroComponent from "../components/Landing/HomePageLayoutHeroComponent";
import HomePageLayoutFooterComponent from "../components/Landing/HomePageLayoutFooterComponent";

function Landing() {
  return (
    <>
      {/* <Header />
      <HeroSection />
      <CompanySlider />
      <TrustSection />
      <TrialCTA />
      <Footer /> */}
      <HomePageLayoutHeaderComponent />
      <HomePageLayoutHeroComponent />
      <HomePageLayoutFooterComponent />
    </>
  );
}

export default Landing;
