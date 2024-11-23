import React, { useRef, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const handleRegister = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    if (image) {
      formData.append("image", image);
    }

    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const response = await axios.post(
        "http://localhost:4001/api/register",
        formData,
        config
      );
      localStorage.setItem("userDetails", JSON.stringify(response.data));
      setMessage(response.data.message);
      console.log(response.data)
      if(response.data){
        navigate("/home")
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const changeHandler = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="flex items-center justify-center min-h-screen h-3/6 p-10 ">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 ">
        <div className="flex flex-col items-center justify-center md:p-14">
          <span className="mb-3 text-4xl font-bold text-green-400">
            PostLoom
          </span>
          <form onSubmit={handleRegister}>
            <div
              className="flex items-center justify-center cursor-pointer"
              onClick={triggerFileInput}>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <FaRegUserCircle className="text-6xl text-green-400" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <div className="mt-2 flex flex-col">
              <span className="mb-2 text-md">Name</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="name"
                id="name"
                value={userData.name}
                onChange={(e)=>setUserData({...userData,name:e.target.value})}
              />
            </div>
            <div className="mt-2 flex flex-col">
              <span className="mb-2 text-md">Email</span>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                name="email"
                id="email"
                value={userData.email}
                onChange={(e)=>setUserData({...userData,email:e.target.value})}
              />
            </div>
            <div className="mt-2 flex flex-col mb-2">
              <span className="mb-2 text-md">Password</span>
              <input
                type="password"
                name="pass"
                id="pass"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                value={userData.password}
                onChange={(e)=>setUserData({...userData,password:e.target.value})}
              />
            </div>

            <button className="w-full bg-green-500 text-white p-2 rounded-lg  hover:bg-green-700 " type="submit">
              Register
            </button>
          </form>

          <div className="text-center text-gray-400 mt-2">
            All ready have an account ?
            <span
              className="font-bold text-black cursor-pointer hover:underline"
              onClick={() => navigate("/")}>
              {" "}
              Login here
            </span>
          </div>
        </div>

        <div className="relative">
          <img
            src="/register.jpg"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
