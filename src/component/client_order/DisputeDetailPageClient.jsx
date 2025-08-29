import { useGetDisputeById } from "../../../api/client/dispute";
import { useParams } from "react-router-dom";
import DisputeDetailPage from "../dispute/disputeDetailPage";
import ICCDLoader from "../loader";
import ICCDError from "../ICCDError";

const DisputeDetailPageClient = () => {

  const { id } = useParams()
  const { data, userResponseData, isPending, isError } = useGetDisputeById(id)

  if (isPending) return <ICCDLoader />
  if (isError) return <ICCDError />

  return (
    <DisputeDetailPage userResponseData={userResponseData} data={data} />
  );
};

export default DisputeDetailPageClient;
