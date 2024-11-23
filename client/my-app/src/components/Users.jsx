import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { API_URL } from "../utils/apiConfig";

function Users() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4001/api/users");
      setUsers(response.data.allUsers);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="bg-white p-5 rounded-lg ">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Users</h1>
      <ul className="space-y-3 overflow-y-auto h-[70vh]">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center bg-gray-50 shadow-sm hover:shadow-md rounded-lg p-3 transition duration-200">
            <img
              src={`${API_URL}/Images/${user.image}`}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover mr-3 border-2 border-gray-200"
            />
            <h2 className="text-md font-semibold text-gray-700">{user.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
