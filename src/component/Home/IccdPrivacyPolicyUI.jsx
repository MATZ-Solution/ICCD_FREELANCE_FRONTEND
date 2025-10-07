import React, { useState } from 'react';
import { Mail, Globe, FileText, ChevronDown, SunMoon, Shield, Lock, Eye, Users, Database, RefreshCw } from 'lucide-react';

export default function IccdPrivacyPolicyUI() {
  const [openSection, setOpenSection] = useState(null);
  const [dark, setDark] = useState(false);

  const toggle = (i) => setOpenSection(openSection === i ? null : i);

  const policy = {
    title: 'Privacy Policy',
    subtitle: 'ICCD Talent Gate',
    updated: '07-10-2025',
    intro:
      'ICCD Talent Gate ("we," "our," or "the Platform") is a digital freelancing marketplace developed by the Islamic Chamber of Commerce and Development (ICCD) to empower professionals—particularly from Palestine and OIC member states—through access to global work opportunities. This Privacy Policy explains how we collect, use, and protect your personal information.',
    sections: [
      {
        heading: '1. Information We Collect',
        icon: Database,
        content: [
          'Account Information: Name, email, phone number, country, professional details, and password when you register.',
          'Profile Data: Skills, portfolio, work experience, and uploaded materials.',
          'Transaction Data: Payment details, billing addresses, and transaction history (processed via secure third-party gateways).',
          'Usage Data: Device information, IP address, browser type, and access logs to improve platform performance.',
          'Communication Data: Messages exchanged between freelancers and clients within the platform.',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        icon: Eye,
        content: [
          'Operate, maintain, and improve the platforms functionality',
          'Facilitate connections between freelancers and clients.',
          'Process payments and maintain transaction records.',
          'Ensure compliance with ICCD policies and relevant laws.',
          'Communicate important updates, notifications, and support messages.',
          'Enhance user experience through analytics and service improvements.',
        ],
      },
      {
        heading: '3. Data Sharing and Disclosure',
        icon: Users,
        content: [
          'We do not sell, rent, or trade your personal data.',
          'Shared only with Service Providers, Legal Authorities, and Clients/Freelancers where necessary.',
          'All shared data follows strict confidentiality and security protocols.',
        ],
      },
      {
        heading: '4. Data Protection and Security',
        icon: Lock,
        content: [
          'We use encryption, secure servers, and regular audits to safeguard your information.',
          'Access to sensitive data is restricted to authorized personnel only.',
          'Users are responsible for maintaining the confidentiality of their login credentials.',
        ],
      },
      {
        heading: '5. Cookies and Tracking Technologies',
        icon: RefreshCw,
        content: [
          'Maintain user sessions and preferences.',
          'Analyze usage patterns for improving user experience.',
          'Deliver personalized content and features. Users can modify cookie settings through their browser preferences.',
        ],
      },
      {
        heading: '6. Your Rights',
        icon: Shield,
        content: [
          'Access, correct, or update your personal information.',
          'Request deletion of your account and associated data.',
          'Withdraw consent for data processing where applicable.',
          'Lodge a complaint if you believe your privacy rights have been violated. Requests can be submitted to privacy@iccdtalentgate.com',
        ],
      },
      {
        heading: '7. Data Retention',
        icon: Database,
        content: [
          'We retain personal data only as long as necessary for operational, legal, or compliance purposes.',
          'Inactive accounts may be anonymized or deleted after a defined period.',
        ],
      },
      {
        heading: '8. International Data Transfers',
        icon: Globe,
        content: [
          'User data may be processed or stored in multiple jurisdictions within OIC member states, ensuring that equivalent protection standards are maintained.',
        ],
      },
      {
        heading: '9. Policy Updates',
        icon: RefreshCw,
        content: [
          'This Privacy Policy may be updated periodically. Any changes will be reflected on this page, and continued use of the platform indicates acceptance of the updated policy.',
        ],
      },
      {
        heading: '10. Contact Us',
        icon: Mail,
        content: [
          'For questions or concerns regarding this policy, please contact: privacy@iccdtalentgate.com',
          'Website: www.iccdtalentgate.com',
        ],
      },
    ],
  };

  const bgClass = dark 
    ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
    : 'bg-gradient-to-br from-slate-50 via-white to-slate-100';
  
  const textClass = dark ? 'text-slate-100' : 'text-slate-900';
  const cardBg = dark ? 'bg-slate-800/50 backdrop-blur-xl border-slate-700/50' : 'bg-white/80 backdrop-blur-xl border-slate-200/50';
  const accentGradient = 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-all duration-500`}>
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-96 h-96 ${dark ? 'bg-indigo-500/10' : 'bg-indigo-500/5'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-0 left-0 w-96 h-96 ${dark ? 'bg-purple-500/10' : 'bg-purple-500/5'} rounded-full blur-3xl`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <header className={`${cardBg} rounded-3xl border shadow-2xl shadow-slate-900/5 p-6 sm:p-8 mb-8`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-5">
              <div className={`${accentGradient} rounded-2xl p-4 shadow-lg shadow-indigo-500/20`}>
                <Shield size={32} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  {policy.title}
                </h1>
                <p className="text-lg font-medium opacity-70">{policy.subtitle}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                  <p className="text-sm opacity-60">Updated {policy.updated}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button 
                onClick={() => setDark(!dark)} 
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border ${cardBg} hover:scale-105 transition-all duration-200 shadow-lg`}
              >
                <SunMoon size={16} />
                <span className="text-sm font-medium">{dark ? 'Light' : 'Dark'}</span>
              </button>
              <button 
                onClick={() => window.print()} 
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border ${cardBg} hover:scale-105 transition-all duration-200 shadow-lg`}
              >
                <FileText size={16} />
                <span className="text-sm font-medium">Print</span>
              </button>
              <a 
                href="mailto:privacy@iccdtalentgate.com" 
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl ${accentGradient} text-white hover:scale-105 transition-all duration-200 shadow-lg shadow-indigo-500/30`}
              >
                <Mail size={16} />
                <span className="text-sm font-medium">Contact</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className={`lg:col-span-1 ${cardBg} rounded-3xl border shadow-2xl shadow-slate-900/5 p-6 h-fit lg:sticky lg:top-8`}>
            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider opacity-50 mb-3">About</h3>
              <p className="text-sm leading-relaxed opacity-80">{policy.intro}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider opacity-50 mb-3">Quick Navigation</h3>
              <nav className="space-y-1">
                {policy.sections.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <button 
                      key={i}
                      onClick={() => toggle(i)} 
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-3 group ${
                        openSection === i 
                          ? `${dark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}` 
                          : 'hover:bg-slate-100/50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <Icon size={16} className="opacity-60" />
                      <span className="text-sm font-medium flex-1">{s.heading}</span>
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform duration-200 ${openSection === i ? 'rotate-180' : ''}`} 
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className={`mt-6 pt-6 border-t ${dark ? 'border-slate-700' : 'border-slate-200'}`}>
              <h3 className="text-sm font-semibold uppercase tracking-wider opacity-50 mb-3">Get in Touch</h3>
              <a 
                className="flex items-center gap-2 text-sm mb-2 hover:underline opacity-80" 
                href="mailto:privacy@iccdtalentgate.com"
              >
                <Mail size={14} /> privacy@iccdtalentgate.com
              </a>
              <a 
                className="flex items-center gap-2 text-sm hover:underline opacity-80" 
                href="https://www.iccdtalentgate.com" 
                target="_blank" 
                rel="noreferrer"
              >
                <Globe size={14} /> www.iccdtalentgate.com
              </a>
            </div>
          </aside>

          {/* Main Content Section */}
          <section className="lg:col-span-3 space-y-4">
            {policy.sections.map((s, i) => {
              const Icon = s.icon;
              return (
                <article 
                  key={i} 
                  className={`${cardBg} rounded-3xl border shadow-2xl shadow-slate-900/5 overflow-hidden transition-all duration-300 ${
                    openSection === i ? 'ring-2 ring-indigo-500/50' : ''
                  }`}
                >
                  <button 
                    onClick={() => toggle(i)} 
                    className="w-full p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`${accentGradient} rounded-xl p-3 shadow-lg shadow-indigo-500/20`}>
                        <Icon size={20} className="text-white" strokeWidth={1.5} />
                      </div>
                      <h2 className="text-xl font-semibold">{s.heading}</h2>
                    </div>
                    <ChevronDown 
                      size={22} 
                      className={`transition-transform duration-300 opacity-60 ${openSection === i ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  <div 
                    className={`transition-all duration-300 overflow-hidden ${
                      openSection === i ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className={`px-6 pb-6 border-t ${dark ? 'border-slate-700' : 'border-slate-200'}`}>
                      <div className="pt-6 space-y-3">
                        {s.content.map((line, idx) => (
                          <p key={idx} className="text-sm leading-relaxed opacity-80 pl-4 border-l-2 border-indigo-500/30">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Contact CTA */}
            <div className={`${cardBg} rounded-3xl border shadow-2xl shadow-slate-900/5 p-8 text-center`}>
              <h3 className="text-xl font-semibold mb-3">Have Questions?</h3>
              <p className="text-sm opacity-70 mb-6">
                If you have any questions about this policy, our privacy team is here to help.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a 
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${accentGradient} text-white hover:scale-105 transition-all duration-200 shadow-lg shadow-indigo-500/30`}
                  href="mailto:privacy@iccdtalentgate.com"
                >
                  <Mail size={16} /> Email Us
                </a>
                <a 
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl border ${cardBg} hover:scale-105 transition-all duration-200 shadow-lg`}
                  href="https://www.iccdtalentgate.com" 
                  target="_blank" 
                  rel="noreferrer"
                >
                  <Globe size={16} /> Visit Website
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-sm opacity-50">
            © {new Date().getFullYear()} ICCD Talent Gate — All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}