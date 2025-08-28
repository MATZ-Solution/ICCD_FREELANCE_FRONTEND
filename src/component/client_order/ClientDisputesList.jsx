import { useGetAllDisputeByClient } from "../../../api/client/dispute";
import { useSelector } from "react-redux";
import ICCDLoader from "../loader";
import ICCDError from "../ICCDError";
import DisputeLists from "../dispute/disputeLists";

const ClientDisputeLists = () => {

  const client = useSelector((state) => state.user.userDetails);
  const { data, isSuccess, isPending, isError } = useGetAllDisputeByClient(client?.id)

  if(isPending) return <ICCDLoader />
  if(isError) return <ICCDError />

  return (
    <DisputeLists data={data}/>
  );
};

export default ClientDisputeLists;
