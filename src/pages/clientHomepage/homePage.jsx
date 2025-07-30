import { useState, useEffect, lazy, Suspense } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { useGetGigs } from "../../../api/client/gigs";
import ICCDLoader from "../../component/loader";

// Lazy load GigCard
const GigCard = lazy(() => import("../../component/client_dashboard/gig_card"));
import ICCDError from '../../component/ICCDError';

export default function ClientHomepage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get search param from URL query string
  const query = new URLSearchParams(location.search);
  const searchTermFromUrl = query.get("query") ?? "";

  const [search, setSearch] = useState(searchTermFromUrl);

  const { gigs, error, isLoading, isError } = useGetGigs({
    search: searchTermFromUrl,
  });

  // Loading state
  if (isLoading) return <ICCDLoader />;

  // Error state
  if (isError) return <ICCDError message={error?.message || "Something went wrong"} />;

  // Search handlers
  function handleSearch() {
    if (search.trim() === searchTermFromUrl.trim()) return;
    navigate(`?query=${encodeURIComponent(search.trim())}`, { replace: true });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div className="min-h-screen px-4 bg-white">
      {/* Search Input */}
      <div className="mt-4 lg:hidden md:hidden relative max-w-xl mx-auto">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What services are you looking for today"
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

      {/* Header & Gig List */}
      <div className="flex flex-col sm:flex-row">
        <main className="mt-10 flex-1">
          <h1 className="font-semibold mb-3 text-xl">
            Based on what you might be looking for
          </h1>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Suspense fallback={<ICCDLoader />}>
              {gigs?.map((data, index) => (
                <GigCard
                  key={index}
                  onClick={() => navigate(`/client/gigs/gigs_details/${data?.id}`)}
                  image={data?.fileUrls ? data?.fileUrls.split(",")[0] : ""}
                  title={data.title}
                  author={data.name}
                  level="Level 2++"
                  rating={4.7}
                  reviews={187}
                  price={2977}
                  offersVideoConsultation={true}
                />
              ))}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
