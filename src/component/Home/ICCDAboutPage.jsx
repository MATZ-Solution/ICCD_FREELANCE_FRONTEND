import React, { useState, useEffect } from "react";
import {
  Globe,
  Briefcase,
  Users,
  Shield,
  GraduationCap,
  Lightbulb,
  TrendingUp,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./HeroSection";

export default function ICCDAboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id) => visibleSections.has(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-gray-900">
      {/* Hero Section */}
      <HeroSection />

      {/* Our Story */}
      <section id="story" className="py-16 sm:py-20 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible("story")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D5054] mb-6 sm:mb-8">
              Bridging Skills and Opportunity Across the Muslim World
            </h2>
            <div className="text-base sm:text-lg md:text-xl text-gray-700 space-y-6 max-w-4xl mx-auto leading-relaxed">
              <p>
                The Islamic Chamber of Commerce and Development (ICCD) launched
                the Talent Gate to address one of the most pressing needs of our
                time —{" "}
                <span className="font-semibold text-[#1D5054]">
                  digital employability
                </span>
                .
              </p>
              <p>
                Millions of skilled individuals from Muslim countries face
                barriers to meaningful work due to regional constraints or
                limited access to global digital ecosystems.
              </p>
              <p>
                ICCD Talent Gate aims to build a{" "}
                <span className="font-semibold text-[#1D5054]">
                  trusted, inclusive, and ethical digital marketplace
                </span>
                , where talent meets opportunity and shared prosperity thrives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section
        id="mission"
        className="py-16 sm:py-20 px-4 sm:px-8 bg-gradient-to-br from-blue-50 to-teal-50"
      >
        <div className="max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible("mission")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D5054] mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-center text-[#1D5054] mb-12 font-semibold">
              To Create Sustainable Employment Through Digital Empowerment
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  icon: Briefcase,
                  title: "Remote Employment",
                  desc: "Generate remote employment and freelance opportunities",
                },
                {
                  icon: Globe,
                  title: "Global Integration",
                  desc: "Integrate Muslim professionals into the global digital economy",
                },
                {
                  icon: Users,
                  title: "Cross-Border Collaboration",
                  desc: "Facilitate cross-border collaboration and innovation",
                },
                {
                  icon: Shield,
                  title: "Trust & Ethics",
                  desc: "Promote transparency, ethics, and trust in online work",
                },
                {
                  icon: GraduationCap,
                  title: "Continuous Learning",
                  desc: "Encourage continuous learning and upskilling",
                },
                {
                  icon: Lightbulb,
                  title: "Sustainable Growth",
                  desc: "Support development of knowledge-based economies",
                },
              ].map((goal, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                >
                  <goal.icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#1D5054] mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {goal.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {goal.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why ICCD */}
      <section
        id="why"
        className="py-16 sm:py-20 px-4 sm:px-8 bg-gradient-to-br from-[#1D5054] to-teal-800 text-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            A Platform Rooted in Values and Built for Impact
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-12 max-w-4xl mx-auto">
            Built on Islamic ethical principles and community upliftment — ICCD
            Talent Gate is more than a freelancing platform; it’s a movement for
            inclusive growth.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Secure & Transparent",
                desc: "Safe payment channels and verified profiles",
              },
              {
                title: "Smart Matching",
                desc: "Intelligent search connecting clients and freelancers",
              },
              {
                title: "Ethical Standards",
                desc: "Fair compensation and respectful engagement",
              },
              {
                title: "Diverse Marketplace",
                desc: "Tech, design, business, and education sectors",
              },
              {
                title: "Capacity Building",
                desc: "Mentorship and continuous learning programs",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white bg-opacity-10 p-6 rounded-xl border border-white/20 hover:bg-opacity-20 transition-all"
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#47AAB3] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section
        id="impact"
        className="py-16 sm:py-20 px-4 sm:px-8 bg-white text-center"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1D5054] mb-6">
            Digital Transformation for Inclusive Growth
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-12 max-w-4xl mx-auto">
            ICCD Talent Gate aims to be a catalyst for digital employment and
            economic transformation across OIC member states.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                color: "text-[#1D5054]",
                bg: "from-blue-50 to-blue-100",
                number: "10,000+",
                desc: "Jobs Created Across 57 OIC States (Projected 2026)",
              },
              {
                icon: Globe,
                color: "text-teal-600",
                bg: "from-teal-50 to-teal-100",
                number: "6,000+",
                desc: "Freelancers and Clients Connected Globally",
              },
              {
                icon: Heart,
                color: "text-[#47AAB3]",
                bg: "from-amber-50 to-amber-100",
                number: "∞",
                desc: "Sustainable Income Channels in Emerging Economies",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-8 rounded-2xl shadow-md bg-gradient-to-br ${item.bg}`}
              >
                <item.icon
                  className={`w-12 h-12 sm:w-16 sm:h-16 ${item.color} mx-auto mb-4`}
                />
                <div className="text-4xl sm:text-5xl font-bold mb-2 text-[#1D5054]">
                  {item.number}
                </div>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        className="py-20 px-4 sm:px-8 bg-gradient-to-br from-[#47AAB3] to-[#2E7A81] text-center text-white"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Join the Movement. Empower Change.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-amber-100 mb-10 leading-relaxed">
            Whether you're a freelancer seeking opportunity or an organization
            hiring trusted talent, ICCD Talent Gate welcomes you to a global
            community built on faith, skill, and innovation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => navigate("/freelancer-profile")}
              className="bg-white text-[#47AAB3] hover:bg-blue-50 font-bold py-3 px-8 sm:px-10 rounded-full text-base sm:text-lg transition-all transform hover:scale-105"
            >
              Start Freelancing
            </button>
            <button
              onClick={() => navigate("/find-talent")}
              className="bg-[#1D5054] text-white hover:bg-[#174043] font-bold py-3 px-8 sm:px-10 rounded-full text-base sm:text-lg transition-all transform hover:scale-105"
            >
              Hire a Professional
            </button>
            <button
              onClick={() => navigate("/how-it-works")}
              className="border-2 border-white text-white hover:bg-white hover:text-[#47AAB3] font-bold py-3 px-8 sm:px-10 rounded-full text-base sm:text-lg transition-all transform hover:scale-105"
            >
              Learn About ICCD
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
