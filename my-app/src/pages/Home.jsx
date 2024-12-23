import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard';
import Users from '../components/Users';
import Navbar from '../components/Navbar';

function Home() {


    return (
      <div className="flex min-h-screen bg-white p-3 gap-2">
         <Navbar/>
        <div className=' bg-white flex-1 overflow-y-auto mt-16'>
        <PostCard/>
        </div>
        <div className='w-1/4 bg-white overflow-y-auto shadow-md h-screen sticky top-0 mt-20'>
        <Users/>

        </div>
      </div>
    );
  };
  


export default Home