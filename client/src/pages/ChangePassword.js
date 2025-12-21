import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaKey } from "react-icons/fa";

const ChangePassword = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New password and confirm password do not match");
        return;
      }
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}change-password/${userId}/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error("Failed to change password");
    }
  };
  return (
    <PublicLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <section className="py-4">
        <div className="container">
          <h4 className="mb-4 text-center text-primary">
            <FaKey /> Change Password
          </h4>
          <div className="row justify-content-center">
            <div className="col-md-6 card p-4 border-0">
              <form onSubmit={handelSubmit}>
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handelChange}
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handelChange}
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handelChange}
                    placeholder="Enter confirm new password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  <FaKey/>  Change Password
                </button>

              </form>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ChangePassword;
