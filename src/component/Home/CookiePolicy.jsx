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
      description: "These cookies are necessary for the platform to function properly. They enable core features such as user login, account security, and navigation. Without these cookies, the platform may not operate as intended.",
      status: "Always Active"
    },
    {
      id: 'performance',
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Performance and Analytics Cookies",
      color: "from-[#47AAB3] to-[#3A9BA3]",
      description: "These cookies help us understand how users interact with the platform by collecting anonymous data on usage patterns. The information gathered is used to improve website functionality, content, and user experience.",
      status: "Optional"
    },
    {
      id: 'functional',
      icon: <Settings className="w-5 h-5" />,
      title: "Functional Cookies",
      color: "from-blue-500 to-cyan-500",
      description: "These cookies allow the platform to remember your preferences, such as language settings, saved filters, or user role (freelancer/client), providing a more personalized experience.",
      status: "Optional"
    },
    {
      id: 'marketing',
      icon: <Target className="w-5 h-5" />,
      title: "Advertising and Marketing Cookies",
      color: "from-purple-500 to-pink-500",
      description: "These cookies may be used in the future to deliver targeted information about ICCD programs, events, and opportunities relevant to users' interests. Currently, ICCD Talent Gate does not use third-party advertising networks.",
      status: "Not Currently Used"
    }
  ];

  const infoSections = [
    {
      id: 1,
      icon: <Info className="w-5 h-5" />,
      title: "What Are Cookies?",
      content: "Cookies are small text files that are stored on your device (computer, tablet, or smartphone) when you visit a website. They help the website recognize your device and remember information about your visit, such as login preferences, language, and session details."
    },
    {
      id: 2,
      icon: <CheckCircle className="w-5 h-5" />,
      title: "How We Use Cookies",
      points: [
        "Maintain secure user sessions and prevent unauthorized access",
        "Improve website navigation and responsiveness",
        "Analyze usage trends and measure performance metrics",
        "Enhance content relevance and platform personalization",
        "Support technical functions such as load balancing and server optimization"
      ]
    },
    {
      id: 3,
      icon: <Globe className="w-5 h-5" />,
      title: "Third-Party Cookies",
      content: "Some cookies may be placed by trusted third-party service providers (e.g., analytics tools or payment gateways) that assist ICCD in maintaining and improving platform performance. These providers process information according to their own privacy policies, aligned with ICCD's data protection standards."
    },
    {
      id: 4,
      icon: <Settings className="w-5 h-5" />,
      title: "Managing and Disabling Cookies",
      content: "You can control or delete cookies through your browser settings. Most browsers allow you to view which cookies are stored on your device, delete existing cookies, and block all or specific types of cookies. However, disabling essential cookies may affect the functionality and usability of the ICCD Talent Gate platform."
    },
    {
      id: 5,
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Updates to This Policy",
      content: "We may update this Cookie Policy periodically to reflect changes in technology, law, or our operational practices. Any updates will be posted on this page with a revised 'Last Updated' date."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#F3FDF9]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#47AAB3] to-[#3A9BA3] rounded-lg flex items-center justify-center shadow-md">
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ICCD Talent Gate</h1>
                <p className="text-sm text-gray-600">Cookie Policy</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Last Updated: <span className="text-[#47AAB3] font-semibold">07-10-2025</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#47AAB3]/10 to-[#3A9BA3]/10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#47AAB3] to-[#3A9BA3] rounded-2xl mb-6 shadow-lg">
            <Cookie className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#47AAB3] to-[#5BC4CE] bg-clip-text text-transparent">
            Cookie Policy
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            This Cookie Policy explains how ICCD Talent Gate uses cookies and similar technologies to enhance your browsing experience, analyze platform performance, and ensure secure and efficient functionality.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Cookie Types Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-gray-900 flex items-center">
            <Cookie className="w-6 h-6 mr-3 text-[#47AAB3]" />
            Types of Cookies We Use
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie) => (
              <div
                key={cookie.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#47AAB3] hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${cookie.color} rounded-lg flex items-center justify-center text-white shadow-md`}>
                    {cookie.icon}
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    cookie.status === 'Always Active' 
                      ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                      : cookie.status === 'Not Currently Used'
                      ? 'bg-gray-200 text-gray-600 border border-gray-300'
                      : 'bg-[#47AAB3]/10 text-[#47AAB3] border border-[#47AAB3]/20'
                  }`}>
                    {cookie.status}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{cookie.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{cookie.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Information Sections */}
        <div className="grid gap-6 mb-12">
          {infoSections.map((section) => (
            <div
              key={section.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#47AAB3] hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-[#47AAB3]/10 rounded-lg flex items-center justify-center text-[#47AAB3]">
                    {section.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                </div>
                <div className={`transform transition-transform ${activeSection === section.id ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {activeSection === section.id && (
                <div className="px-6 pb-6 pt-2">
                  <div className="pl-14 border-l-2 border-[#47AAB3]/30">
                    {section.content ? (
                      <p className="text-gray-700 leading-relaxed">{section.content}</p>
                    ) : (
                      <ul className="space-y-3">
                        {section.points.map((point, idx) => (
                          <li key={idx} className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[#47AAB3] flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[#47AAB3]/5 to-[#3A9BA3]/5 rounded-xl border border-[#47AAB3]/20 p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
            <Mail className="w-6 h-6 mr-3 text-[#47AAB3]" />
            Contact Information
          </h3>
          <p className="text-gray-700 mb-6">
            If you have questions or concerns about this Cookie Policy, please contact:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-white rounded-lg p-4 border border-gray-200 hover:border-[#47AAB3] transition-colors">
              <Mail className="w-5 h-5 text-[#47AAB3]" />
              <a href="mailto:privacy@iccdtalentgate.com" className="text-[#47AAB3] hover:text-[#3A9BA3] transition-colors font-medium">
                privacy@iccdtalentgate.com
              </a>
            </div>
            <div className="flex items-center space-x-3 bg-white rounded-lg p-4 border border-gray-200 hover:border-[#47AAB3] transition-colors">
              <Globe className="w-5 h-5 text-[#47AAB3]" />
              <a href="https://www.iccdtalentgate.com" className="text-[#47AAB3] hover:text-[#3A9BA3] transition-colors font-medium">
                www.iccdtalentgate.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-600 text-sm">
          <p>&copy; 2025 Islamic Chamber of Commerce and Development (ICCD). All rights reserved.</p>
          <p className="mt-2">Palestine Initiative - Empowering Digital Freelancing</p>
        </div>
      </footer>
    </div>
  );
}