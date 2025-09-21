// NavHome.jsx
import React, { useState } from 'react';
import logo from "../../assets/ICCD-01.png"
import { Bell, Mail, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { navigation, navTabsClientDashboard, navTabsFreelancerDashboard, navTabsSuperAdminDashboard } from '../../../constants/navbar_navigation'
import { Search as SearchIcon } from "@mui/icons-material";
import "../../css/navbar.css";
import MobileMenu from './mobileMenu';
import RightSideHome from './rightSideHome';
import RightSideClient from './rightSideClient';

function NavHome() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);

  // query string se search term leke input mai dalna
  const query = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(query.get("query") ?? "");

  const isActive = (path) => pathName === path;

  const navTabs = pathName.startsWith('/client')
    ? navTabsClientDashboard
    : pathName.startsWith('/freelancer')
      ? navTabsFreelancerDashboard
      : pathName.startsWith('/superadmin')
        ? navTabsSuperAdminDashboard
        : navigation;

  function handleSearch() {
    const trimmedSearch = search.trim();
    const newUrl = trimmedSearch
      ? `?query=${encodeURIComponent(trimmedSearch)}`
      : window.location.pathname;

    navigate(newUrl, { replace: true });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  }

  return (
    <header className="relative bg-black/2 border border-white/20 rounded-2xl shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        {/* Logo + mobile menu */}
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
            <img onClick={() => navigate('/')} src={logo} alt="logo" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* Navigation + Search */}
        <nav className="space-x-6 items-center">
          {pathName.startsWith("/client") ? (
            <div className="relative hidden md:flex">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What services are you looking for today?"
                className="rounded h-10 p-3 border border-gray-400 md:w-96"
              />
              <button
                onClick={handleSearch}
                className="absolute w-10 h-10 top-0 right-0 flex items-center justify-center bg-black"
                aria-label="Search"
              >
                <SearchIcon className="text-white" />
              </button>
            </div>
          ) : (
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
          )}
        </nav>

        {/* Right side */}
        {pathName.startsWith('/client') || pathName.startsWith('/freelancer')
          ? <RightSideClient />
          : <RightSideHome />
        }
      </div>

      {/* Mobile Menu */}
      {isOpen && <MobileMenu navigation={navTabs} setIsOpen={setIsOpen} />}
    </header>
  );
}

export default NavHome;
