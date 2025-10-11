import dp from "../assets/home/contact copy.png"
import ContactForm from '../component/Home/ContactForm';
import { Disc } from 'lucide-react';
import { Mail, MessageSquare, Phone } from 'lucide-react';

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
       <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0  bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50]
">
        {/* Decorative Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        
        {/* Wave Pattern */}
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.1)"/>
          <path d="M0,80 C240,48 480,48 720,80 C960,112 1200,112 1440,80 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.05)"/>
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        {/* Floating Icons */}
        <div className="absolute top-12 left-12 sm:left-20 animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <Mail className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="absolute top-16 right-16 sm:right-24 animate-bounce" style={{ animationDelay: '0.5s' }}>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="absolute bottom-32 left-1/4 animate-bounce" style={{ animationDelay: '1s' }}>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
            <Phone className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Main Text */}
        <div className="text-center z-10">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Decorative Dots */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>
    </div>

      {/* Main Content */}
      <main className="bg-[#F3FDF9] flex flex-col items-center w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                Everything businesses need to work with top freelancers
              </h2>
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                Get access to a curated network of independent professionals and the tools to manage and pay them.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3">
                <Disc className="text-teal-600 w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-2">
                    Find the right talent fast
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Browse our freelancer directory with 1,000+ trusted pros, ask for referrals, or let us find talent
                    for you.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Disc className="text-teal-600 w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-2">
                    Get work and payment management
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Easily manage contracts and invoices through our platform that streamlines the entire workflow from
                    project start to finish.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Disc className="text-teal-600 w-4 h-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-2">
                    Experience peace of mind
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Get dedicated support for every freelancing project, plus legal and compliance coverage that takes
                    the admin work off your plate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
         <ContactForm/>
        </div>
      </main>

     
    </div>
  )
}