import { useGetAllDisputeByClient } from "../../../api/client/dispute";
import { useSelector } from "react-redux";
import ICCDLoader from "../loader";
import ICCDError from "../ICCDError";
import DisputeLists from "../dispute/disputeLists";
import Pagination from "../pagination";
import { useState } from "react";

const ClientDisputeLists = () => {

  const [page, setPage] = useState(1);
  const { data, totalPages, isSuccess, isPending, isError } = useGetAllDisputeByClient({ page: page })

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

export default ClientDisputeLists;
