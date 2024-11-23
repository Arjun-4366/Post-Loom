import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import axios from "axios"
import { API_URL } from "../utils/apiConfig";

function NewPost({ open, setOpen }) {
  
  const [previewImage, setPreviewImage] = useState(null);
  const[image,setImage] = useState(null)
  const [description,setDescription] = useState("")
  let fileRef = useRef(null);
  // Simulate loading for 2 seconds
const userData = JSON.parse(localStorage.getItem("userDetails"))
console.log("user",userData)
  const handleImageClick = () => {
    fileRef.current.click();
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file)
      const read = new FileReader();
      read.onload = () => {
        setPreviewImage(read.result);
      };
      read.readAsDataURL(file);
    }
  };

  const handleCancelUpload = () =>{
    setOpen(false)
    setPreviewImage(null)
  }

  const handleNewPost = async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("userId",userData._id)
    formData.append("title",userData.name)
    formData.append("image",image)
    formData.append("description",description)
    try{
     const response = await axios.post(`${API_URL}/api/posts`,formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
     })
     console.log("post created ",response.data)
     setOpen(false)

    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <Modal
      title={<p className="text-lg font-semibold">Post a new photo</p>}
      footer={null}
      open={open}
      onCancel={handleCancelUpload}>
      <div className="flex flex-col w-full items-center justify-center gap-4 p-7">
        <form onSubmit={handleNewPost} className="flex flex-col w-full items-center justify-center gap-4 p-7">
        <div
          className="border-2 border-dashed rounded-lg p-4 cursor-pointer"
          onClick={handleImageClick}>
          {previewImage ? (
            <img
              src={previewImage}
              alt="Preview"
              className="w-80 h-80 object-cover"
            />
          ) : (
            <p className="text-gray-500">Click to upload the image</p>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          className="hidden"
          onChange={handleUploadImage}
        />
        <textarea
          placeholder="Write your caption here..."
          className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={(e)=>setDescription(e.target.value)}/>
        <button className="bg-green-400 p-4 rounded-lg text-1xl text-white" type="submit">Post</button>
        </form>
      </div>
      
    </Modal>
  );
}

export default NewPost;