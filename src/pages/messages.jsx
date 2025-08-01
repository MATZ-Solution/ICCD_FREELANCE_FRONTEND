import React, { useState, useMemo, useEffect, useRef } from "react";
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
import { Send } from "lucide-react";
const WhatsAppClone = () => {
  let lastLabel = null;
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const shouldScrollRef = useRef(true);
  const isFetchingRef = useRef(false);
  const queryClient = useQueryClient();
  const [friend, setFriend] = useState(null);
  const [messageInput, setMessagesInput] = useState("");
  const [message, setMessages] = useState([]);
  const [isActiveChat, setIsActiveChat] = useState(null);


  const client = useSelector((state) => state.user.userDetails);
  const user = useSelector((state) => state.userType.user);


  const { data } = useGetAllMessagesByUser();
  const {
    data: singleData,
    isSuccess,
    isPending,
    isError,
    isLoading,
  } = useGetAllMsgByReceiptant({
    userId: friend?.senderId || null,
    recipientId: friend?.receiverId || null,
    page: page,
  });

  const socket = useMemo(() => {
    return getSocket(client.id);
  }, [client.id]);

  const handleSubmitMessages = () => {
    if (!messageInput.trim() || !friend) return;
    const newMessage = {
      senderId: client.id,
      receiverId: friend.chat_partner_id,
      messages: messageInput.trim(),
      created_at: new Date(),
    };
    socket.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessagesInput("");
  };

  // Fetch and prepend new messages
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !singleData?.length) return;
    const prevScrollHeight = container.scrollHeight;
    setMessages((prev) => [...singleData, ...prev]);
    setTimeout(() => {
      const newScrollHeight = container.scrollHeight;
      const scrollDifference = newScrollHeight - prevScrollHeight;
      container.scrollTop = scrollDifference;
      isFetchingRef.current = false;
    }, 0);
  }, [singleData]);

  // Scroll detection to fetch more
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (
        container.scrollTop <= 50 &&
        !isFetchingRef.current &&
        singleData?.length
      ) {
        isFetchingRef.current = true;
        shouldScrollRef.current = false;
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [singleData]);

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (shouldScrollRef.current) {
      scrollToBottom();
    }
  }, [message]);

  // Socket listener
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      console.log("data: ", data)
      shouldScrollRef.current = true;
      setMessages((prev) => [...prev, data]);
    };
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);

  // Reset on friend change
  useEffect(() => {
    // setMessages([]);
    setPage(1);
    shouldScrollRef.current = true;
    isFetchingRef.current = false;
  }, [friend]);

  const handleFriend = (item) => {
    if (item?.message_id !== isActiveChat) {
      setMessages([]);
    }
    setIsActiveChat(item?.message_id)
    setFriend(item);
  };

  console.log("friend: ", friend)
  console.log("message: ", message)

  return (
    <div className="flex h-screen antialiased text-gray-800 bg-gray-100 font-inter">

      <div className="flex flex-row h-full w-full overflow-hidden rounded-lg shadow-xl  bg-white">
        {/* Left Sidebar - Chat List */}
        <div className="flex flex-col w-1/3 border-r border-gray-200 bg-gray-50 overflow-hidden">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
            <div className="flex items-center">
              <img
                src="https://placehold.co/100x100/60A5FA/ffffff?text=You"
                alt="Your Profile"
                className="w-10 h-10 rounded-full mr-3 shadow-md"
              />
              <span className="font-semibold text-lg text-gray-800">My Chats</span>
            </div>
            <div className="flex space-x-4">
              {/* New Chat Icon */}
              <button className="text-gray-500 hover:text-green-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                <i className="fas fa-comment-dots text-xl"></i>
              </button>
              {/* Settings Icon */}
              <button className="text-gray-500 hover:text-green-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                <i className="fas fa-cog text-xl"></i>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="relative">
              <input
                type="text"
                placeholder="Search chats..."
                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#08B0BD] focus:border-transparent text-sm"
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto bg-white">

            {data?.map((chat, index) => (
              <button
                key={index}
                className={`flex gap-4 items-center p-4 w-full text-left border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200
                   ${isActiveChat === chat?.message_id ? 'bg-teal-50 bg-opacity-50 border-l-4 border-l-[#08B0BD] border-b-[#08B0BD] ' : ''}
                 `}
                onClick={() => handleFriend(chat)}
              >
                <div
                  className="capitalize w-12 h-12 bg-[#A78BFA] font-bold text-2xl text-white rounded-full flex items-center justify-center shadow-sm"
                >{chat.chat_partner_name[0]}</div>
                <div className="flex-1 ">
                  <h3 className="font-semibold text-gray-800 truncate capitalize">{chat.chat_partner_name}</h3>
                  <p className="text-sm text-gray-500 truncate">{chat.messages}</p>
                </div>
                <span className="text-xs text-gray-400 ml-2">{getDateLabel(chat.created_at)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Main Chat Area */}
        <div className="flex flex-col flex-1 bg-white">
          {/* Chat Header */}
          {
            friend && (
              <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex gap-3 items-center">
                  <div
                    className="capitaize w-12 h-12 bg-[#A78BFA] font-bold text-2xl text-white rounded-full flex items-center justify-center shadow-sm"
                  >{friend?.chat_partner_name[0]}</div>
                  <h2 className="font-semibold text-lg text-gray-800">{friend?.chat_partner_name}</h2>
                </div>
                <div className="flex space-x-4">
                  {/* Call Icon */}
                  <button className="text-gray-500 hover:text-green-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                    <i className="fas fa-phone text-xl"></i>
                  </button>
                  {/* Video Call Icon */}
                  <button className="text-gray-500 hover:text-green-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                    <i className="fas fa-video text-xl"></i>
                  </button>
                  {/* More Options Icon */}
                  <button className="text-gray-500 hover:text-green-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100">
                    <i className="fas fa-ellipsis-v text-xl"></i>
                  </button>
                </div>
              </div>
            )
          }

          {/* Message Display Area */}
          <div ref={containerRef} className=" h-[60vh] flex-1 p-6 overflow-y-auto bg-gray-50">
            {
              friend && (
                <>
                  {message?.map((message, index) => {
                    const isOwnMessage = message.senderId == client.id;
                    const introMsg = message.messages === 'You are now communication each other';
                    return (
                      <div
                        key={index}
                        className={`flex mb-4 ${introMsg ? 'justify-center' : (isOwnMessage ? 'justify-end' : 'justify-start')}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg shadow-md
                            ${introMsg ? 'bg-[#FEFCE8] font-serif text-black rounded-br-none' : isOwnMessage
                              ? 'bg-[#08B0BD] text-white rounded-br-none'
                              : 'bg-white text-gray-800 rounded-bl-none'
                            }
                    `
                          }
                        >
                          <p className="">{message.messages}</p>
                          <span className={` text-xs `}>
                            {formatTo12HourTime(message.created_at)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </>
              )
            }
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Area */}
          {
            friend && (
              <div className="flex items-center p-4 bg-white border-t border-gray-200 shadow-sm">
                <button className="text-gray-500 hover:text-green-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 mr-2">
                  <i className="fas fa-smile text-xl"></i>
                </button>
                <button className="text-gray-500 hover:text-green-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 mr-2">
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
                  className="cursor-pointer ml-2 bg-[#08B0BD] hover:[#08B0BD] text-white p-2 rounded-full shadow-md transition-colors duration-200">

                  <Send />
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default WhatsAppClone;
