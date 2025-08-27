
import { useSelector } from "react-redux";
import DisputeLists from "../../component/dispute/disputeLists";
import { useGetAllDisputeByFreelancer } from "../../../api/client/dispute";
import ICCDLoader from "../../component/loader";
import ICCDError from "../../component/ICCDError";

const FreelancerDisputeLists = () => {

    const freelancer = useSelector(state => state.userProfile.userProfile)
    const { data, isSuccess, isPending, isError } = useGetAllDisputeByFreelancer(freelancer?.id)

    if (isPending) return <ICCDLoader />
    if (isError) return <ICCDError />

    return (
      <DisputeLists data={data}/>
    );
};

export default FreelancerDisputeLists;
