import { useState, useMemo, useEffect, useRef } from "react";
import { getSocket } from "../../config/socket.config";
import { useSelector } from "react-redux";
import {
    useGetAllMessagesByUser,
    useGetAllMsgByReceiptant,
} from "../../api/client/message";
import {
    getDateLabel,
    formatTo12HourTime,
} from "../../functions/timeFormat";
import { useQueryClient } from "@tanstack/react-query";
import { Send, ArrowLeft } from "lucide-react";
import MessageLeftSide from "../component/messages/MessageLeftSide";
import MessageRightSide from "../component/messages/MessageRightSide";

const MessageCheck = () => {
    
    const [friendId, setFriendId] = useState(null);


   
    return (
        <div className="flex flex-col md:flex-row h-screen antialiased text-gray-800 bg-gray-100 font-inter">
            <MessageLeftSide setFriendId={setFriendId}/>
            <MessageRightSide friendId={friendId}/>
        </div>
    );
};

export default MessageCheck;
