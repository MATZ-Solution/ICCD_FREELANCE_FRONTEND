import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { Search as SearchIcon, East as EastIcon } from "@mui/icons-material";

function MobileMenu({navigation, setIsOpen}) {

    const navigate = useNavigate()
    const pathName = useLocation().pathname
    const isActive = (path) => pathName === path;

    return (
        <div className="menu_button h-[100vh] px-4 py-6 space-y-6 flex-col bg-white shadow-2xl overflow-y-auto transition-all duration-300 ease-in-out">
            <div className="space-y-2">
                <h3 className="text-gray-500 uppercase text-xs font-semibold px-2 transition-colors duration-200">
                    Menu
                </h3>
                {navigation.map((item, index) => (
                    <button key={item.name}
                        onClick={() => {
                            navigate(item.path);
                            setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ease-out transform ${isActive(item.path)
                            ? "bg-cyan-50 text-cyan-600 font-semibold shadow-lg scale-[1.02]"
                            : "bg-gray-50 hover:bg-gray-100 text-gray-800 hover:scale-[1.02] hover:shadow-md"
                            }`}
                        style={{
                            animationDelay: `${index * 50}ms`,
                            animationFillMode: 'both'
                        }}
                    >
                        <span className="transition-colors duration-200">{item.name}</span>
                        <EastIcon
                            className={`transition-all duration-200 ${
                                isActive(item.path) ? 'text-cyan-500' : 'text-gray-400 group-hover:text-gray-600'
                            }`}
                            style={{ fontSize: 18 }}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default MobileMenu