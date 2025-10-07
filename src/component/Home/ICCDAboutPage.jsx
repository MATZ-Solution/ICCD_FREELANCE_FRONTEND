import React, { useState, useEffect } from 'react';
import { Globe, Briefcase, Users, Shield, GraduationCap, Lightbulb, TrendingUp, Heart } from 'lucide-react';

export default function ICCDAboutPage() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const isVisible = (id) => visibleSections.has(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className={`transition-all duration-1000 ${isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Globe className="w-20 h-20 mx-auto mb-6 text-amber-400 animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              A Gateway for Muslim Talent to the <span className="text-amber-400">Global Digital Economy</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              ICCD Talent Gate is a community-driven freelancing platform connecting skilled professionals from across the Muslim world with global organizations and employers — creating digital opportunities, fostering innovation, and empowering self-reliance through technology.
            </p>
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Join the Talent Network
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 delay-200 ${isVisible('story') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 text-center">
              Bridging Skills and Opportunity Across the Muslim World
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-xl leading-relaxed">
                The Islamic Chamber of Commerce and Development (ICCD) launched the Talent Gate to respond to one of the most pressing needs of our time — <span className="font-semibold text-blue-800">digital employability</span>.
              </p>
              <p className="text-xl leading-relaxed">
                In a rapidly changing world, millions of educated and skilled individuals from Muslim countries face barriers to meaningful work due to limited access, regional constraints, or underdeveloped digital ecosystems.
              </p>
              <p className="text-xl leading-relaxed">
                ICCD Talent Gate aims to break these barriers by building a <span className="font-semibold text-blue-800">trusted, inclusive, and ethical digital marketplace</span>, where talent meets opportunity and where the collective potential of the Muslim Ummah becomes a force for shared prosperity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="py-20 px-6 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 delay-300 ${isVisible('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-2xl text-center text-blue-800 mb-16 font-semibold">
              To Create Sustainable Employment Through Digital Empowerment
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Briefcase, title: 'Remote Employment', desc: 'Generate remote employment and freelance opportunities' },
                { icon: Globe, title: 'Global Integration', desc: 'Integrate Muslim professionals into the global digital economy' },
                { icon: Users, title: 'Cross-Border Collaboration', desc: 'Facilitate cross-border collaboration and innovation' },
                { icon: Shield, title: 'Trust & Ethics', desc: 'Promote transparency, ethics, and trust in online work' },
                { icon: GraduationCap, title: 'Continuous Learning', desc: 'Encourage continuous learning and upskilling' },
                { icon: Lightbulb, title: 'Sustainable Growth', desc: 'Support development of knowledge-based economies' }
              ].map((goal, idx) => (
                <div 
                  key={idx}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <goal.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{goal.title}</h3>
                  <p className="text-gray-600">{goal.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why ICCD Talent Gate */}
      <section id="why" className="py-20 px-6 bg-gradient-to-br from-blue-900 to-teal-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 delay-400 ${isVisible('why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              A Platform Rooted in Values and Built for Impact
            </h2>
            <p className="text-xl text-center mb-16 text-blue-100 max-w-4xl mx-auto">
              Unlike commercial freelancing portals, ICCD Talent Gate is designed with Islamic ethical principles, community upliftment, and shared prosperity at its core. It is not just a platform — it is a movement toward inclusive growth.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Secure & Transparent', desc: 'Safe payment channels and verified user profiles' },
                { title: 'Smart Matching', desc: 'Intelligent search and filtering connecting clients and freelancers' },
                { title: 'Ethical Standards', desc: 'Fair compensation and respectful engagement based on Islamic values' },
                { title: 'Diverse Marketplace', desc: 'Technology, design, business, education, and more' },
                { title: 'Capacity Building', desc: 'Regular learning resources and mentoring opportunities' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                  <h3 className="text-xl font-bold mb-2 text-amber-400">{feature.title}</h3>
                  <p className="text-blue-100">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 delay-500 ${isVisible('impact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 text-center">
              Digital Transformation for Inclusive Growth
            </h2>
            <p className="text-xl text-center text-gray-700 mb-16 max-w-4xl mx-auto">
              ICCD Talent Gate aspires to be a catalyst for economic transformation across OIC member states
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg">
                <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <div className="text-5xl font-bold text-blue-900 mb-2">10,000+</div>
                <p className="text-gray-700 font-semibold">Jobs Created Across 57 OIC Member States (Projected 2026)</p>
              </div>
              
              <div className="text-center p-8 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl shadow-lg">
                <Globe className="w-16 h-16 text-teal-600 mx-auto mb-4" />
                <div className="text-5xl font-bold text-teal-900 mb-2">6,000+</div>
                <p className="text-gray-700 font-semibold">Freelancers and Clients Connected Globally</p>
              </div>
              
              <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl shadow-lg">
                <Heart className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                <div className="text-5xl font-bold text-amber-900 mb-2">∞</div>
                <p className="text-gray-700 font-semibold">Sustainable Income Channels in Emerging Economies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="py-20 px-6 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 delay-600 ${isVisible('vision') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6 text-center">
              From Digital Work to Economic Empowerment
            </h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              The long-term vision of ICCD Talent Gate is to transform digital freelancing into a foundation for socio-economic development across the Muslim world. Through collaboration, skill development, and innovation, the platform will evolve into a complete digital ecosystem — connecting education, entrepreneurship, and employment for generations to come.
            </p>

            <div className="space-y-4">
              {[
                'Integrated learning and certification programs',
                'Partnerships with chambers, universities, and OIC institutions',
                'Global marketplace access for Muslim-owned businesses'
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0 mt-1">
                    {idx + 1}
                  </div>
                  <p className="text-lg text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-20 px-6 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-700 ${isVisible('partners') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              An Initiative by the Islamic Chamber of Commerce and Development
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              The ICCD Talent Gate is spearheaded by the Islamic Chamber of Commerce and Development (ICCD) in partnership with leading OIC institutions, private sector innovators, and development organizations. Together, we aim to foster an environment where digital inclusion, economic dignity, and innovation become the cornerstones of a shared Islamic digital economy.
            </p>
            
            <blockquote className="text-2xl italic font-light text-amber-300 border-l-4 border-amber-500 pl-6 py-4 max-w-3xl mx-auto">
              "Technology, when guided by values, can unite economies and empower communities."
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 px-6 bg-gradient-to-br from-amber-500 to-amber-600">
        <div className="max-w-5xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-800 ${isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Movement. Empower Change.
            </h2>
            <p className="text-xl text-amber-100 mb-12 max-w-3xl mx-auto">
              Whether you are a freelancer seeking opportunity or an organization looking for trusted talent, ICCD Talent Gate welcomes you to join a global community driven by collaboration, faith, and innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-amber-600 hover:bg-amber-50 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                Start Freelancing
              </button>
              <button className="bg-blue-900 text-white hover:bg-blue-800 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                Hire a Professional
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-600 font-bold py-4 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
                Learn About ICCD
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}