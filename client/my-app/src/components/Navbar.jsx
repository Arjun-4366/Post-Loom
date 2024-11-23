import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPodcast } from "react-icons/fa";
import { CiCirclePlus, CiLogout } from "react-icons/ci";
import NewPost from "./NewPost";
import { MdOutlineExitToApp } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const [openNewPost, setOpenNewPost] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userDetails"))
  const handleLogout = () =>{
   localStorage.removeItem("userDetails")
   navigate("/")
  }
  return (
    <div className="flex items-center justify-between px-3 shadow fixed top-0 left-0 w-full bg-white z-10">

      <div className="flex items-center p-2">
        <h1
          className="text-green-600 text-2xl font-semibold cursor-pointer m-1"
          onClick={() => navigate("/home")}
        >
          PostLoom
        </h1>
        <FaPodcast className="text-2xl text-green-500" />
      </div>

   
      <input
        type="text"
        placeholder="Search here..."
        className="bg-gray-200 border border-green-400 rounded text-sm w-full py-2 max-w-[300px] lg:max-w-[400px] p-3"
      />

     
      <div className="flex items-center gap-5">
        
        <CiCirclePlus
          className="text-3xl cursor-pointer text-green-400"
          onClick={() => setOpenNewPost(true)} 
        />
        
        <div className="p-2">
          <img src={`http://localhost:4001/Images/${userData.image}`} alt="User" className="w-12 h-12 rounded-full" />
        </div>
        {userData && (
           <MdOutlineExitToApp onClick={handleLogout} className="text-2xl text-red-500 cursor-pointer"/>
        )}
      
      </div>

      
      <NewPost open={openNewPost} setOpen={setOpenNewPost} />
    </div>
  );
}

export default Navbar;
