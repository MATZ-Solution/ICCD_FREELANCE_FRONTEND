import React from 'react'
import { useState, useEffect } from 'react';
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

    // Enhanced function to close profile menu
    const closeProfileMenu = () => {
        setShowProfileMenu(false);
    };

    const handleSwitchClient = () => {
        const isFreelancerPath = pathname.includes("/freelancer");
        const destination = isFreelancerPath ? "/client" : "/freelancer/dashboard";
        const userType = isFreelancerPath ? "client" : "freelancer";
        const id = isFreelancerPath ? client?.id : freelancer?.id;
        dispatch(setUserType({ id, type: userType }));
        navigate(destination);
    };

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close notification dropdown if clicked outside
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setIsShowNot(false);
            }
            
            // Close profile menu if clicked outside
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(event.target)
            ) {
                setShowProfileMenu(false);
            }
        };

        // Add event listener when any dropdown is open
        if (isShowNot || showProfileMenu) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchstart", handleClickOutside); // For mobile devices
        }

        // Cleanup function to remove event listeners
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, [isShowNot, showProfileMenu]);

    // Handle escape key to close dropdowns
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                setShowProfileMenu(false);
                setIsShowNot(false);
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    // Close profile menu when route changes
    useEffect(() => {
        setShowProfileMenu(false);
    }, [pathname]);

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
                    { name: "Posted Projects", action: () => navigate("/client/projects") },
                    { name: "Posted Jobs", action: () => navigate("/client/jobs") },
                    { name: "DisputesList", action: () => navigate("/client/DisputesList") },

                    { name: "Logout", action: logout },
                ];

        return (
            <div 
                ref={profileMenuRef}
                className="px-3 border border-gray-300 absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg py-1 z-50"
                role="menu"
                aria-label="Profile menu"
            >
                {options.map(({ name, action }, i) => (
                    <button
                        key={i}
                        onClick={async (e) => {
                            try {
                                // Prevent event bubbling
                                e.stopPropagation();
                                
                                // Close menu immediately to provide instant feedback
                                closeProfileMenu();
                                
                                // Execute the action after a small delay to ensure menu closes
                                await new Promise(resolve => setTimeout(resolve, 50));
                                action();
                            } catch (error) {
                                console.error('Profile menu action error:', error);
                                // Ensure menu stays closed even if action fails
                                closeProfileMenu();
                            }
                        }}
                        className="text-black block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200"
                        role="menuitem"
                    >
                        {name}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="flex items-center gap-2 relative">
            <div ref={notificationRef} className="relative">
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
                className="p-2 hover:bg-gray-100 rounded-md relative transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                aria-label="View messages"
            >
                <Mail className="h-5 w-5 text-gray-600" />
            </button>

            <div className="relative">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowProfileMenu((prev) => !prev);
                    }}
                    className="w-10 h-10 rounded-full flex justify-center items-center overflow-hidden border border-black focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Open profile menu"
                    aria-expanded={showProfileMenu}
                    aria-haspopup="menu"
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
                        <User aria-hidden="true" />
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