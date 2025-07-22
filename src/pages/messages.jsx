import React, { useState, useMemo, useEffect } from "react";
import { getSocket } from "../../config/socket.config";
import { useSelector } from "react-redux";
import { useAddMessage, useGetAllMessagesByUser, useGetAllMsgByReceiptant } from "../../api/client/message";

const WhatsAppClone = () => {

    const [friend, setFriend] = useState(null);
    const [messageInput, setMessagesInput] = useState('');
    const [message, setMessages] = useState([]);
    const client = useSelector(state => state.user.userDetails);

    const { data } = useGetAllMessagesByUser();
    const { data: singleData } = useGetAllMsgByReceiptant({ userId: friend?.senderId || null, recipientId: friend?.receiverId || null });

    const socket = useMemo(() => {
        return getSocket(client.id);
    }, [client.id]);

    useEffect(() => {
        setMessages(singleData || []);
    }, [singleData]);

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessages((prev) => [...prev, data]);
        };
        socket.on('receive_message', handleReceiveMessage);
        return () => {
            socket.off('receive_message', handleReceiveMessage);
        };
    }, [socket]);

    const handleSubmitMessages = () => {
        if (!messageInput.trim() || !friend) return;
        const newMessage = {
            senderId: client.id,
            receiverId: friend.chat_partner_id,
            messages: messageInput.trim(),
        };
        socket.emit('sendMessage', newMessage);
        setMessagesInput('');
    };

    return (
        <div className="flex h-[84vh] bg-gray-100">
            {/* Sidebar */}
            <div className="overflow-y-scroll w-1/4 bg-white border-r flex flex-col">
                <div className="p-4 font-bold border-b">Chats</div>
                <div className="flex-1 overflow-y-auto">
                    {data?.map((item, index) => (
                        <div
                            onClick={() => setFriend(item)}
                            key={index}
                            className="p-4 hover:bg-gray-200 cursor-pointer border-b"
                        >
                            {item.chat_partner_name}
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

                    <div className="overflow-y-scroll h-[60vh] p-4 space-y-2">
                        {message.map((msg) => {
                            const isOwnMessage = msg.senderId === client.id.toString();
                            return (
                                <div
                                    key={msg.messageId || Math.random()} // fallback key in case messageId missing
                                    style={{
                                        display: 'flex',
                                        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                                        marginBottom: '10px'
                                    }}
                                >
                                    <div
                                        style={{
                                            maxWidth: '60%',
                                            padding: '10px',
                                            borderRadius: '12px',
                                            backgroundColor: isOwnMessage ? '#DCF8C6' : '#E5E5EA',
                                            color: '#000',
                                            textAlign: 'left'
                                        }}
                                    >
                                        {msg.messages}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

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
