import { useState } from "react";
import SidebarCard from "./sidebarcard";
import OrderOptions from "./OrderOptions";
import { useGetSingleGigs } from "../../../api/client/gigs";
import { useParams } from "react-router-dom";

export default function ServicePage() {
  const [activeNavTab, setActiveNavTab] = useState("Basic");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const { data, isLoading } = useGetSingleGigs(id);
  console.log(data)

  const gig = data?.[0];
  const gigInfo = gig?.gigsDescription;
  const freelancer = gig?.freelancerDetails;

  const selectedPackage = gig?.packagesDetails?.find(
    (pkg) => pkg.packageType.toLowerCase() === activeNavTab.toLowerCase()
  );

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {gigInfo?.gigsTitle}
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img
                className="w-14 h-14 rounded-full object-cover"
                src={freelancer?.freelancerPic}
                alt="freelancer"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {freelancer?.freelancerName}
                </h2>
                <p className="text-gray-500">UI Designer</p>
              </div>
            </div>
          </div>

          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <img
              src={gigInfo?.gigsFiles}
              alt="gig banner"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-bold mb-4">About this Gig</h3>
            <h4 className="text-xl font-semibold mb-2">{gigInfo?.gigsTitle}</h4>
            <p className="text-gray-700 leading-relaxed">{gigInfo?.gigsDescription}</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-bold mb-4">
              Get To Know {freelancer?.freelancerName}
            </h3>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <img
                className="w-24 h-24 rounded-xl object-cover shadow-md"
                src={freelancer?.freelancerPic || "/placeholder.svg"}
                alt={freelancer?.freelancerName}
              />
              <div>
                <h4 className="text-xl font-bold">{freelancer?.freelancerName}</h4>
                <div className="flex flex-wrap gap-2 my-2">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    UI Designer
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {freelancer?.FreelancerLanguages}
                  </span>
                </div>
                <p className="text-gray-700">
                  {freelancer?.freelancer_about_description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-12">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex">
                {["Basic", "Standard", "Premium"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveNavTab(type)}
                    className={`flex-1 py-4 text-center text-sm font-medium border-b-2 transition-all ${
                      activeNavTab.toLowerCase() === type.toLowerCase()
                        ? "border-black bg-green-50 text-black"
                        : "border-transparent text-gray-500 hover:text-black hover:bg-gray-50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <div className="p-4 space-y-4">
                {selectedPackage ? (
                  <>
                    <SidebarCard
                      price={selectedPackage.price}
                      description={`Package: ${selectedPackage.packageType}`}
                      deliverytime={selectedPackage.deliverytime || "3 Days"}
                      Revisions={selectedPackage.revisions}
                      pages={selectedPackage.pages}
                      sourceFile={selectedPackage.sourceFile}
                      vectorFile={selectedPackage.vectorFile}
                      socialMediaKit={selectedPackage.socialMediaKit}
                      logoTransparency={selectedPackage.logoTransparency}
                      printableFile={selectedPackage.printableFile}
                      stationeryDesigns={selectedPackage.stationeryDesigns}
                    />

                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
                    >
                      Continue
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-4 rounded-lg font-medium transition-colors">
          Contact me
        </button>
                  </>
                ) : (
                  <p className="text-red-500">Package not found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  {/* Order Options Modal */}
      {selectedPackage && (
        <OrderOptions
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          packageType={selectedPackage.packageType}
          packageDescription={selectedPackage.description}
          delivery={selectedPackage.deliverytime || "3 Days" }
          revisions={selectedPackage.revisions}
          basePrice={selectedPackage.price}
        />
      )}
    
    </div>
  );
}
