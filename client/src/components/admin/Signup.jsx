import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Signup = () => {
  const { axios, setToken, setUser, navigate } = useAppContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/admin/signup", {
      name,
      email,
      password,
    });

    try {
      if (data.success) {
        toast.success(data.message);
        setToken(data.token);
        setUser(data.user);

        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">User </span>SignUp
            </h1>

            <p className="font-light py-2">New to Site?</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-6 sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                required
                className="border-b-2 border-gray-300 outline-none p-2 mb-6"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                required
                className="border-b-2 border-gray-300 outline-none p-2 mb-6"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                required
                className="border-b-2 border-gray-300 outline-none p-2 mb-6"
              />
            </div>
          </form>

          <button
            onClick={handleSubmit}
            className="w-full py-3 mb-2 font-medium bg-primary text-white rounded-lg cursor-pointer hover:bg-primary/90 transition-all6"
          >
            Sign Up
          </button>

          <div className="w-full text-right mt-4 text-gray-700 text-md">
            Already have an account?{"   "}
            <a
              href="/login"
              className="text-primary font-semibold hover:underline "
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
