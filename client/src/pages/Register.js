import React, { useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    cpassword: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <PublicLayout>
        <section className="py-4">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className=" col-11 col-md-8 shadow-lg rounded bg-light">
                <div className="row">
                  <div className="col-md-6 p-4">
                    <h5 className="text-primary text-center mb-3">
                      {" "}
                      <i className="fas fa-user-plus me-2"></i> User
                      Registration
                    </h5>
                    <form>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          placeholder="Enter your first Name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          placeholder="Enter your last Name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Enter your phone no."
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <textarea
                          className="form-control"
                          rows={1}
                          name="address"
                          placeholder="Enter your address"
                          value={formData.address}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                      <div className="mb-2">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="password"
                          className="form-control"
                          name="cpassword"
                          placeholder="Enter your conform password"
                          value={formData.cpassword}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="submit"
                          className="btn btn-success w-100"
                          value="Register"
                        />
                      </div>
                      <p className="text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-decoration-none">
                          Login
                        </Link>
                      </p>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <img
                        className="img-fluid"
                        style={{ height: "400px", width: "100%" }}
                        src="../images/login.jpg"
                      ></img>
                      <h6 className=" text-center pt-2 mb-0">
                        Registration is fast, secure and free
                      </h6>
                      <p className="text-center text-muted">
                        Join Our food family and enjoy delicious food delivered
                        to your door
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer position="top-right" autoClose={2000} />
        </section>
      </PublicLayout>
    </>
  );
};

export default Register;
