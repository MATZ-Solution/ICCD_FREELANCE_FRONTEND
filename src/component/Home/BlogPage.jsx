import React, { useState } from 'react';
import { Newspaper, Globe, TrendingUp, Users, Calendar, Clock, ArrowRight, BookOpen, Target, Briefcase } from 'lucide-react';

export default function BlogPage() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "Empowering Palestine Through Digital Opportunities",
      subtitle: "How ICCD Talent Gate is Building Pathways to Sustainable Livelihoods",
      category: "Impact Stories",
      date: "October 2025",
      readTime: "5 min read",
      icon: <Target className="w-6 h-6" />,
      gradient: "from-emerald-500 to-teal-500",
      excerpt: "In the heart of adversity, innovation often becomes the most powerful tool for resilience. The ICCD Talent Gate is transforming potential into practical, sustainable livelihoods.",
      content: [
        "In the heart of adversity, innovation often becomes the most powerful tool for resilience. The ICCD Talent Gate, an initiative under the Islamic Chamber of Commerce and Development (ICCD), is one such innovation — designed to unlock digital economic opportunities for Palestinians and the wider Muslim community. As part of ICCD's Palestine Initiative, the platform aims to bridge the gap between talented individuals in conflict-affected regions and global employers seeking specialized skills.",
        "For years, Palestinians have faced severe economic challenges, with unemployment rates hovering above 45% in Gaza and around 25% in the West Bank, according to the World Bank. Despite these hardships, the Palestinian youth have demonstrated remarkable educational attainment and digital literacy — creating a strong foundation for participation in the global digital economy. ICCD Talent Gate transforms this potential into practical, sustainable livelihoods by connecting skilled freelancers with businesses and organizations worldwide.",
        "Through this platform, Palestinian professionals can offer their expertise in technology, design, marketing, writing, and consulting — without needing to migrate or relocate. The platform's secure payment infrastructure ensures fairness, transparency, and protection for all parties involved. By leveraging digital connectivity, ICCD Talent Gate empowers individuals to work remotely, generate income, and regain control over their economic destinies.",
        "More importantly, this initiative transcends economics. It restores dignity, self-reliance, and hope, transforming freelancing from a gig economy concept into a social development mechanism. With continued support from OIC member states, the platform is set to become a cornerstone of digital empowerment and economic inclusion across Palestine — helping transform resilience into opportunity."
      ],
      stats: [
        { label: "Unemployment in Gaza", value: "45%" },
        { label: "Unemployment in West Bank", value: "25%" },
        { label: "Focus Areas", value: "Tech, Design, Marketing" }
      ]
    },
    {
      id: 2,
      title: "Building a Digital Ummah",
      subtitle: "The Vision Behind ICCD Talent Gate",
      category: "Vision & Mission",
      date: "October 2025",
      readTime: "4 min read",
      icon: <Globe className="w-6 h-6" />,
      gradient: "from-[#3B90A0] to-[#2c6d7a]",
      excerpt: "A platform where skills meet purpose across the Muslim world. Discover how ICCD Talent Gate is creating a connected network of professionals grounded in Islamic values.",
      content: [
        "The Muslim world represents nearly two billion people, spanning over 57 nations under the Organization of Islamic Cooperation (OIC). Yet, despite abundant talent and creativity, economic fragmentation and limited digital access prevent millions of skilled individuals from participating fully in the global economy. Recognizing this gap, the Islamic Chamber of Commerce and Development (ICCD) launched the ICCD Talent Gate — a digital freelancing platform built on Islamic values of cooperation, transparency, and empowerment.",
        "The platform functions as an ethical and inclusive marketplace where freelancers and organizations can connect seamlessly. Whether it's a web developer in Palestine, a designer in Malaysia, or a marketing strategist in Morocco, ICCD Talent Gate brings them together under one trusted digital ecosystem that prioritizes collaboration over competition. By integrating advanced features such as user verification, skill-based matching algorithms, and dispute resolution mechanisms, the platform ensures a safe and credible environment for all users.",
        "What sets ICCD Talent Gate apart from other freelancing platforms like Fiverr or Upwork is its community-first approach. The platform is not driven by profit margins but by developmental impact — ensuring equitable opportunities, fair pricing, and ethical work standards. Moreover, it embodies the Islamic principles of fair trade, honesty, and social justice, enabling freelancers to build careers grounded in both professional excellence and moral integrity.",
        "The long-term vision extends beyond individual success. ICCD Talent Gate aspires to cultivate a digital Ummah — a connected network of Muslim professionals who collaborate, innovate, and contribute to the collective growth of the Islamic economy. By empowering individuals to work across borders, it fosters not only digital transformation but also unity and shared prosperity within the OIC community."
      ],
      stats: [
        { label: "OIC Nations", value: "57" },
        { label: "Muslim Population", value: "2 Billion" },
        { label: "Core Values", value: "Ethics & Justice" }
      ]
    },
    {
      id: 3,
      title: "The Future of Work in the Muslim World",
      subtitle: "How ICCD Talent Gate is Driving Digital Transformation and Employment",
      category: "Future of Work",
      date: "October 2025",
      readTime: "6 min read",
      icon: <TrendingUp className="w-6 h-6" />,
      gradient: "from-blue-500 to-purple-500",
      excerpt: "The global freelance economy is set to surpass $455 billion by 2030. Discover how ICCD Talent Gate is positioning the Muslim world at the forefront of this transformation.",
      content: [
        "The future of work is digital — and ICCD Talent Gate is positioning the Muslim world at the forefront of this transformation. The global freelance economy is expected to surpass $455 billion by 2030, with remote work and online contracting becoming dominant employment models. Yet, many OIC countries, including Palestine, remain on the periphery of this digital revolution due to limited infrastructure, access, and localized platforms. ICCD Talent Gate aims to change this narrative.",
        "Developed under ICCD's broader Digital Transformation of Chambers and Palestine Initiative, the platform acts as a digital employment accelerator — connecting talent-rich but opportunity-poor communities with clients across the world. Its mission is clear: to reduce unemployment, increase income mobility, and promote digital inclusion. By integrating project management tools, secure payment systems, and capacity-building features, the platform enables freelancers to grow their skills while building sustainable income streams.",
        "For Palestinian professionals, the impact could be profound. Freelancing allows them to overcome barriers caused by restricted mobility and unstable local markets. It also encourages economic resilience, enabling participation in global supply chains through digital means. By facilitating thousands of small-scale digital contracts, ICCD Talent Gate could become a major driver of local GDP growth and youth employment across Palestine.",
        "On a broader scale, the platform aligns with global efforts toward inclusive digital economies — echoing the UN Sustainable Development Goals (SDGs) related to decent work, innovation, and economic growth. It represents ICCD's vision of a world where technology is not a privilege but a bridge — connecting capability with opportunity and transforming challenges into catalysts for progress."
      ],
      stats: [
        { label: "Freelance Market by 2030", value: "$455B" },
        { label: "Employment Model", value: "Remote Work" },
        { label: "Alignment", value: "UN SDGs" }
      ]
    }
  ];

  const BlogCard = ({ blog, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-[#47AAB3] hover:shadow-xl transition-all duration-300 cursor-pointer group hover:transform hover:scale-[1.02]"
    >
      <div className={`h-2 bg-gradient-to-r ${blog.gradient}`}></div>
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs px-3 py-1 rounded-full bg-[#47AAB3]/10 text-[#47AAB3] border border-[#47AAB3]/20 font-medium">
            {blog.category}
          </span>
          <div className={`w-10 h-10 bg-gradient-to-br ${blog.gradient} rounded-lg flex items-center justify-center text-white shadow-md`}>
            {blog.icon}
          </div>
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 group-hover:text-[#47AAB3] transition-colors">
          {blog.title}
        </h3>
        <p className="text-[#47AAB3] text-sm sm:text-base font-semibold mb-2 sm:mb-3">{blog.subtitle}</p>
        <p className="text-gray-600 text-sm sm:text-sm leading-relaxed mb-3 sm:mb-4">{blog.excerpt}</p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t border-gray-200 text-xs sm:text-sm text-gray-500">
          <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[#47AAB3] text-sm font-semibold group-hover:gap-3 transition-all">
            <span>Read More</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );

  const BlogDetail = ({ blog, onClose }) => (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onClose}
            className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-[#47AAB3] transition-colors bg-white px-3 sm:px-4 py-2 rounded-lg shadow-md"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span className="font-medium text-sm sm:text-base">Back to Blog</span>
          </button>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
            <div className={`h-2 sm:h-3 bg-gradient-to-r ${blog.gradient}`}></div>
            
            <div className="p-6 sm:p-10 md:p-12">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                <span className="text-xs px-2 py-1 rounded-full bg-[#47AAB3]/10 text-[#47AAB3] border border-[#47AAB3]/20 font-medium">
                  {blog.category}
                </span>
                <div className="flex items-center space-x-2 sm:space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">{blog.title}</h1>
              <p className="text-lg sm:text-xl md:text-2xl text-[#47AAB3] font-semibold mb-6 sm:mb-8">{blog.subtitle}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {blog.stats.map((stat, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-[#47AAB3]/5 to-[#47AAB3]/10 rounded-lg p-4 text-center border border-[#47AAB3]/20">
                    <div className="text-xl sm:text-2xl font-bold text-[#47AAB3] mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
              
              {/* Content */}
              <div className="space-y-4 sm:space-y-6">
                {blog.content.map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed text-sm sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-[#F3FDF9]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#47AAB3] to-[#3A9BA3] rounded-lg flex items-center justify-center shadow-md">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">ICCD Talent Gate</h1>
              <p className="text-xs sm:text-sm text-gray-600">Blog & Insights</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#47AAB3]/10 to-[#3A9BA3]/10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-[#47AAB3] to-[#3A9BA3] rounded-2xl mb-4 sm:mb-6 shadow-lg">
            <BookOpen className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-[#47AAB3] to-[#5BC4CE] bg-clip-text text-transparent">
            Insights & Stories
          </h2>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            Discover how ICCD Talent Gate is transforming lives, empowering communities, and building the future of digital work across the Muslim world.
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onClick={() => setSelectedBlog(blog)}
            />
          ))}
        </div>
      </div>


      {/* Blog Detail Modal */}
      {selectedBlog && (
        <BlogDetail blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </div>
  );
}
