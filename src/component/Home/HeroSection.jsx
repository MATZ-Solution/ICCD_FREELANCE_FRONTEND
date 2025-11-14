import { Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  // Scroll animation for background movement
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50]"
    >
      {/* Patterned Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translateY(${scrollY * 0.4}px)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Globe className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mx-auto mb-6 text-[#47AAB3] animate-pulse" />

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            A Gateway for Muslim Talent to the{" "}
            <span className="text-[#16c5d5]">Global Digital Economy</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed px-2">
            ICCD Talent Gate is a community-driven freelancing platform
            connecting skilled professionals from across the Muslim world with
            global organizations — creating digital opportunities, fostering
            innovation, and empowering self-reliance through technology.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="bg-[#47AAB3] hover:bg-[#3b939b] text-white font-semibold py-3 sm:py-4 px-6 sm:px-10 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Join the Talent Network
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 sm:w-8 h-10 sm:h-12 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
