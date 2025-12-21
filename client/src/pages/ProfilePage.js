import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";

const ProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    reg_date: "",
  });
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}user/${userId}/`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
      });
  }, [userId]);

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}update-user/${userId}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            address: formData.address,
          }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };
  return (
    <PublicLayout>
      <section className="py-4">
        <ToastContainer position="top-right" autoClose={2000} />
        <div className="container">
          <h4 className="mb-4 text-center text-primary">
            <i className="fa fa-user"></i> My Profile
          </h4>
          <div className="row justify-content-center">
            <form onSubmit={handelSubmit} className="card p-4 shadow-sm ">
              <div className="row g-3">
                <div className="mb-2 col-md-6">
                  <label className="form-label fw-semibold">First Name</label>
                  <input
                    type="text"
                    className="form-control border-primary-subtle"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handelChange}
                  />
                </div>
                <div className="mb-2 col-md-6">
                  <label className="form-label fw-semibold">Last Name</label>
                  <input
                    type="text"
                    className="form-control border-primary-subtle"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handelChange}
                  />
                </div>
                <div className="mb-2 col-md-6">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control border-secondary-subtle"
                    value={formData.last_name}
                    disabled
                  />
                </div>
                <div className="mb-2 col-md-6">
                  <label className="form-label fw-semibold">Phone</label>
                  <input
                    type="text"
                    className="form-control border-secondary-subtle"
                    value={formData.phone}
                    disabled
                  />
                </div>
                <div className="mb-2 col-md-6">
                  <label className="form-label fw-semibold">
                    Regration Date
                  </label>
                  <input
                    type="text"
                    className="form-control border-secondary-subtle"
                    value={new Date(formData.reg_date).toLocaleString()}
                    disabled
                  />
                </div>
                <div className="mb-2 col-md-6">
                  <label className="form-label fw-semibold">Address</label>
                  <textarea
                    className="form-control border-primary-subtle"
                    name="address"
                    value={formData.address}
                    onChange={handelChange}
                  >
                    {" "}
                  </textarea>
                </div>

                <div className="my-2 col-md-12">
                  <button type="submit" className="btn btn-primary w-100 py-2">
                    <FaEdit /> Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ProfilePage;
