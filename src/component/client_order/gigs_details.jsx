import { useState } from "react";
import SidebarCard from "./sidebarcard";
import { useGetSingleGigs } from "../../../api/client/gigs";
import { useParams } from "react-router-dom";

export default function ServicePage() {
  const [activeNavTab, setActiveNavTab] = useState("Basic");

  const { id } = useParams();
  const { data, isSuccess, isPending, isError, isLoading } =
    useGetSingleGigs(id);
  console.log("data: ", data);

  const selectedPackage = data?.[0]?.packagesDetails?.find(
    (pkg) => pkg.packageType.toLowerCase() === activeNavTab.toLowerCase()
  );

  console.log("gigsDescription actual value:", data?.[0]?.gigsDescription);
  console.log("Type of gigsDescription:", typeof data?.[0]?.gigsDescription);

  const a = data?.[0]?.gigsDescription;

  const b = data?.[0]?.freelancerDetails;

  console.log("hey", a);

  if (isLoading) {
    return <p>loading..</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}

          {/* {a.map((item)  => (     */}
          <div className="lg:col-span-2">
            
            {/* Service Title */}

            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                {a.gigsTitle}
              </h1>

              <div className="flex lg:flex-row md:flex-row flex-col items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
                    <img
                      className=" w-full h-14 rounded-full"
                      src={b.freelancerPic}
                    ></img>
                  </div>

                  <div>
                    <div className="flex flex-row space-x-2">
                      <h1 className=" text-xl font-semibold">{b.freelancerName} </h1>
                    </div>

                    <div className="flex space-x-3 flex-row">
                      <h2 className=" text-gray-500 text-lg font-semibold">Ui designer</h2>
                  

                      {/* {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 mt-1 fill-yellow-400 text-yellow-400"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span>4.7 <span className="text-gray-500" >(188 reviews)</span> </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Image */}
            <div className="mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={a.gigsFiles}
                  alt="Figma UI/UX Design Service Banner"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* About This Gig */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4"></div>
                About this gig
              </h3>

              <div className="prose prose-lg max-w-none">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border-l-4 border-blue-500">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{a.gigsTitle}</h4>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{a.gigsDescription}</p>
              </div>
            </div>

         {/* Freelancer Profile Section */}
            <div className="bg-white mt-4 rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full mr-4"></div>
                Get To Know {b.freelancerName}
              </h3>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      className="w-24 h-24 rounded-2xl object-cover shadow-lg ring-4 ring-gray-100"
                      src={b.freelancerPic || "/placeholder.svg"}
                      alt={b.freelancerName}
                    />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white shadow-sm"></div>
                  </div>
                </div>

                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{b.freelancerName}</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      UI Designer
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {b.FreelancerLanguages}
                    </span>
                  </div>
                </div>
              </div>

              {/* Freelancer Details Card */}
              <div className="mt-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Full Name</p>
                    <p className="text-lg font-medium text-gray-900">{b.freelancerName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Languages</p>
                    <p className="text-lg font-medium text-gray-900">{b.FreelancerLanguages}</p>
                  </div>
                </div>

                <hr className="border-gray-300 my-6" />

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-bold text-gray-900 mb-2">Welcome!</p>
                      <p className="text-gray-700 leading-relaxed">{b.freelancer_about_description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 pt-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <p className="font-bold text-gray-900">Contact Me Now.</p>
                  </div>
                </div>
              </div>
            </div>

            

            
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 ">
            <div className="sticky top-12">
              {/* Package Selection */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button
                      id="Basic"
                      onClick={() => {
                        setActiveNavTab("basic");
                        setOrderDetails({
                          ...orderDetails,
                          packageID: data?.packages?.find(
                            (item) => item?.name === "basic"
                          ).packageID,
                        });
                      }}
                      className={`flex-1 py-6  px-4 text-center text-lg font-semiboldborder-b-2 ${
                        activeNavTab === "basic"
                          ? "border-black text-black bg-green-50"
                          : "border-transparent text-gray-600  hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      }`}
                    >
                      Basic
                    </button>
                    <button
                      id="Standard"
                      onClick={() => {
                        setActiveNavTab("standard");
                        // setOrderDetails({ ...orderDetails, packageID: data?.packages?.find(item => item?.name === 'standard').packageID })
                      }}
                      className={`flex-1 py-3 px-4 text-centertext-lg font-semibold border-b-2 ${
                        activeNavTab === "standard"
                          ? "border-black text-black bg-green-50"
                          : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      id="Premium"
                      onClick={() => {
                        setActiveNavTab("premium");
                        // setOrderDetails({ ...orderDetails, packageID: data?.packages?.find(item => item?.name === 'premium').packageID })
                      }}
                      className={`flex-1 py-3 px-4 text-center text-lg font-semibold border-b-2 ${
                        activeNavTab === "premium"
                          ? "border-black text-black bg-green-50"
                          : "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                      }`}
                    >
                      Premium
                    </button>
                  </div>
                </div>

                {/* Show selected package */}
                {selectedPackage ? (
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
                ) : (
                  <div className="p-4 text-red-500">Package not found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* Reviews Section */
}
{
  /* <div className="mb-8">
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
            </div> */
}



