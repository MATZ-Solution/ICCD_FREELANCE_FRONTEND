import { useGetDisputeById } from "../../../api/client/dispute";
import { useParams } from "react-router-dom";
import DisputeDetailPage from "../dispute/disputeDetailPage";
import ICCDLoader from "../loader";
import ICCDError from "../ICCDError";

const DisputeDetailPageClient = () => {

  const { id } = useParams()
  const { data, isPending, isError } = useGetDisputeById(id)

  if (isPending) return <ICCDLoader />
  if (isError) return <ICCDError />

  return (
    <DisputeDetailPage data={data} />
  );
};

export default DisputeDetailPageClient;
