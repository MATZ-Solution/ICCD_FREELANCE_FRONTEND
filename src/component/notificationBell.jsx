import { useEffect, useState, useMemo } from "react";
import { getSocket } from "../../config/socket.config";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useGetUnReadCountNot } from "../../api/client/notification";
import { memo } from "react";

const NotificationBell = ({ isShowNot, setIsShowNot }) => {

    const [countClient, setCountClient] = useState(0);
    const [countFreelancer, setCountFreelancer] = useState(0);
    const pathName = useLocation().pathname
    const user = useSelector((state) => state.userType.user);
    const client = useSelector((state) => state.user.userDetails);
    const socket = useMemo(() => { return getSocket(client.id) }, [client.id]);
    const { data, error, isLoading, isError } = useGetUnReadCountNot(user)

    useEffect(() => {
        if (data && data?.length > 0 && data[0]?.type === 'client') {
            setCountClient(data[0]?.count);
        }
        if (data && data?.length > 0 && data[0]?.type === 'freelancer') {
            setCountFreelancer(data[0]?.count);
        }
    }, [data]);

    useEffect(() => {
        const handleCount = (data) => {
            console.log("socket data: ", data)
            if (data?.type === 'client') {
                setCountClient(prev => prev + 1);
            } else if (data?.type === 'freelancer') {
                setCountFreelancer(prev => prev + 1);
            }
        }
        socket.on("notification", handleCount);
        return () => {
            socket.off("notification", handleCount);
        };
    }, [socket]);

    const handleOnClick = () => {
        if (pathName.includes('client')) {
            setCountClient(0)
        } else if (pathName.includes('freelancer')) {
            setCountFreelancer(0)
        }
        setIsShowNot(!isShowNot)
    }
    return (
        <div className="relative cursor-pointer" onClick={handleOnClick}>
            <Bell className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors" />

            {(countClient > 0 && pathName.includes('client')) && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {countClient}
                </span>
            )}

            {(countFreelancer > 0 && pathName.includes('freelancer')) && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {countFreelancer}
                </span>
            )}
        </div>
    );
};

export default memo(NotificationBell);
