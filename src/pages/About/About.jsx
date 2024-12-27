import React from "react";
import HeroSection from "../../components/About/HeroSection";
import StatsSection from "../../components/About/StatsSection";
import JoinSection from "../../components/About/JoinSection";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <StatsSection />
      <JoinSection />
    </div>
  );
};

export default About;
