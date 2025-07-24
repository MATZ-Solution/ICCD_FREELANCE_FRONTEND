import { useEffect, useState, useMemo } from "react";
import { getSocket } from "../../config/socket.config";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

const NotificationBell = ({ showDropdown, setShowDropdown }) => {

    const pathName = useLocation().pathname
    const client = useSelector((state) => state.user.userDetails);
    const [count, setCount] = useState(0);
    const socket = useMemo(() => {
        return getSocket(client.id);
    }, [client.id]);

    const resetCount = () => {
        setCount(0);
        setShowDropdown(!showDropdown)
    };

    useEffect(() => {
        const handleCount = () => {
            setCount(prev => prev + 1);
        }
        if (pathName.includes('client')) {
            socket.on("client_notification", handleCount);
            return () => {
                socket.off("client_notification", handleCount);
            };
        }
         if (pathName.includes('freelancer')) {
            socket.on("freelancer_notification", handleCount);
            return () => {
                socket.off("freelancer_notification", handleCount);
            };
        }

    }, [socket]);

    return (
        <div className="relative cursor-pointer" onClick={resetCount}>
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
