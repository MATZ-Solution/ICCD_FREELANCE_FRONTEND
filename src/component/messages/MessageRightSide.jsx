import { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Send, ArrowLeft } from "lucide-react";
import { getSocket } from '../../../config/socket.config';
import { formatTo12HourTime } from '../../../functions/timeFormat';
import { useGetAllMsgByReceiptant } from '../../../api/client/message';

function MessageRightSide({ friendId }) {

    const [page, setPage] = useState(1)
    const [message, setMessages] = useState([]);
    const [messageInput, setMessagesInput] = useState("");
    const client = useSelector((state) => state.user.userDetails);
    const [isNextPage, setIsNextPage] = useState(true);
    console.log("isNextPage: ", isNextPage)

    const containerRef = useRef(null);
    const lastScrollTopRef = useRef(0);
    const isFetchingRef = useRef(false);

    const { data: singleData, isSuccess, isPending, isError, isLoading } = useGetAllMsgByReceiptant({
        userId: friendId?.senderId || null,
        recipientId: friendId?.receiverId || null,
        page: page,
    });
    console.log("messages: ", message)

    const socket = useMemo(() => {
        return getSocket(client.id);
    }, [client.id]);

    // send messages
    const handleSubmitMessages = () => {
        if (!messageInput.trim() || !friendId) return console.log("Not Submitted!");
        const newMessage = {
            senderId: client.id,
            receiverId: friendId.chat_partner_id,
            messages: messageInput.trim(),
            created_at: new Date(),
        };
        socket.emit("sendMessage", newMessage);
        setMessages((prev) => [...prev, newMessage]);
        setMessagesInput("");
    };

    // get message in real time
    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessages((prev) => [...prev, data]);
        };
        socket.on("receive_message", handleReceiveMessage);
        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [socket]);

    // get message from database and if page changes it will add new incoming data into existing messages
    useEffect(() => {
        console.log("1")
        if (!singleData?.length) return;
        if (page === 1) {
            console.log("2")
            setMessages(singleData);
        } else {
            setMessages((prev) => [...singleData, ...prev]);
        }
    }, [singleData, page]);

    // scrolling logic and increment the page by 1 when user go to the top
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        lastScrollTopRef.current = container.scrollTop;

        const handleScroll = () => {
            const currentScrollTop = container.scrollTop;
            const isScrollingUp = currentScrollTop < lastScrollTopRef.current;

            // If user is scrolling up & near top & not already fetching
            if (isScrollingUp && currentScrollTop <= 50 && !isFetchingRef.current) {
                isFetchingRef.current = true;
                setPage((prev) => prev + 1);
                setTimeout(() => {
                    isFetchingRef.current = false;
                }, 800);
            }
            lastScrollTopRef.current = currentScrollTop;
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [])

    // reset the page when switch to the new chat
    // useEffect(() => {
    //     setPage(1);
    //     setMessages([]);
    // }, [friendId]);

    // make the div to scroll from the bottom
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        setTimeout(() => {
            container.scrollTop = container.scrollHeight;
        }, 100);
    }, []);

    return (
        <div className="flex flex-col flex-1 bg-white ">
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex gap-3 items-center">
                    <button
                        onClick={() => setFriend(null)}
                        className=" text-gray-600 hover:text-[#08B0BD] p-2 rounded-full"
                    >
                        <ArrowLeft />
                    </button>
                    <div className="capitalize w-12 h-12 bg-[#A78BFA] font-bold text-2xl text-white rounded-full flex items-center justify-center shadow-sm">
                        {friendId?.chat_partner_name[0]}
                    </div>
                    <h2 className="font-semibold text-lg text-gray-800">
                        {friendId?.chat_partner_name}
                    </h2>
                </div>
            </div>
            <div ref={containerRef} className="h-[60vh] flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50 ">
                {message?.map((message, index) => {
                    const isOwnMessage = message.senderId == client.id;
                    const introMsg = message.messages === "You can now communicate with each other";
                    return (
                        <div
                            key={index}
                            className={`flex mb-4 ${introMsg
                                ? "justify-center"
                                : isOwnMessage
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                        >

                            <div
                                className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg shadow-md ${introMsg
                                    ? "bg-[#FEFCE8] font-serif text-black rounded-br-none"
                                    : isOwnMessage
                                        ? "bg-[#08B0BD] text-white rounded-br-none"
                                        : "bg-white text-gray-800 rounded-bl-none"
                                    }`}
                            >
                                <p>{message.messages}</p>
                                <span className="text-xs">
                                    {formatTo12HourTime(message.created_at)}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex items-center p-2 sm:p-4 bg-white border-t border-gray-200 shadow-sm">
                <button className="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 mr-2">
                    <i className="fas fa-smile text-xl"></i>
                </button>
                <button className="text-gray-500 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 mr-2">
                    <i className="fas fa-paperclip text-xl"></i>
                </button>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessagesInput(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#08B0BD] focus:border-transparent text-sm"
                />
                <button
                    onClick={handleSubmitMessages}
                    className="ml-2 bg-[#08B0BD] text-white p-2 rounded-full shadow-md hover:bg-[#08B0BD]"
                >
                    <Send />
                </button>
            </div>
        </div>
    )
}

export default MessageRightSide