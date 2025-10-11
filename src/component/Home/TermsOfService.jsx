import React, { useState } from 'react';
import { FileText, CheckCircle, Shield, Users, CreditCard, Scale, AlertCircle, Mail, Globe } from 'lucide-react';

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState(null);

  const sections = [
    {
      id: 1,
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Acceptance of Terms",
      content: "By registering, accessing, or using ICCD Talent Gate, you agree to abide by these Terms of Service, our Privacy Policy, and all applicable laws and regulations. If you do not agree with any part of these terms, please refrain from using the platform."
    },
    {
      id: 2,
      icon: <FileText className="w-5 h-5" />,
      title: "Purpose of the Platform",
      content: "ICCD Talent Gate serves as an intermediary marketplace connecting freelancers and clients across OIC member states and beyond. It aims to foster economic empowerment, job creation, and digital inclusion—with a special focus on facilitating remote work opportunities for Palestinian professionals and the wider Muslim community."
    },
    {
      id: 3,
      icon: <Users className="w-5 h-5" />,
      title: "User Eligibility",
      content: "To use ICCD Talent Gate, users must be at least 18 years old, provide accurate and verifiable information during registration, and comply with all applicable national and international laws. ICCD reserves the right to verify user information and suspend or terminate accounts that violate these terms."
    },
    {
      id: 4,
      icon: <Shield className="w-5 h-5" />,
      title: "User Accounts and Responsibilities",
      content: "Each user (freelancer or client) is responsible for maintaining confidentiality of login credentials, ensuring that all information provided is accurate and up to date, using the platform solely for lawful professional purposes, and refraining from impersonation, fraud, or the posting of false information."
    },
    {
      id: 5,
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Platform Usage",
      content: "Users agree to use ICCD Talent Gate ethically and responsibly. Prohibited activities include posting or sharing illegal, offensive, or discriminatory content, attempting to hack, reverse-engineer, or disrupt platform functionality, and conducting transactions or communications outside the platform in violation of ICCD policies."
    },
    {
      id: 6,
      icon: <CreditCard className="w-5 h-5" />,
      title: "Payments and Transactions",
      content: "All financial transactions between clients and freelancers are processed through secure, approved payment methods integrated within the platform. ICCD Talent Gate may deduct a small service fee to support platform operations and sustainability. ICCD is not liable for losses resulting from direct, off-platform payments or disputes conducted outside the system."
    },
    {
      id: 7,
      icon: <FileText className="w-5 h-5" />,
      title: "Intellectual Property Rights",
      content: "All platform content—including text, graphics, logos, and design—is the intellectual property of ICCD or its licensors. Users retain ownership of the work they produce but grant clients appropriate usage rights once payment is completed. Unauthorized use, reproduction, or redistribution of platform materials is strictly prohibited."
    },
    {
      id: 8,
      icon: <Scale className="w-5 h-5" />,
      title: "Dispute Resolution",
      content: "In case of disagreements between users (freelancers and clients), ICCD Talent Gate provides a structured dispute resolution mechanism. ICCD will act as a neutral intermediary to review evidence and make fair judgments. ICCD's decision will be final and binding within the scope of platform operations."
    },
    {
      id: 9,
      icon: <Shield className="w-5 h-5" />,
      title: "Limitation of Liability",
      content: "ICCD and its affiliates shall not be held liable for any indirect, incidental, or consequential damages resulting from the use or inability to use the platform. Users agree that they are responsible for verifying project details, payments, and engagements before entering into agreements."
    },
    {
      id: 10,
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Suspension and Termination",
      content: "ICCD reserves the right to suspend or permanently deactivate any account found to be violating platform policies or engaging in unethical or unlawful activity."
    },
    {
      id: 11,
      icon: <FileText className="w-5 h-5" />,
      title: "Updates to Terms",
      content: "ICCD may revise or update these Terms of Service periodically. Any changes will be posted on this page with the updated effective date. Continued use of the platform after updates constitutes acceptance of the revised terms."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#F3FDF9]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#47AAB3] to-[#3A9BA3] rounded-lg flex items-center justify-center shadow-md">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ICCD Talent Gate</h1>
                <p className="text-sm text-gray-600">Terms of Service</p>
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
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#47AAB3] to-[#5BC4CE] bg-clip-text text-transparent">
            Terms of Service
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Welcome to ICCD Talent Gate, a digital freelancing platform developed and managed by the Islamic Chamber of Commerce and Development (ICCD) under its Palestine Initiative. Please read these terms carefully before using the platform.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-6">
          {sections.map((section) => (
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
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.id}. {section.title}</h3>
                  </div>
                </div>
                <div className={`transform transition-transform ${activeSection === section.id ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {activeSection === section.id && (
                <div className="px-6 pb-6 pt-2">
                  <div className="pl-14 text-gray-700 leading-relaxed border-l-2 border-[#47AAB3]/30">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-[#47AAB3]/5 to-[#3A9BA3]/5 rounded-xl border border-[#47AAB3]/20 p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
            <Mail className="w-6 h-6 mr-3 text-[#47AAB3]" />
            Contact Information
          </h3>
          <p className="text-gray-700 mb-6">
            For questions, clarifications, or complaints regarding these Terms of Service, please contact:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 bg-white rounded-lg p-4 border border-gray-200 hover:border-[#47AAB3] transition-colors">
              <Mail className="w-5 h-5 text-[#47AAB3]" />
              <a href="mailto:support@iccdtalentgate.com" className="text-[#47AAB3] hover:text-[#3A9BA3] transition-colors font-medium">
                support@iccdtalentgate.com
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
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-gray-600 text-sm">
          <p>&copy; 2025 Islamic Chamber of Commerce and Development (ICCD). All rights reserved.</p>
          <p className="mt-2">Palestine Initiative - Empowering Digital Freelancing</p>
        </div>
      </footer>
    </div>
  );
}