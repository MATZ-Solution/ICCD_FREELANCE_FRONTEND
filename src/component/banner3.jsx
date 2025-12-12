import { useState } from 'react';

const ModernBanner = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      label: 'For Clients',
      title: 'Hire Top Talent',
      subtitle: 'Connect with skilled professionals ready to bring your vision to life',
      features: [
        'Legit Source freelancers',
        'Post jobs in minutes',
        'Secure payments',
        'Dedicated support'
      ],
      cta: 'Get Started',
      route: '/post-job',
      gradient: 'from-[#1C4C50] to-[#1C4C50]'
    },
    {
      id: 1,
      label: 'For Freelancers',
      title: 'Find Great Work',
      subtitle: 'Discover opportunities that match your skills and grow your career',
      features: [
        'Thousands of jobs daily',
        'Flexible work options',
        'Fair compensation',
        'Build your portfolio'
      ],
      cta: 'Start Freelancing',
      route: '/find-work',
      gradient: 'from-[#1C4C50] to-[#1C4C50]'
    },
    {
      id: 2,
      label: 'For Agencies',
      title: 'Scale Your Business',
      subtitle: 'Expand your team on-demand with vetted professionals',
      features: [
        'Team collaboration tools',
        'Enterprise solutions',
        'Vetted talent pool',
        'Custom workflows'
      ],
      cta: 'Learn More',
      route: '/agencies',
      gradient: 'from-[#1C4C50] to-[#1C4C50]'
    }
  ];

  const currentTab = tabs[activeTab];

  const handleNavigation = (route) => {
    console.log('Navigate to:', route);
    // You can integrate with your router here
  };

  return (
    <div className="px-3 sm:px-10 mt-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#1C4C50] via-[#2E7A81] to-[#1C4C50]">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 p-8 sm:p-12 md:p-16">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-12 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-lg scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Content */}
              <div className="text-center md:text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {currentTab.title}
                </h1>
                <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 leading-relaxed">
                  {currentTab.subtitle}
                </p>
                
                <button
                  onClick={() => handleNavigation(currentTab.route)}
                  className={`bg-gradient-to-r ${currentTab.gradient} text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300`}
                >
                  {currentTab.cta}
                </button>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 sm:gap-8 mt-8 sm:mt-12 justify-center md:justify-start">
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold text-white">100+</div>
                    <div className="text-slate-400 text-sm mt-1">Professionals</div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold text-white">10+</div>
                    <div className="text-slate-400 text-sm mt-1">Projects Done</div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-bold text-white">98%</div>
                    <div className="text-slate-400 text-sm mt-1">Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Features Card */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Why Choose Us?
                </h3>
                <div className="space-y-4">
                  {currentTab.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 group"
                    >
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentTab.gradient} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-200 group-hover:text-white transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernBanner;