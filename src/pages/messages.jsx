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

const WhatsAppClone = () => {
  let lastLabel = null;
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const shouldScrollRef = useRef(true);
  const isFetchingRef = useRef(false);

  const [friend, setFriend] = useState(null);
  const [messageInput, setMessagesInput] = useState("");
  const [message, setMessages] = useState([]);

  const client = useSelector((state) => state.user.userDetails);
  console.log("client: ", client)

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
    setMessages([]);
    setPage(1);
    shouldScrollRef.current = true;
    isFetchingRef.current = false;
  }, [friend]);

  const handleFriend = (item) => {
    setFriend(item);
  };

  return (
    <div className="flex h-[84vh] bg-gray-100">
      {/* Sidebar */}
      <div className="overflow-y-scroll w-1/4 bg-white border-r flex flex-col">
        <div className="p-4 font-bold border-b">Chats</div>
        <div className="flex-1 overflow-y-auto">
          {data?.map((item, index) => (
            <div
              onClick={() => handleFriend(item)}
              key={index}
              className="p-4 hover:bg-gray-200 cursor-pointer border-b"
            >
              <div className="flex items-center justify-between">
                <p>{item.chat_partner_name}</p>
                <p className="text-xs">{getDateLabel(item?.created_at)}</p>
              </div>
              <p className="text-xs text-gray-700">{item?.messages}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      {friend && (
        <div className="relative flex w-full h-full flex-col">
          <div className="p-4 bg-white border-b font-semibold">
            Chat with {friend?.chat_partner_name}
          </div>
          <div
            ref={containerRef}
            className="relative overflow-y-scroll h-[60vh] p-4 space-y-2"
          >
            {message?.map((msg, index) => {
              const label = getDateLabel(msg.created_at);
              const showLabel = label !== lastLabel;
              lastLabel = label;
              const isOwnMessage = msg.senderId == client.id;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: isOwnMessage ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "60%",
                      padding: "10px",
                      borderRadius: "12px",
                      backgroundColor: isOwnMessage ? "#DCF8C6" : "#E5E5EA",
                      color: "#000",
                      textAlign: "left",
                    }}
                  >
                    <p>{msg.messages}</p>
                    <p className="flex justify-end text-xs">
                      {formatTo12HourTime(msg.created_at)}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="w-full absolute bottom-0 p-4 bg-white flex border-t">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessagesInput(e.target.value)}
              placeholder="Type a message"
              className="flex-1 border rounded px-3 py-2 mr-2 focus:outline-none"
            />
            <button
              onClick={handleSubmitMessages}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppClone;
