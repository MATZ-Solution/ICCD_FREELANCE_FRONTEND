import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  HelpCircle,
  Users,
  DollarSign,
  Shield,
  Globe,
  Award,
  Briefcase,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
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

  const faqs = [
    {
      id: 1,
      icon: HelpCircle,
      question: "What is ICCD Talent Gate?",
      answer:
        "ICCD Talent Gate is a freelancing platform developed by the Islamic Chamber of Commerce and Development (ICCD) to connect skilled professionals from across the Muslim world with global employers. It enables freelancers to find meaningful digital work opportunities while promoting ethical, inclusive, and value-driven employment across OIC member states.",
      category: "General",
    },
    {
      id: 2,
      icon: Users,
      question: "Who can join ICCD Talent Gate?",
      answer:
        "Anyone from an OIC member country or beyond who shares our values of professionalism, transparency, and ethical work can join. The platform is open to:",
      list: [
        "Freelancers offering digital or creative services",
        "Organizations, startups, or companies looking to hire skilled professionals",
        "Mentors, trainers, or institutions contributing to skill-building within the Muslim community",
      ],
      category: "Getting Started",
    },
    {
      id: 3,
      icon: Briefcase,
      question: "What types of services can be offered on ICCD Talent Gate?",
      answer: "Freelancers can offer services in diverse categories, including:",
      list: [
        "Information Technology & Software Development",
        "Graphic Design, Multimedia & Branding",
        "Business Consulting & Market Research",
        "Writing, Translation & Content Creation",
        "Marketing & Social Media Management",
        "Education, Training & E-learning",
        "Financial, Legal, and Administrative Support",
      ],
      note: "(More service categories will be added as the platform evolves.)",
      category: "Services",
    },
    {
      id: 4,
      icon: Award,
      question:
        "How is ICCD Talent Gate different from other freelancing websites?",
      answer:
        "Unlike conventional freelancing platforms, ICCD Talent Gate is community-centric and ethically guided. It focuses on:",
      list: [
        "Building opportunities across Muslim-majority countries",
        "Encouraging fair pay and professional integrity",
        "Offering verified user profiles and transparent processes",
        "Connecting professionals and organizations aligned with Islamic values",
        "Supporting regional economic development through digital transformation",
      ],
      category: "Platform Features",
    },
    {
      id: 5,
      icon: DollarSign,
      question: "How do freelancers get paid?",
      answer:
        "All payments are processed through a secure payment gateway integrated within the platform. Once a client approves the completed work, payment is released to the freelancer's account. The process ensures fairness and transparency at every step.",
      category: "Payments",
    },
    {
      id: 6,
      icon: DollarSign,
      question: "Are there any fees for joining or using the platform?",
      answer:
        "Registration on ICCD Talent Gate is free for both freelancers and employers. A small service fee is deducted only after successful project completion — ensuring that costs are linked to outcomes, not participation.",
      category: "Payments",
    },
    {
      id: 7,
      icon: Shield,
      question: "How are users verified on the platform?",
      answer:
        "Each user undergoes an account verification process, which includes:",
      list: [
        "Email and identity verification",
        "Optional portfolio or document uploads for credibility",
        "Administrative review to ensure authenticity and compliance with ICCD's ethical standards",
      ],
      category: "Security",
    },
    {
      id: 8,
      icon: Globe,
      question: "Is the platform available globally?",
      answer:
        "Yes. ICCD Talent Gate is open to users worldwide, though it prioritizes talent and organizations from OIC member states. Employers from any country can hire freelancers, and freelancers from across the Muslim world can serve international clients.",
      category: "General",
    },
    {
      id: 9,
      icon: Shield,
      question: "How does ICCD ensure data privacy and security?",
      answer:
        "ICCD Talent Gate follows strict data protection protocols and international privacy standards. All user data is encrypted, securely stored, and used only for operational purposes. We never sell or share personal data with third parties without consent. (See our Privacy Policy for details.)",
      category: "Security",
    },
    {
      id: 10,
      icon: MessageSquare,
      question: "What if I face an issue with a project or payment?",
      answer:
        'The platform includes a dispute resolution mechanism managed by ICCD\'s moderation team. Users can report issues through the "Report a Problem" form, and our support team will investigate promptly to ensure fair and transparent outcomes.',
      category: "Support",
    },
  ];

  const categories = ["All", ...new Set(faqs.map((faq) => faq.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id) => setOpenFAQ(openFAQ === id ? null : id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section
        id="hero"
        className="relative py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-[#44A4AD] via-[#36969E] to-[#1E7B82] text-white"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <HelpCircle className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 text-[#07383c]" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-md sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Everything you need to know about ICCD Talent Gate
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 px-4 sm:px-6 md:px-8 bg-white sticky top-0 z-30 shadow">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] text-white shadow-md scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ List */}
      <section id="faqs" className="py-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg sm:text-xl text-gray-500">
                No questions found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] text-white font-semibold"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq, idx) => {
              const Icon = faq.icon;
              const isOpen = openFAQ === faq.id;

              return (
                <div
                  key={faq.id}
                  className="transition-all duration-500 overflow-hidden"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex items-start justify-between px-4 sm:px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start space-x-4 flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                            isOpen
                              ? "bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50]"
                              : "bg-blue-100"
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              isOpen ? "text-white" : "text-[#3D949C]"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs font-semibold text-[#3D949C] bg-blue-50 px-2 py-0.5 rounded-full mb-1 inline-block">
                            {faq.category}
                          </span>
                          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-4 sm:px-6 py-2 pl-16">
                        <p className="text-gray-700 leading-relaxed mb-2 text-sm sm:text-base">
                          {faq.answer}
                        </p>
                        {faq.list && (
                          <ul className="space-y-1 mb-2">
                            {faq.list.map((item, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 text-sm sm:text-base">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {faq.note && (
                          <p className="text-xs sm:text-sm text-gray-500 italic">
                            {faq.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        className="py-12 sm:py-16 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50] text-white text-center"
      >
        <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-amber-400" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
          Still Have Questions?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto mb-6 sm:mb-8">
          Our support team is here to help you. Reach out and we'll get back to
          you as soon as possible.
        </p>

        <a
          href="mailto:support@iccdfreelance.com"
          className="inline-block bg-white text-black hover:bg-blue-50 font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-full text-sm sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-md sm:shadow-2xl"
        >
          <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
          Contact Support
        </a>

        <div className="mt-8 pt-6 border-t border-white border-opacity-20 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <div>
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-[#42d7e5]" />
            <p className="text-xs sm:text-sm text-blue-100">Secure Platform</p>
          </div>
          <div>
            <Users className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-[#42d7e5]" />
            <p className="text-xs sm:text-sm text-blue-100">Community Driven</p>
          </div>
          <div>
            <Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 text-[#42d7e5]" />
            <p className="text-xs sm:text-sm text-blue-100">Ethically Guided</p>
          </div>
        </div>
      </section>
    </div>
  );
}
