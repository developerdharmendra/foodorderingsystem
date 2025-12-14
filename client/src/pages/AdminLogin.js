import React, { useState } from "react";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}admin-login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("adminUser", username);
        toast.success(data.message);
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: 'url("../images/bg1.jpg")',
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="text-center ">
          <img src="../images/logo.png" alt="Logo" style={{ width: "100px" }} />
        </div>
        <h4 className="mb-3 text-center">Admin Login</h4>
        <form onSubmit={handleLogin}>
          <div className="input-group mb-4">
            <span className="input-group-text" id="username">
              <FaUser />
            </span>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-4">
            <span className="input-group-text" id="password">
              <FaLock />
            </span>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="password"
              aria-label="password"
              aria-describedby="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            <FaSignInAlt className="me-2" />
            Login
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default AdminLogin;
