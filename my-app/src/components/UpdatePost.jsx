import { Modal } from "antd";
import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import { API_URL } from "../utils/apiConfig";

function UpdatePost({ open, setOpen, postData }) {
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const fileRef = useRef(null);
  console.log("post data", postData);

  const userData = JSON.parse(localStorage.getItem("userDetails"));

  useEffect(() => {
    if (postData) {
      setDescription(postData.description);
      setPreviewImage(`${API_URL}/Images/${postData.image}`);
    }
  }, [open, postData]);

  const handleImageClick = () => {
    fileRef.current.click();
  };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelUpload = () => {
    setOpen(false);
    setPreviewImage(null);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", userData._id);
    formData.append("title", userData.name);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/posts/${postData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("post updated ", response.data);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      title={<p className="text-lg font-semibold">Update your post</p>}
      footer={null}
      open={open}
      onCancel={handleCancelUpload}>
      <div className="flex flex-col w-full items-center justify-center gap-4 p-7">
        <form
          onSubmit={handleUpdatePost}
          className="flex flex-col w-full items-center justify-center gap-4 p-7">
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
              <p className="text-gray-500">Click to upload a new image</p>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your caption here..."
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="bg-green-400 p-4 rounded-lg text-1xl text-white"
            type="submit">
            Update Post
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default UpdatePost;
