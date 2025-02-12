import React from "react";
import "./HeroSection.css";

const HeroSection = ({ title, subtitle, link, image }) => {
  return (
    <section className="hero-section">
      <div className="flex-align">
        <h2 className="hero-title">{title}</h2>
        <p className="hero-subtitle">{subtitle}</p>
        <a href={link} className="hero-link">
          Buy Now
        </a>
      </div>
      <div className="flex-align">
        <img src={image} className="hero-image" alt=" " />
      </div>
    </section>
  );
};

export default HeroSection;
