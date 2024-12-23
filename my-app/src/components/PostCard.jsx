import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import UpdatePost from "./UpdatePost";
import { API_URL } from "../utils/apiConfig";

function PostCard({ open, setOpen }) {
  const [postData, setPostData] = useState([]);
  const [confirm, setConfirm] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userDetails"));

  const fetchPostData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/posts`);
      setPostData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${API_URL}/api/posts/${postId}`);
      setPostData(postData.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = (postId) => {};

  return (
    <div className="bg-white my-7 border rounded-lg shadow-md">
      {postData && postData.length > 0 ? (
        postData.map((post) => (
          <div key={post._id}>
            <div className="flex items-center p-4 border-b">
              <img
                src={
                  post.userId && post.userId.image
                    ? `${API_URL}/Images/${post.userId.image}`
                    : ''  
                }
                alt="user-profile"
                className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 mr-3"
              />
              <p className="flex-1 font-semibold text-gray-800">{post.title}</p>

              {userData && userData._id === post.userId._id && (
                <div className="flex space-x-2 gap-4">
                  <FaPen
                    onClick={() => setUpdatePost(true)}
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                  />
                  <FaTrashAlt
                    onClick={() => handleDelete(post._id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  />
                </div>
              )}
            </div>
            <img
              src={post.image ? `${API_URL}/Images/${post.image}` : ''} 
              alt="sample"
              className="object-cover w-full h-auto rounded-b-lg"
            />
            <div className="p-4">
              <p className="truncate text-gray-700">
                <span className="font-bold text-gray-900 mr-2">{post.title}</span>
                {post.description}
              </p>
            </div>
            <UpdatePost
              open={updatePost}
              setOpen={setUpdatePost}
              postData={post}
            />
          </div>
        ))
      ) : (
        <p>No posts available</p>  
      )}
    </div>
  );
}

export default PostCard;
