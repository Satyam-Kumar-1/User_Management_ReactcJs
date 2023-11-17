import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AccountCreation.css";
const url='https://user-management-server-d71b.onrender.com/';

const AccountCreation = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the list of registered users when the component mounts
    const fetchRegisteredUsers = async () => {
      try {
        const response = await fetch(`${url}api/getRegisteredUsers`);
        if (!response.ok) {
          throw new Error("Failed to fetch registered users");
        }

        const users = await response.json();
        setRegisteredUsers(users);
      } catch (error) {
        console.error("Error fetching registered users:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredUsers();
  }, []); // Run this effect only once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}api/admin/createadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      // After successful registration, update the list of registered users
      const newUser = { username: formData.username };
      setRegisteredUsers([...registeredUsers, newUser]);

      // Clear the form
      setFormData({
        username: "",
        password: "",
      });

      // Display success toast notification
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error.message);

      // Display error toast notification
      toast.error("Failed to create account");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  mx-4">
  <div className="bg-gradient-to-br bg-gray-100 from-yellow via-orange to-purple p-8  rounded-md shadow-md w-full max-w-md mx-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Account Creation</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
             


            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Toast container for notifications */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default AccountCreation;
