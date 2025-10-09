import dp from "../assets/home/contact copy.png"
import ContactForm from '../component/Home/ContactForm';
import { Disc } from 'lucide-react';

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative w-full">
        <img
          src={dp}
          alt="Contact header"
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
        />
      </header>

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