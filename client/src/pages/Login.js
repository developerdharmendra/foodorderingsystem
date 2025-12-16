import React, { useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailcont: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const { emailcont, password } = formData;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailcont, password }),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Login Successfully");
        setFormData({
          emailcont: "",
          password: "",
        });
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("userName", data.userName);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went Wrong");
    }
  };

  return (
    <PublicLayout>
      <section className="min-vh-100 d-flex align-items-center justify-content-center  ">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-11 col-sm-8 col-md-5 col-lg-4">
              <div className="card shadow-lg border-0 rounded-4">
                <div className="card-body p-4">
                  <h5 className="text-primary text-center mb-3">
                    <i className="fas fa-sign-in-alt me-2"></i> User Login
                  </h5>

                  <form onSubmit={handelSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your email or Phone"
                        name="emailcont"
                        value={formData.emailcont}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-success w-100">
                      Login
                    </button>
                    <p className="text-center mt-3">
                      Don't have an account?{" "}
                      <Link to="/register" className="text-primary">
                        Register
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={2000} />
      </section>
    </PublicLayout>
  );
};

export default Login;
