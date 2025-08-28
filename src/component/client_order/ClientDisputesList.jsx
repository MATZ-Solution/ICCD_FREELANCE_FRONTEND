import React, { useState } from "react";
import {
  Eye,
  MessageCircle,
  X,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetAllDisputeByClient } from "../../../api/client/dispute";
import { useSelector } from "react-redux";
import { getDateLabel } from "../../../functions/timeFormat";
import ItemNotFound from "../itemNotFound";
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
