import React, { useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { axios, setToken, setUser, navigate } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setToken(data.token);
        setUser(data.user);

        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        toast.success("Login Successfully");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Enter correct Credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full text-center py-6">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">User </span>Login
            </h1>

            <p className="font-light">
              Enter your credentials to access admin panel.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full mt-6 sm:max-w-md text-gray-600"
          >
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                required
                placeholder="your email id"
                className="border-b-2 border-gray-300 p-2 mb-6 outline-none"
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
                placeholder="your password"
                className="border-b-2 border-gray-300 p-2 mb-6 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
