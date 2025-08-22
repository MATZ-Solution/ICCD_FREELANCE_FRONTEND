import React from 'react'
import { useState } from 'react';
import NotificationDropdown from '../NotificationDropdown';
import { setUserType } from "../../../redux/slices/userType";
import { useRef } from 'react';
import NotificationBell from "../notificationBell";
import { Bell, Mail, Menu, X, User } from "lucide-react";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useLogout from '../../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function RightSideClient() {

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const logout = useLogout();

    const notificationRef = useRef(null);
    const profileMenuRef = useRef(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const pathname = useLocation().pathname

    const userDetails = useSelector((state) => state.user.userDetails);
    const client = userDetails;
    const freelancer = useSelector((state) => state.userProfile.userProfile);

    const [isShowNot, setIsShowNot] = useState(false);

    const handleSwitchClient = () => {
        const isFreelancerPath = pathname.includes("/freelancer");
        const destination = isFreelancerPath ? "/client" : "/freelancer/dashboard";
        const userType = isFreelancerPath ? "client" : "freelancer";
        const id = isFreelancerPath ? client?.id : freelancer?.id;
        dispatch(setUserType({ id, type: userType }));
        navigate(destination);
        setShowProfileMenu(false);
    };

    const renderProfileMenu = (type) => {
        const options =
            type === "freelancer"
                ? [
                    { name: "Switch to Client", action: handleSwitchClient },
                    { name: "View Profile", action: () => navigate("/freelancer/edit-profile") },
                    { name: "Logout", action: logout },
                ]
                : [
                    { name: "Switch to Freelancer", action: handleSwitchClient },
                    { name: "Dashboard", action: () => navigate("/client/dashboard") },
                    { name: "View Profile", action: () => navigate("/client/profile") },
                    { name: "Order", action: () => navigate("/client/orders") },
                    { name: "Logout", action: logout },
                ];

        return (
            <div className="px-3 border border-gray-300 absolute  right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50">
                {options.map(({ name, action }, i) => (
                    <button
                        key={i}
                        onClick={action}
                        className="text-black block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                    >
                        {name}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="flex  items-center gap-2 relative">
            <div ref={notificationRef} >
                <NotificationBell
                    isShowNot={isShowNot}
                    setIsShowNot={setIsShowNot}
                />
                {isShowNot && <NotificationDropdown />}
            </div>

            <button
                onClick={() =>
                    pathname.includes("client")
                        ? navigate("/client/messages")
                        : navigate("/freelancer/messages")
                }
                className="p-2 hover:bg-gray-100 rounded-md relative"
            >
                <Mail className="h-5 w-5 text-gray-600" />
            </button>

            <div ref={profileMenuRef} >
                <button
                    onClick={() => setShowProfileMenu((prev) => !prev)}
                    className="w-10 h-10  rounded-full flex justify-center items-center  overflow-hidden border border-black"
                >
                    {(pathname.includes("freelancer") && freelancer?.fileUrl) ||
                        (pathname.includes("client") && userDetails?.userImg) ? (
                        <img
                            src={
                                pathname.includes("freelancer")
                                    ? freelancer?.fileUrl
                                    : userDetails?.userImg
                            }
                            alt="User Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <User />
                    )}
                </button>
                {showProfileMenu &&
                    renderProfileMenu(
                        pathname.includes("freelancer") ? "freelancer" : "client"
                    )}
            </div>
        </div>
    )
}

export default RightSideClient