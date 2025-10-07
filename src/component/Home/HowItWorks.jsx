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
      color: 'blue'
    },
    {
      icon: Search,
      number: 2,
      title: 'Explore Opportunities',
      freelancer: 'Browse projects and job listings from across OIC markets and beyond. Filter by category, budget, skill set, or project type.',
      employer: 'Post your project or job requirement with details about the scope, skills needed, and timeline. ICCD Talent Gate\'s intelligent matching algorithm recommends the best-suited freelancers.',
      badge: 'Smart filters and AI-based recommendations make matching quick and accurate.',
      color: 'teal'
    },
    {
      icon: MessageSquare,
      number: 3,
      title: 'Connect & Collaborate',
      description: 'Once a match is made, both parties can connect through the built-in messaging system for discussions, proposals, and negotiations. Project milestones, deliverables, and communication are managed seamlessly within the platform.',
      badge: 'Our platform ensures professionalism, clarity, and smooth communication between both sides.',
      color: 'purple'
    },
    {
      icon: CreditCard,
      number: 4,
      title: 'Secure Payments',
      description: 'Payments are processed through a trusted and encrypted gateway that ensures fairness and transparency for both freelancers and employers. Funds are held safely until work milestones are completed and approved.',
      badge: 'Freelancers receive timely payments; clients pay only when satisfied with results.',
      color: 'green'
    },
    {
      icon: Star,
      number: 5,
      title: 'Review & Build Reputation',
      description: 'After each project, both freelancers and employers can leave ratings and feedback. This review system strengthens trust, helps users build credibility, and encourages professional excellence across the community.',
      badge: 'Reputation drives opportunity — the better your work, the more visibility you earn.',
      color: 'amber'
    },
    {
      icon: Users,
      number: 6,
      title: 'Grow With the Community',
      description: 'ICCD Talent Gate is not just a platform — it\'s a growing digital ecosystem. Engage in capacity-building programs, mentorship sessions, and networking opportunities offered by ICCD to enhance your skills and grow your career in the digital economy.',
      badge: 'Every user contributes to a stronger, self-reliant, and collaborative Muslim digital community.',
      color: 'indigo'
    }
  ];

  const getColorClasses = (color) => ({
    blue: 'from-blue-500 to-blue-600',
    teal: 'from-teal-500 to-teal-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    amber: 'from-amber-500 to-amber-600',
    indigo: 'from-indigo-500 to-indigo-600'
  }[color]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section id="hero" className="relative py-20 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              How ICCD Talent Gate Works
            </h1>
            <p className="text-2xl md:text-3xl text-blue-100 mb-8">
              Simple. Secure. Empowering.
            </p>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              ICCD Talent Gate connects skilled professionals and organizations across the Muslim world — providing a trusted, transparent, and value-driven platform for digital collaboration. Here's how the process works, step by step.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="steps" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isStepVisible = isVisible('steps');
              
              return (
                <div
                  key={idx}
                  className={`transition-all duration-700 ${isStepVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <div 
                    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div className={`bg-gradient-to-r ${getColorClasses(step.color)} p-6 flex items-center space-x-4`}>
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Icon className="w-8 h-8 " />
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm font-semibold opacity-90">STEP {step.number}</div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl font-bold" style={{ color: `var(--${step.color}-600)` }}>
                        {step.number}
                      </div>
                    </div>
                    
                    <div className="p-8">
                      {step.description ? (
                        <p className="text-gray-700 text-lg leading-relaxed mb-6">{step.description}</p>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-blue-50 p-6 rounded-xl">
                            <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                              <Briefcase className="w-5 h-5 mr-2" />
                              For Freelancers
                            </h4>
                            <p className="text-gray-700 leading-relaxed">{step.freelancer}</p>
                          </div>
                          <div className="bg-teal-50 p-6 rounded-xl">
                            <h4 className="font-bold text-teal-900 mb-3 flex items-center">
                              <Users className="w-5 h-5 mr-2" />
                              For Employers
                            </h4>
                            <p className="text-gray-700 leading-relaxed">{step.employer}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className={`bg-gradient-to-r ${getColorClasses(step.color)} bg-opacity-10 p-4 rounded-lg border-l-4`} style={{ borderColor: `var(--${step.color}-500)` }}>
                        <p className="text-gray-800 font-medium flex items-start">
                          <span className="text-2xl mr-2">{['🖋️', '🔍', '💬', '💰', '⭐', '🌱'][idx]}</span>
                          {step.badge}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible('comparison') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-900 mb-4">
              A Platform That Works for Everyone
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
              Whether you're seeking opportunities or talent, ICCD Talent Gate has you covered
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Freelancers */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-blue-900">For Freelancers</h3>
                </div>
                
                <div className="space-y-4">
                  {freelancerBenefits.map((benefit, idx) => {
                    const BenefitIcon = benefit.icon;
                    return (
                      <div key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex items-center space-x-2">
                          <BenefitIcon className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-800 font-medium">{benefit.text}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Employers */}
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-teal-900">For Employers</h3>
                </div>
                
                <div className="space-y-4">
                  {employerBenefits.map((benefit, idx) => {
                    const BenefitIcon = benefit.icon;
                    return (
                      <div key={idx} className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm">
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="flex items-center space-x-2">
                          <BenefitIcon className="w-5 h-5 text-teal-600" />
                          <span className="text-gray-800 font-medium">{benefit.text}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 px-6 bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              💼 Join ICCD Talent Gate Today
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Empower your future, build your network, and contribute to a united digital economy across the Muslim world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-white text-blue-900 hover:bg-blue-50 font-bold py-5 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center">
                <UserPlus className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform" />
                Join as Freelancer
              </button>
              <button className="group bg-amber-500 hover:bg-amber-600 text-white font-bold py-5 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
                Hire a Professional
              </button>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white border-opacity-20">
              <p className="text-blue-100 text-sm">
                Trusted by professionals and organizations across 57 OIC member states
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}