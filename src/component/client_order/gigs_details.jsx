import { useState } from "react";
import blog1 from "../../assets/client_dashboard/blog1.png";
import { Star, Stars } from "lucide-react";
import SidebarCard from "./sidebarcard";
import { useGetSingleGigs } from "../../../api/client/gigs";
import { useParams } from "react-router-dom";

export default function ServicePage() {
  const [activeNavTab, setActiveNavTab] = useState("Basic");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allReviews = [
    {
      id: 1,
      userInitial: "U",
      username: "utsavs",
      country: "United States",
      rating: 5,
      text:
        "Saba completed all expectations! Saba understood my vision perfectly and delivered a website far beyond what I had envisioned. I'm recommending Saba to everyone. Communication was perfect, and delivery was super fast. Absolutely delighted!",
      timeAgo: "2 months ago",
    },
    {
      id: 2,
      userInitial: "R",
      username: "ronit",
      country: "United Kingdom",
      rating: 4,
      text:
        "Very professional and quick to respond. Will definitely work again. Designs were clean and modern.",
      timeAgo: "3 weeks ago",
    },
    {
      id: 3,
      userInitial: "A",
      username: "amy_smith",
      country: "Australia",
      rating: 5,
      text:
        "Amazing design skills. She gave me so many ideas and the output was fantastic! Highly recommend working with Saba for any UI/UX project.",
      timeAgo: "1 month ago",
    },
  ];

  const { id } = useParams();
  const { data, isSuccess, isPending, isError, isLoading } = useGetSingleGigs(id)
  console.log("data: ", data)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
               {data?.title}
              </h1>

              <div className="flex lg:flex-row md:flex-row flex-col items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-medium">SA</span>
                  </div>

                  <div >
                    <div className="flex flex-row space-x-2" >
                    <h1 className="font-semibold">{data?.username} </h1>
                    <h2>Level 2 + +</h2>
                    <h3 className="text-gray-500" >7 orders in queue </h3>

                    </div>

                    <div className="flex space-x-1 flex-row">
                    <h2 className="font-semibold" >Ui designer</h2>
                      {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 mt-1 fill-yellow-400 text-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span>4.7 <span className="text-gray-500" >(188 reviews)</span> </span>
                  </div>
                  </div>
               
                </div>
               
              </div>
            </div>

            {/* Service Image */}
            <div className="mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={data?.gigsFiles[0]}
                  alt="Figma UI/UX Design Service Banner"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  What people loved about this freelancer
                </h3>
                <button
                  className="text-black text-sm hover:underline"
                  onClick={() => setShowAllReviews(!showAllReviews)}
                >
                  {showAllReviews ? "Show less" : "See all reviews"}
                </button>
              </div>

              <div className="space-y-4">
                {(showAllReviews ? allReviews : allReviews.slice(0, 1)).map(
                  (review) => (
                    <div
                      key={review.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                      <div className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-600 text-sm font-medium">
                              {review.userInitial}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium">
                                {review.username}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                {review.country}
                              </span>
                              <div className="flex items-center">
                                {Array.from({ length: review.rating }).map(
                                  (_, i) => (
                                    <svg
                                      key={i}
                                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  )
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-700">
                              {expandedReviews[review.id]
                                ? review.text
                                : review.text.slice(0, 100) +
                                  (review.text.length > 100 ? "..." : "")}{" "}
                              {review.text.length > 100 && (
                                <span
                                  className="text-black underline cursor-pointer hover:underline"
                                  onClick={() => toggleReview(review.id)}
                                >
                                  {expandedReviews[review.id]
                                    ? "See less"
                                    : "See more"}
                                </span>
                              )}
                            </p>
                            <p className="text-gray-400">{review.timeAgo}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* About This Gig */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About this gig</h3>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                 {data?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* Package Selection */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      id="Basic"
                      onClick={() => setActiveNavTab("Basic")}
                      className={`flex-1 py-3 px-4 text-center text-sm font-medium border-b-2 ${
                        activeNavTab === "Basic"
                          ? "border-black text-black bg-green-50"
                          : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      }`}
                    >
                      Basic
                    </button>
                    <button
                      id="Standard"
                      onClick={() => setActiveNavTab("Standard")}
                      className={`flex-1 py-3 px-4 text-center text-sm font-medium border-b-2 ${
                        activeNavTab === "Standard"
                          ? "border-black text-black bg-green-50"
                          : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      id="Premium"
                      onClick={() => setActiveNavTab("Premium")}
                      className={`flex-1 py-3 px-4 text-center text-sm font-medium border-b-2 ${
                        activeNavTab === "Premium"
                          ? "border-black text-black bg-green-50"
                          : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      }`}
                    >
                      Premium
                    </button>
                  </div>
                </div>

                {activeNavTab === "Basic" && (
                  <SidebarCard
                    price="21,00"
                    description={data?.packages[0]?.packageTitle}
                    deliverytime={data?.packages[0]?.deliveryTime}
                    Revisions="Unlimited"
                    pages="1"
                  />
                )}

                {activeNavTab === "Standard" && (
                 <SidebarCard
                    price="21,00"
                    description={data?.packages[1]?.packageTitle}
                    deliverytime={data?.packages[1]?.deliveryTime}
                    Revisions="Unlimited"
                    pages="1"
                  />
                )}

                {activeNavTab === "Premium" && (
                  <SidebarCard
                    price="21,00"
                    description={data?.packages[2]?.packageTitle}
                    deliverytime={data?.packages[2]?.deliveryTime}
                    Revisions="Unlimited"
                    pages="1"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}