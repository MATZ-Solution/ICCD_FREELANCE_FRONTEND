import React, { useState, useEffect } from 'react';
import { UserPlus, Search, MessageSquare, CreditCard, Star, Users, CheckCircle, Globe, Shield, Briefcase, TrendingUp, Award } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null);
  const [visibleSections, setVisibleSections] = useState(new Set());

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

  const steps = [
    {
      icon: UserPlus,
      number: 1,
      title: 'Create Your Account',
      freelancer: 'Sign up to showcase your expertise, skills, and portfolio. Build a verified professional profile that highlights your qualifications, experience, and achievements.',
      employer: 'Register your organization or business to access a wide network of verified Muslim professionals offering services across technology, design, business, consulting, and more.',
      badge: 'All users undergo a verification process to ensure a secure and trusted environment.',
    },
    {
      icon: Search,
      number: 2,
      title: 'Explore Opportunities',
      freelancer: 'Browse projects and job listings from across OIC markets and beyond. Filter by category, budget, skill set, or project type.',
      employer: 'Post your project or job requirement with details about the scope, skills needed, and timeline. ICCD Talent Gate\'s intelligent matching algorithm recommends the best-suited freelancers.',
      badge: 'Smart filters and AI-based recommendations make matching quick and accurate.',
    },
    {
      icon: MessageSquare,
      number: 3,
      title: 'Connect & Collaborate',
      description: 'Once a match is made, both parties can connect through the built-in messaging system for discussions, proposals, and negotiations. Project milestones, deliverables, and communication are managed seamlessly within the platform.',
      badge: 'Our platform ensures professionalism, clarity, and smooth communication between both sides.',
    },
    {
      icon: CreditCard,
      number: 4,
      title: 'Secure Payments',
      description: 'Payments are processed through a trusted and encrypted gateway that ensures fairness and transparency for both freelancers and employers. Funds are held safely until work milestones are completed and approved.',
      badge: 'Freelancers receive timely payments; clients pay only when satisfied with results.',
    },
    {
      icon: Star,
      number: 5,
      title: 'Review & Build Reputation',
      description: 'After each project, both freelancers and employers can leave ratings and feedback. This review system strengthens trust, helps users build credibility, and encourages professional excellence across the community.',
      badge: 'Reputation drives opportunity — the better your work, the more visibility you earn.',
    },
    {
      icon: Users,
      number: 6,
      title: 'Grow With the Community',
      description: 'ICCD Talent Gate is not just a platform — it\'s a growing digital ecosystem. Engage in capacity-building programs, mentorship sessions, and networking opportunities offered by ICCD to enhance your skills and grow your career in the digital economy.',
      badge: 'Every user contributes to a stronger, self-reliant, and collaborative Muslim digital community.',
    }
  ];

  const freelancerBenefits = [
    { icon: Globe, text: 'Access global OIC job market' },
    { icon: Award, text: 'Build a reputation & portfolio' },
    { icon: Shield, text: 'Receive secure payments' },
    { icon: TrendingUp, text: 'Learn & grow with ICCD programs' }
  ];

  const employerBenefits = [
    { icon: CheckCircle, text: 'Hire trusted, verified professionals' },
    { icon: Search, text: 'Find the right skills faster' },
    { icon: Briefcase, text: 'Manage projects transparently' },
    { icon: Users, text: 'Support ethical and value-driven hiring' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      {/* Hero */}
      <section id="hero" className="relative py-20 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-[#47AAB3] via-[#3A8F97] to-[#2D6F75] text-white overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              How ICCD Talent Gate Works
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-teal-100 mb-6">
              Simple. Secure. Empowering.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-teal-100 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed">
              ICCD Talent Gate connects skilled professionals and organizations across the Muslim world — providing a trusted, transparent, and value-driven platform for digital collaboration. Here's how the process works, step by step.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="py-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className={`transition-all duration-700 ${isVisible('steps') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`} style={{ transitionDelay: `${idx * 100}ms` }}>
                <div 
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  <div className="bg-gradient-to-r from-[#47AAB3] via-[#3A8F97] to-[#2D6F75] p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <div className="text-white text-sm font-semibold opacity-90 mb-1">STEP {step.number}</div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{step.title}</h3>
                    </div>
                    <div className="hidden sm:flex w-10 h-10 bg-white rounded-full items-center justify-center text-2xl font-bold text-[#47AAB3]">
                      {step.number}
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    {step.description ? (
                      <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed mb-4">{step.description}</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4">
                        <div className="bg-teal-50 p-4 sm:p-6 rounded-xl">
                          <h4 className="font-bold text-[#2D6F75] mb-2 flex items-center text-base sm:text-lg">
                            <Briefcase className="w-4 h-4 mr-2" /> For Freelancers
                          </h4>
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{step.freelancer}</p>
                        </div>
                        <div className="bg-cyan-50 p-4 sm:p-6 rounded-xl">
                          <h4 className="font-bold text-[#2D6F75] mb-2 flex items-center text-base sm:text-lg">
                            <Users className="w-4 h-4 mr-2" /> For Employers
                          </h4>
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{step.employer}</p>
                        </div>
                      </div>
                    )}

                    <div className="bg-gradient-to-r from-[#47AAB3] to-[#3A8F97] p-3 rounded-lg border-l-4 border-[#47AAB3]">
                      <p className="text-white font-medium flex items-start text-sm sm:text-base">
                        {step.badge}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="py-16 px-4 sm:px-6 lg:px-10 bg-white">
        <div className="max-w-6xl mx-auto text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D6F75] mb-4">A Platform That Works for Everyone</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8">
            Whether you're seeking opportunities or talent, ICCD Talent Gate has you covered
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Freelancers */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#47AAB3] to-[#3A8F97] rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <Briefcase className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D6F75]">For Freelancers</h3>
              </div>
              <div className="space-y-3">
                {freelancerBenefits.map((benefit, idx) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div key={idx} className="flex items-start space-x-2 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <BenefitIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#47AAB3] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 text-sm sm:text-base font-medium">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Employers */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-100 rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#47AAB3] to-[#3A8F97] rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <Users className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D6F75]">For Employers</h3>
              </div>
              <div className="space-y-3">
                {employerBenefits.map((benefit, idx) => {
                  const BenefitIcon = benefit.icon;
                  return (
                    <div key={idx} className="flex items-start space-x-2 bg-white p-3 sm:p-4 rounded-lg shadow-sm">
                      <BenefitIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#47AAB3] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-800 text-sm sm:text-base font-medium">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-16 px-4 sm:px-6 lg:px-10 bg-gradient-to-r from-[#47AAB3] via-[#3A8F97] to-[#2D6F75] text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">💼 Join ICCD Talent Gate Today</h2>
          <p className="text-sm sm:text-base md:text-lg text-cyan-100 mb-6 max-w-3xl mx-auto leading-relaxed">
            Empower your future, build your network, and contribute to a united digital economy across the Muslim world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <button className="group bg-white text-[#2D6F75] hover:bg-cyan-50 font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center">
              <UserPlus className="w-4 h-4 sm:w-6 sm:h-6 mr-2 group-hover:rotate-12 transition-transform" />
              Join as Freelancer
            </button>
            <button className="group bg-[#5BC0C9] hover:bg-[#6DD5DE] text-white font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center">
              <Briefcase className="w-4 h-4 sm:w-6 sm:h-6 mr-2 group-hover:scale-110 transition-transform" />
              Hire a Professional
            </button>
          </div>
          <p className="mt-6 text-cyan-100 text-xs sm:text-sm">
            Trusted by professionals and organizations across 57 OIC member states
          </p>
        </div>
      </section>
    </div>
  );
}
