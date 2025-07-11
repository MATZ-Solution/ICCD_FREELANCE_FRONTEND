import { useState } from "react";
import GigCard from "../../component/client_dashboard/gig_card";
import { useGetGigs } from "../../../api/client/gigs";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import { useLocation } from "react-router-dom";

export default function ClientHomepage() {

    const navigate = useNavigate()
    const query = new URLSearchParams(useLocation().search);
    const searchTerm = query.get("query");
    const { gigs, error, isLoading, isError } = useGetGigs({ search: searchTerm ?? '' })

    return (
        <div className="min-h-screen px-4 bg-white">
            {/* Header */}
            <div className="flex flex-col sm:flex-row">
                {/* Main Content */}
                <main className="mt-10 flex-1">
                    <h1 className="font-semibold mb-3 text-xl">
                        Based on what you might be looking for
                    </h1>
                    {/* Gig Cards Section */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {
                            gigs?.map((data, index) => (
                                <GigCard
                                    key={index}
                                    onClick={() => navigate(`/client/gigs/gigs_details/${data?.id}`)}
                                    image={data?.fileUrls ? data?.fileUrls.split(',')[0] : ''}
                                    title={data.title}
                                    author={data.name}
                                    level="Level 2++"
                                    rating={4.7}
                                    reviews={187}
                                    price={2977}
                                    offersVideoConsultation={true}
                                />
                            ))
                        }
                    </div>
                </main>
            </div>
        </div>
    );
}