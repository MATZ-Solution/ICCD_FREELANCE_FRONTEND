
import { useSelector } from "react-redux";
import DisputeLists from "../../component/dispute/disputeLists";
import { useGetAllDisputeByFreelancer } from "../../../api/client/dispute";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import Pagination from "../../component/pagination";
import { useState } from "react";

const FreelancerDisputeLists = () => {
  const [page, setPage] = useState(1);
  const { data, totalPages, isSuccess, isPending, isError } = useGetAllDisputeByFreelancer({ page: page })

  if (isPending) return <ICCDLoader />
  if (isError) return <ICCDError />

  return (
    <div>
      <DisputeLists data={data} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default FreelancerDisputeLists;
