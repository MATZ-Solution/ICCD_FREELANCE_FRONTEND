import { useState, useEffect } from "react";
import GigCard from "../../component/client_dashboard/gig_card";
import { useGetGigs } from "../../../api/client/gigs";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import ICCDLoader from "../../component/loader";
import { useCheckIsFreelancer } from "../../../api/client/user";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../redux/slices/userProfileSlice";
import useDebounce from "../../../hooks/useDebounce";
import { useSelector } from "react-redux";

export default function ClientHomepage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get search param from URL query string
  const query = new URLSearchParams(location.search);
  const searchTermFromUrl = query.get("query") ?? "";

  const [search, setSearch] = useState(searchTermFromUrl);

  const debouncedSearch = useDebounce(search, 300);

  const freelancer = useSelector((state) => state.userProfile.userProfile);

  const { gigs, isLoading } = useGetGigs({
    search: debouncedSearch,
    freelancer_id: freelancer?.id,
  });

  console.log(gigs)

  // Sync search state with URL changes
  useEffect(() => {
    const currentSearchTerm =
      new URLSearchParams(location.search).get("query") ?? "";
    setSearch(currentSearchTerm);
  }, [location.search]);

  function handleSearch() {
    const trimmedSearch = search.trim();
    const trimmedUrlSearch = searchTermFromUrl.trim();

    if (trimmedSearch === trimmedUrlSearch) return; // no change

    // Update URL with new search term
    const newUrl = trimmedSearch
      ? `?query=${encodeURIComponent(trimmedSearch)}`
      : window.location.pathname; // Remove query param if search is empty

    navigate(newUrl, { replace: true });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  }

  // to set freelancer details in redux
  const { data } = useCheckIsFreelancer();
  useEffect(() => {
    if (data && data.length > 0) {
      dispatch(getUserProfile(data[0]));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <h2 className="text-2xl font-bold text-gray-700 animate-pulse tracking-wide">
          Loading Gigs...
        </h2>
      </div>
    );
  }

  // Helper function to format created_at date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen px-4 bg-white">
      <div className="mt-4  lg:hidden md:hidden relative max-w-xl mx-auto">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What services are you looking for today?"
          className="rounded w-full h-10 p-3 border border-gray-400"
        />
        <button
          onClick={handleSearch}
          className="absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black rounded-r"
          aria-label="Search"
        >
          <SearchIcon className="text-white" />
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row">
        {/* Main Content */}
        <main className="mt-10 flex-1">
          <h1 className="font-semibold mb-3 text-xl">
            Based on what you might be looking for
          </h1>

          {/* Show search results info */}
          {debouncedSearch && (
            <p className="text-gray-600 mb-4">
              Showing results for: "{debouncedSearch}"
            </p>
          )}

          {/* Gig Cards Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {gigs?.length > 0 ? (
              gigs.map((gig) => {
                const totalReviews = gig.reviews ? gig.reviews.length : 0;

                return (
                  <GigCard
                    key={gig.id}
                    onClick={() =>
                      navigate(`/client/gigs/gigs_details/${gig.id}`)
                    }
                    image={gig.fileUrls ? gig.fileUrls.split(",")[0] : ""}
                    title={gig.title}
                    author={`${gig.firstName} ${gig.lastName}`}
                    authorImg={gig.freelancerImg}
                    level="Level 2++"
                    rating={gig.id}
                    reviews={totalReviews}
                    price={gig.price || 0}
                    created_at={formatDate(gig.created_at)}
                    offersVideoConsultation={true}
                  />
                );
              })
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">
                  {debouncedSearch
                    ? "No gigs found for your search."
                    : "No gigs available."}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
