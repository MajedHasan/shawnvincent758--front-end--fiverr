import React from "react";
import HeroSection from "./_components/heroSection";
import CategoriesSection from "./_components/categoriesSection";
import RecommendationsSection from "./_components/recommendations";

const page = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <RecommendationsSection />
    </>
  );
};

export default page;
