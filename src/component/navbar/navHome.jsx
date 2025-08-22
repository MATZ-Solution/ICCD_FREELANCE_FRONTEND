import React from 'react'
import { useState } from 'react';
import logo from "../../assets/ICCD-01.png"
import { Bell, Mail, Menu, X, User } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { navigation, navTabsClientDashboard, navTabsFreelancerDashboard } from '../../../constants/navbar_navigation'
import { Search as SearchIcon, East as EastIcon } from "@mui/icons-material";
import "../../css/navbar.css";
import MobileMenu from './mobileMenu';
import RightSideHome from './rightSideHome';
import RightSideClient from './rightSideClient';

function NavHome() {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const pathName = useLocation().pathname
    const [isOpen, setIsOpen] = useState(false);
    const isActive = (path) => pathName === path;
    const navTabs = pathName.startsWith('/client')
        ? navTabsClientDashboard
        : pathName.startsWith('/freelancer')
            ? navTabsFreelancerDashboard
            : navigation;


    return (

        <header className="relative bg-black/2 border border-white/20 rounded-2xl shadow-lg">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
                {/* Logo */}
                <div className='flex items-center gap-3'>
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-black focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                    <div className="w-20 h-20 md:w-24 md:h-24 cursor-pointer">
                        <img src={logo} alt="logo" className="w-full h-full object-contain" />
                    </div>
                </div>
                <nav className=" space-x-6 items-center">
                    {
                        pathName === "/client" ?
                            <nav className="ml-10 sm:flex space-x-1 gap-4 flex">
                                <div className="relative hidden md:flex">
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="What services are you looking for today"
                                        className="rounded h-10 p-3 border border-gray-400  md:w-92 lg:w-xl"
                                    />
                                    <div className="absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black">
                                        <SearchIcon className="text-white" />
                                    </div>
                                </div>
                                {/* <button
                                    onClick={() => navigate(`/freelancer/dashboard`)}
                                    className="px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                >
                                    Switch to freelancer
                                </button> */}
                            </nav>
                            :
                            <div className='space-x-6 items-center hidden md:flex'>
                                {navTabs.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => navigate(item.path)}
                                        className={`text-black font-semibold transition ${isActive(item.path)
                                            ? "text-cyan-500 border-b-2 border-cyan-500"
                                            : "hover:text-[#15A9B2]"
                                            }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                    }
                </nav>
                {pathName.includes('client') || pathName.includes('freelancer') ?
                    <RightSideClient />
                    :
                    <RightSideHome />
                }
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <MobileMenu navigation={navTabs} setIsOpen={setIsOpen} />
            )}
        </header>
    )
}

export default NavHome