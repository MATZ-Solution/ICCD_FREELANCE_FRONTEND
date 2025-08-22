import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon, East as EastIcon } from "@mui/icons-material";

function RightSideHome() {

  const navigate = useNavigate()

  return (
    <div className=" flex gap-4">
      <button
        onClick={() => navigate("/login")}
        className="px-4 py-2 font-semibold bg-[#15A9B2] text-white rounded-md cursor-pointer hover:bg-[#05929c]"
      >
        Login / SignUp
      </button>
      {/* <button
        onClick={() => navigate("/signup")}
        className="shadow-xl hidden md:flex items-center gap-3 px-4 py-2 bg-[#15A9B2] text-white rounded-md hover:bg-[#05929c] transition font-semibold"
      >
        <p>Get Started Now</p>
        <div className="rounded-full px-2 py-1 bg-[#60cfd6]">
          <EastIcon style={{ fontSize: 20 }} />
        </div>
      </button> */}
    </div>
  )
}

export default RightSideHome