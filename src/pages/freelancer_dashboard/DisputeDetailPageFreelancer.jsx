import { useGetDisputeById } from "../../../api/client/dispute";
import { useParams } from "react-router-dom";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";
import DisputeDetailPage from "../../component/dispute/disputeDetailPage";

const DisputeDetailPageFreelancer = () => {

  const { id } = useParams()
  const { data, userResponseData, isPending, isError } = useGetDisputeById(id)
  
  if (isPending) return <ICCDLoader />
  if (isError) return <ICCDError />

  return (
    <DisputeDetailPage userResponseData={userResponseData} data={data} />
  );
};

export default DisputeDetailPageFreelancer;
