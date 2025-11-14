import React, { useState } from 'react';
import { Cookie, Shield, BarChart3, Settings, Target, Globe, Mail, Info, CheckCircle, AlertCircle } from 'lucide-react';

export default function CookiePolicy() {
  const [activeSection, setActiveSection] = useState(null);

  const cookieTypes = [
    {
      id: 'essential',
      icon: <Shield className="w-5 h-5" />,
      title: "Essential Cookies",
      color: "from-emerald-500 to-teal-500",
      description: "Necessary for core features like login, security, and navigation.",
      status: "Always Active"
    },
    {
      id: 'performance',
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Performance Cookies",
      color: "from-[#47AAB3] to-[#3A9BA3]",
      description: "Collect anonymous data to improve website functionality.",
      status: "Optional"
    },
    {
      id: 'functional',
      icon: <Settings className="w-5 h-5" />,
      title: "Functional Cookies",
      color: "from-blue-500 to-cyan-500",
      description: "Remember preferences like language settings and filters.",
      status: "Optional"
    },
    {
      id: 'marketing',
      icon: <Target className="w-5 h-5" />,
      title: "Marketing Cookies",
      color: "from-purple-500 to-pink-500",
      description: "May be used to deliver targeted content in the future.",
      status: "Not Currently Used"
    }
  ];

  const infoSections = [
    {
      id: 1,
      icon: <Info className="w-5 h-5" />,
      title: "What Are Cookies?",
      content: "Cookies are small text files stored on your device that help the website recognize your device and remember information about your visit."
    },
    {
      id: 2,
      icon: <CheckCircle className="w-5 h-5" />,
      title: "How We Use Cookies",
      points: [
        "Maintain secure user sessions",
        "Improve website navigation",
        "Analyze usage trends",
        "Enhance content relevance",
        "Support technical functions"
      ]
    },
    {
      id: 3,
      icon: <Globe className="w-5 h-5" />,
      title: "Third-Party Cookies",
      content: "Some cookies may be placed by trusted third-party services aligned with ICCD's standards."
    },
    {
      id: 4,
      icon: <Settings className="w-5 h-5" />,
      title: "Managing Cookies",
      content: "You can control or delete cookies through browser settings, though disabling essential cookies may affect platform functionality."
    },
    {
      id: 5,
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Policy Updates",
      content: "Updates may be posted periodically on this page."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#47AAB3] to-[#3A9BA3] rounded-lg flex items-center justify-center shadow-md">
              <Cookie className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 sm:text-xl">ICCD Talent Gate</h1>
              <p className="text-xs sm:text-sm text-gray-600">Cookie Policy</p>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            Last Updated: <span className="text-[#47AAB3] font-semibold">07-10-2025</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center bg-gradient-to-r from-[#47AAB3]/10 to-[#3A9BA3]/10 border-b border-gray-200 py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#47AAB3] to-[#3A9BA3] rounded-xl mb-4 shadow-md">
            <Cookie className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-[#47AAB3] to-[#5BC4CE] bg-clip-text text-transparent">
            Cookie Policy
          </h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            Explains how ICCD Talent Gate uses cookies to enhance your experience, analyze performance, and ensure secure functionality.
          </p>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-gray-900">
          <Cookie className="w-5 h-5 mr-2 text-[#47AAB3]" /> Types of Cookies We Use
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {cookieTypes.map((cookie) => (
            <div
              key={cookie.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[#47AAB3] hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${cookie.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
                  {cookie.icon}
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  cookie.status === 'Always Active' 
                    ? 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                    : cookie.status === 'Not Currently Used'
                    ? 'bg-gray-100 text-gray-600 border border-gray-300'
                    : 'bg-[#47AAB3]/10 text-[#47AAB3] border border-[#47AAB3]/20'
                }`}>
                  {cookie.status}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-semibold mb-1 text-gray-900">{cookie.title}</h4>
              <p className="text-gray-600 text-xs sm:text-sm leading-snug">{cookie.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info Sections */}
      <section className="max-w-5xl mx-auto px-4 py-6 space-y-3">
        {infoSections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200"
          >
            <button
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#47AAB3]/10 rounded-lg flex items-center justify-center text-[#47AAB3]">
                  {section.icon}
                </div>
                <h4 className="text-sm sm:text-base font-semibold text-gray-900">{section.title}</h4>
              </div>
              <div className={`${activeSection === section.id ? 'rotate-180' : ''} transition-transform`}>
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            {activeSection === section.id && (
              <div className="px-4 pb-4 pt-2">
                <div className="pl-10 border-l-2 border-[#47AAB3]/30">
                  {section.content ? (
                    <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">{section.content}</p>
                  ) : (
                    <ul className="space-y-2">
                      {section.points.map((point, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-gray-700 text-xs sm:text-sm">
                          <CheckCircle className="w-4 h-4 text-[#47AAB3] flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Contact Section */}
      <section className="max-w-5xl mx-auto px-4 py-8 bg-gradient-to-r from-[#47AAB3]/5 to-[#3A9BA3]/5 rounded-xl border border-[#47AAB3]/20">
        <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center text-gray-900">
          <Mail className="w-5 h-5 mr-2 text-[#47AAB3]" /> Contact Information
        </h3>
        <p className="text-gray-700 text-xs sm:text-sm mb-4">
          If you have questions or concerns about this Cookie Policy, please contact:
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 gap-2">
          <a href="mailto:privacy@iccdtalentgate.com" className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-gray-200 hover:border-[#47AAB3] transition-colors text-xs sm:text-sm">
            <Mail className="w-4 h-4 text-[#47AAB3]" /> <span>privacy@iccdtalentgate.com</span>
          </a>
          <a href="https://www.iccdtalentgate.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-gray-200 hover:border-[#47AAB3] transition-colors text-xs sm:text-sm">
            <Globe className="w-4 h-4 text-[#47AAB3]" /> <span>www.iccdtalentgate.com</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-white text-center text-gray-600 text-xs sm:text-sm py-4">
        <p>&copy; 2025 Islamic Chamber of Commerce and Development (ICCD). All rights reserved.</p>
        <p>Palestine Initiative - Empowering Digital Freelancing</p>
      </footer>
    </div>
  );
}
