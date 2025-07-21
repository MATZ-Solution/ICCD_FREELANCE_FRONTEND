import React, { useState, useMemo, useEffect } from "react";
import { getSocket } from "../../config/socket.config";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const contacts = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
];

const messagesSample = [
    { id: 1, text: "Hello!", sender: "me" },
    { id: 2, text: "Hi there!", sender: "them" },
    { id: 3, text: "How are you?", sender: "me" },
];

const WhatsAppClone = () => {

    const [messages, setMessages] = useState(messagesSample);
    const [newMessage, setNewMessage] = useState("");

    const location = useLocation()

    const handleSend = () => {
        if (newMessage.trim() === "") return;
        setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "me" }]);
        setNewMessage("");
    };

    const freelancer = useSelector(state => state.userProfile.userProfile)
    const client = useSelector(state => state.user.userDetails)

    const socket = useMemo(() => {
        let getSocketConn;
        if (location.pathname.includes('client')) {
            getSocketConn = getSocket(client?.id)
        } else {
            getSocketConn = getSocket(freelancer?.id)
        }
        return getSocketConn
    }, [])


    const handleSubmitMessages = () => {
        let newMessage = { messages: messageInput, receiverID: id, senderID: userID }
        socket.emit('sendMessage', newMessage)
        setMessages((prev) => [...prev, newMessage]);
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data])
        })

        return () => {
            socket.off('receive_message');
        };
    }, [socket])


    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r flex flex-col">
                <div className="p-4 font-bold border-b">Chats</div>
                <div className="flex-1 overflow-y-auto">
                    {contacts.map((contact) => (
                        <div key={contact.id} className="p-4 hover:bg-gray-200 cursor-pointer border-b">
                            {contact.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Section */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <div className="p-4 bg-white border-b font-semibold">Chat with Alice</div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-2">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-xs px-4 py-2 rounded-lg ${msg.sender === "me" ? "ml-auto bg-green-200" : "mr-auto bg-white"
                                }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                {/* Input Box */}
                <div className="p-4 bg-white flex border-t">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                        className="flex-1 border rounded px-3 py-2 mr-2 focus:outline-none"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WhatsAppClone;
