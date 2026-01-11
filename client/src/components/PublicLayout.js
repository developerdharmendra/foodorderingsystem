import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaHome,
  FaKey,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaTruck,
  FaUser,
  FaUserPlus,
  FaUserShield,
  FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/layout.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";

const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const {cartCount, setCartCount} = useCart();

  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("userName");

  const fetchCartCount = async () => {
    if (userId) {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}cart/${userId}`
      );
      const data = await response.json();
      setCartCount(data.length);
    }
  };

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      setUserName(name);
      fetchCartCount();
    } else {
      setIsLoggedIn(false);
    }
  }, [userId, name]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    toast.success("Logout successful");
    setIsLoggedIn(false);
    setCartCount(0);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.trim().split(" ");
    const initials = nameParts
      .map((part) => part[0].toUpperCase())
      .slice(0, 2)
      .join("");
    return initials;
  };

  const initials = getInitials(userName);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm position-fixed top-0 w-100 z-3">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img src="../images/logo.png" width={50}></img>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  <FaHome /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/menu" className="nav-link">
                  <FaUtensils /> Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link to="" className="nav-link">
                  <FaTruck /> Track
                </Link>
              </li>
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      <FaUserPlus /> Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      <FaSignInAlt /> Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/admin-login" className="nav-link">
                      <FaUserShield /> Admin
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/my-orders" className="nav-link">
                      <FaUser />
                      My Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                      <FaShoppingCart /> Cart{cartCount > 0 && `(${cartCount})`}
                    </Link>
                  </li>
                  <li className="nav-item me-2">
                    <Link to="/wishlist" className="nav-link">
                      <FaHeart /> Wishlist
                    </Link>
                  </li>

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link d-flex align-items-center justify-content-center"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: "#0d6efd",
                        color: "#fff",
                        textAlign: "center",
                        lineHeight: "40px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                      }}
                    >
                      {initials}
                    </a>

                    <ul
                      className="dropdown-menu mt-3 rounded-0"
                      style={{ marginLeft: "-25px" }}
                    >
                      <li className="dropdown-item">{userName}</li>
                      <hr className="py-1 my-0" />
                      <li>
                        <Link to="/my-profile" className="dropdown-item">
                          <FaUser /> Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/change-password" className="dropdown-item">
                          <FaKey /> Change Password
                        </Link>
                      </li>

                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt /> Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
       
      </nav>
      <main className="mt-5 pt-3 bg-body-secondary">{children}</main>
      <footer className="bg-light py-3 text-center">
        <span>&copy; {new Date().getFullYear()} All rights reserved </span>
      </footer>
    </>
  );
};

export default PublicLayout;
