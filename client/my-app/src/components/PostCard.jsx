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
      const response = await axios.get("http://localhost:4001/api/posts");
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
      await axios.delete(`https://post-loom.onrender.com/api/posts/${postId}`);
      setPostData(postData.filter((post) => post._id !== postId));
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUpdate = (postId) => {};
  return (
    <div className="bg-white my-7 border rounded-lg shadow-md">
      {postData.map((post) => (
        <>
          <div className="flex items-center p-4 border-b" key={post._id}>
            <img
              src={`http://localhost:4001/Images/${post.userId.image}`}
              alt="akhilpic"
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
            src={`${API_URL}/Images/${post.image}`}
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
        </>
      ))}
    </div>
  );
}

export default PostCard;
