import { useState } from "react";
import SidebarCard from "./sidebarCard";
import OrderOptions from "./OrderOptions";
import { useGetSingleGigs } from "../../../api/client/gigs";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ICCDLoader from "../loader";
import GigCarousel from "./GigCarousel"; // Make sure the path is correct

export default function ServicePage() {
  const [activeNavTab, setActiveNavTab] = useState("Basic");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.user.userDetails);

  const { id } = useParams();
  const { data, isLoading } = useGetSingleGigs(id);

  const gig = data?.[0];
  const gigInfo = gig?.gigsDescription;
  const freelancer = gig?.freelancerDetails;

  // ✅ Dummy reviews (replace with API later if needed)
  const reviews = [
    {
      clientName: "Ali Khan",
      clientPic: "https://i.pravatar.cc/50?u=1",
      rating: 5,
      comment: "Amazing work! Delivered on time.",
      date: "2025-08-10",
    },
    {
      clientName: "Sara Ahmed",
      clientPic: "https://i.pravatar.cc/50?u=2",
      rating: 4,
      comment: "Good quality, but communication can improve.",
      date: "2025-08-15",
    },
  ];

  const selectedPackage = gig?.packagesDetails?.find(
    (pkg) => pkg?.packageType?.toLowerCase() === activeNavTab.toLowerCase()
  );

  if (isLoading) return <ICCDLoader />;

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gig Title & Freelancer */}
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
              </div>
            </div>
          </div>

          {/* Gig Images */}
          <GigCarousel images={gigInfo?.gigsFiles?.split(",")} />

          {/* About Gig */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-bold mb-4">About this Gig</h3>
            <h4 className="text-xl font-semibold mb-2">{gigInfo?.gigsTitle}</h4>
            <p className="text-gray-700 leading-relaxed">
              {gigInfo?.gigsDescription}
            </p>
          </div>

          {/* Freelancer Info */}
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
                <h4 className="text-xl font-bold">
                  {freelancer?.freelancerName}
                </h4>
                <div className="flex flex-wrap gap-2 my-2">
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

          {/* ✅ Reviews Section */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h3 className="text-2xl font-bold mb-4">Reviews</h3>

            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={review.clientPic || "/placeholder.svg"}
                        alt={review.clientName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold">{review.clientName}</p>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill={star <= review.rating ? "gold" : "lightgray"}
                              className="w-4 h-4"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.2 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.125 2.27a1 1 0 00-.364 1.118l1.2 3.674c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.125 2.27c-.785.57-1.84-.197-1.54-1.118l1.2-3.674a1 1 0 00-.364-1.118L3.046 9.101c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.2-3.674z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
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
                      type={selectedPackage.packageType}
                      price={selectedPackage.price}
                      title={selectedPackage.packageName}
                      description={selectedPackage.packageDescription}
                      deliverytime={selectedPackage.deliveryTime}
                      Revisions={selectedPackage.revisions}
                      packagesJson={selectedPackage.packages}
                    />

                    <button
                      onClick={() =>
                        userDetails === null
                          ? navigate("/login")
                          : setIsModalOpen(true)
                      }
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
          delivery={selectedPackage.deliverytime || "3 Days"}
          revisions={selectedPackage.revisions}
          basePrice={selectedPackage.price}
          freelancer_client_id={freelancer.freelancerClientId}
          freelancer_id={freelancer.freelancerId}
          gig_id={gigInfo?.gigsID}
          client_id={userDetails?.id}
        />
      )}
    </div>
  );
}
