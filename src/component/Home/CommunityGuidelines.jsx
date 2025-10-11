import React from 'react';
import { Users, Shield, Heart, Scale, Lock, Star, CreditCard, TrendingUp, AlertTriangle, Flag, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommunityGuidelines() {
  const navigate = useNavigate();

  const guidelines = [
    {
      id: 1,
      icon: <Award className="w-6 h-6" />,
      title: "Uphold Professional Integrity",
      color: "from-blue-500 to-cyan-500",
      description: "All members are expected to conduct themselves with honesty, fairness, and professionalism in every interaction. Misrepresentation of skills, qualifications, experience, or project details is strictly prohibited.",
      points: [
        "Deliver work commitments with quality and timeliness",
        "Provide accurate project scopes and payment details",
        "Avoid plagiarism, false claims, or unauthorized content sharing"
      ]
    },
    {
      id: 2,
      icon: <Heart className="w-6 h-6" />,
      title: "Respect and Inclusivity",
      color: "from-pink-500 to-rose-500",
      description: "ICCD Talent Gate values diversity and aims to foster a respectful community. Discrimination, hate speech, or harassment of any kind—based on religion, gender, nationality, ethnicity, or political beliefs—is not tolerated.",
      points: [
        "Maintain polite, constructive communication at all times",
        "Respect cultural, religious, and personal boundaries",
        "Use professional language in all messages, proposals, and content"
      ]
    },
    {
      id: 3,
      icon: <Scale className="w-6 h-6" />,
      title: "Ethical and Lawful Conduct",
      color: "from-amber-500 to-orange-500",
      description: "Users must comply with local and international laws while using the platform. Any illegal activity—fraud, money laundering, intellectual property theft, or malicious behavior—will lead to immediate suspension or termination.",
      points: [
        "Do not engage in any project or service that violates ethical or religious norms",
        "Respect ICCD's policies and the broader OIC principles of fair trade and integrity"
      ]
    },
    {
      id: 4,
      icon: <Lock className="w-6 h-6" />,
      title: "Confidentiality and Data Protection",
      color: "from-purple-500 to-indigo-500",
      description: "Respect for privacy and confidentiality is essential.",
      points: [
        "Do not share client or freelancer information publicly without consent",
        "Maintain confidentiality of project-related data and deliverables",
        "Comply with ICCD's Privacy Policy and data protection standards"
      ]
    },
    {
      id: 5,
      icon: <Star className="w-6 h-6" />,
      title: "Quality, Accountability, and Feedback",
      color: "from-[#3B90A0] to-[#2c6d7a]",
      description: "Each user contributes to the platform's credibility. Maintain consistent quality and professionalism to strengthen mutual trust.",
      points: [
        "Provide timely and constructive feedback after project completion",
        "Respond to communications within reasonable timeframes",
        "Report any unethical or suspicious activity to platform administrators"
      ]
    },
    {
      id: 6,
      icon: <CreditCard className="w-6 h-6" />,
      title: "Fair Payment and Dispute Handling",
      color: "from-emerald-500 to-teal-500",
      description: "All payments must be processed through the platform's secure system.",
      points: [
        "Avoid off-platform financial dealings",
        "Cooperate during dispute resolution to ensure fairness",
        "Treat ICCD's mediation outcomes with respect and adherence"
      ]
    },
    {
      id: 7,
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Building a Positive Impact",
      color: "from-green-500 to-lime-500",
      description: "As part of ICCD's Palestine Initiative, ICCD Talent Gate aspires to empower individuals through meaningful digital opportunities. Every user is encouraged to support this vision by contributing positively, mentoring peers, and promoting ethical collaboration within the Muslim digital economy.",
      points: []
    },
    {
      id: 8,
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Consequences of Violation",
      color: "from-red-500 to-pink-500",
      description: "Violation of these guidelines may result in:",
      points: [
        "Warnings or account suspension",
        "Permanent removal from the platform",
        "Legal action in cases involving fraud, abuse, or data violations"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-800">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3B90A0] to-[#2c6d7a] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ICCD Talent Gate</h1>
                <p className="text-sm text-gray-500">Community Guidelines</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Last Updated: <span className="text-[#3B90A0] font-medium">07-10-2025</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#3B90A0]/10 to-[#2c6d7a]/10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#3B90A0] to-[#2c6d7a] rounded-2xl mb-6 shadow-md">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#3B90A0] to-[#5fb3c3] bg-clip-text text-transparent">
              Community Guidelines
            </h2>
            <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
              Welcome to ICCD Talent Gate, an initiative of the Islamic Chamber of Commerce and Development (ICCD) established to empower freelancers and organizations across OIC member states—especially in Palestine—through a trusted, collaborative, and ethical digital marketplace.
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200 p-6 max-w-4xl mx-auto shadow-sm">
            <p className="text-gray-700 leading-relaxed text-center">
              Our goal is to create a respectful and transparent environment where professionals can connect, collaborate, and grow. These Community Guidelines outline the principles and standards expected of all users—freelancers, clients, and partners—on the platform.
            </p>
          </div>
        </div>
      </div>

      {/* Guidelines Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          {guidelines.map((guideline) => (
            <div
              key={guideline.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${guideline.color} rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow`}>
                    {guideline.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {guideline.id}. {guideline.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {guideline.description}
                    </p>
                  </div>
                </div>
                
                {guideline.points.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-[#3B90A0]/30 space-y-3">
                    {guideline.points.map((point, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <div className="w-1.5 h-1.5 bg-[#3B90A0] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm">{point}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Reporting Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-200 p-8 mb-8">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <Flag className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Reporting Misconduct</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Users can report misconduct or policy violations via the "Report an Issue" form on the platform or by emailing <strong>support@iccdtalentgate.org</strong>. Reports are confidential and will be reviewed promptly.
              </p>
              <button onClick={() => navigate('/report')} className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Report an Issue
              </button>
            </div>
          </div>
        </div>

        {/* Final Note */}
        <div className="bg-gradient-to-r from-[#3B90A0]/5 to-[#2c6d7a]/5 rounded-xl border border-[#3B90A0]/20 p-8">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#3B90A0] to-[#2c6d7a] rounded-xl flex items-center justify-center text-white flex-shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Our Commitment</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                ICCD Talent Gate is more than a freelancing platform—it is a community built on trust, shared values, and empowerment. Each member plays a role in making this digital ecosystem a source of opportunity, respect, and collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-gray-500 text-sm">
          <p>&copy; 2025 Islamic Chamber of Commerce and Development (ICCD). All rights reserved.</p>
          <p className="mt-2">Palestine Initiative - Empowering Digital Freelancing</p>
        </div>
      </footer>
    </div>
  );
}
