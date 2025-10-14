import React from 'react'
import { useState } from 'react';
import { getDateLabel } from '../../../functions/timeFormat';
import { useGetAllMessagesByUser } from '../../../api/client/message';

function MessageLeftSide({ setFriendId }) {
    const [isActiveChat, setIsActiveChat] = useState(null);
    const { data } = useGetAllMessagesByUser();
    const handleFriend = (item) => {
        // if (item?.message_id !== isActiveChat) {
        //     setMessages([]);
        // }
        // setIsActiveChat(item?.message_id);
        setFriendId(item);
    };
    return (
        <div className={`flex flex-col w-full md:w-1/3 border-r border-gray-200 bg-gray-50 overflow-hidden md:flex hide-between-786-942 }`}>
            <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm">
                <div className="flex items-center">
                    <img
                        src="https://placehold.co/100x100/60A5FA/ffffff?text=You"
                        alt="Your Profile"
                        className="w-10 h-10 rounded-full mr-3 shadow-md"
                    />
                    <span className="font-semibold text-lg text-gray-800">My Chats</span>
                </div>
            </div>
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
            <div className="flex-1 overflow-y-auto bg-white">
                {data?.map((chat, index) => (
                    <button
                        key={index}
                        className={`flex gap-4 items-center p-4 w-full text-left border-b border-gray-300 hover:bg-gray-50 transition-colors duration-200 ${isActiveChat === chat?.message_id
                            ? "bg-teal-50 bg-opacity-50 border-l-4 border-l-[#08B0BD] border-b-[#08B0BD]"
                            : ""
                            }`}
                        onClick={() => handleFriend(chat)}
                    >
                        <div className="capitalize w-10 h-10 p-4 bg-[#A78BFA] font-bold text-2xl text-white rounded-full flex items-center justify-center shadow-sm">
                            {chat.chat_partner_name[0]}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 truncate capitalize">
                                {chat.chat_partner_name}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">{chat.messages}</p>
                        </div>
                        <span className="text-xs text-gray-400 ml-2">
                            {getDateLabel(chat.created_at)}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default MessageLeftSide