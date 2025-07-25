import { useEffect, useState, useMemo } from "react";
import { getSocket } from "../../config/socket.config";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useGetUnReadCountNot } from "../../api/client/notification";

const NotificationBell = ({ isShowNot, setIsShowNot }) => {

    const freelancer = useSelector((state) => state.user.userDetails);
    const client = useSelector((state) => state.userProfile.userProfile);

    let [user, setUser] = useState({id: client?.id, type: 'client'})

    const [count, setCount] = useState(0);

    const socket = useMemo(() => { return getSocket(client.id) }, [client.id]);
    const { data, error, isLoading, isError } = useGetUnReadCountNot(freelancer?.id)

    
    useEffect(() => {
        if (data && data?.length > 0) {
            setCount(data[0]?.count);
        }
    }, [data]);

    useEffect(() => {
        const handleCount = () => {
            setCount(prev => prev + 1);
        }
        socket.on("notification", handleCount);
        return () => {
            socket.off("notification", handleCount);
        };
    }, [socket]);

    const handleOnClick = () => {
        setCount(0)
        setIsShowNot(!isShowNot)
    }
    return (
        <div className="relative cursor-pointer" onClick={handleOnClick}>
            <Bell className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
            {count > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {count}
                </span>
            )}
        </div>
    );
};

export default NotificationBell;
