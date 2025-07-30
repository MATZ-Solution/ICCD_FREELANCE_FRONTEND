import { useState, useEffect } from "react";
import GigCard from "../../component/client_dashboard/gig_card";
import { useGetGigs } from "../../../api/client/gigs";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import ICCDLoader from "../../component/loader";
import { useCheckIsFreelancer } from "../../../api/client/user";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../../../redux/slices/userProfileSlice";

export default function ClientHomepage() {

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


  // Get search param from URL query string
  const query = new URLSearchParams(location.search);
  const searchTermFromUrl = query.get("query") ?? "";

  const [search, setSearch] = useState(searchTermFromUrl);

  const { gigs, error, isLoading, isError } = useGetGigs({ search: searchTermFromUrl });


  function handleSearch() {
    if (search.trim() === searchTermFromUrl.trim()) return; // no change
    navigate(`?query=${encodeURIComponent(search.trim())}`, { replace: true });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

// to set freelancer details in redux
  const { data, isSuccess, isPending } = useCheckIsFreelancer()
  useEffect(() => {
    if (data && data?.length > 0) {
      dispatch(getUserProfile(data[0]));
    }
  }, [data]);

  if (isLoading) {
    return <ICCDLoader />
  }

  return (
    <div className="min-h-screen px-4 bg-white">
      <div className=" mt-4  lg:hidden  md:hidden relative max-w-xl mx-auto">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What services are you looking for today"
          className="rounded  w-full h-10 p-3 border border-gray-400"
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
          {/* Gig Cards Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
          </div>
        </main>
      </div>
    </div>
  );
}