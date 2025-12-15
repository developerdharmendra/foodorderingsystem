import React from "react";
import {
  FaHome,
  FaSignInAlt,
  FaTruck,
  FaUserPlus,
  FaUserShield,
  FaUtensils,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/layout.css"
const PublicLayout = ({children}) => {
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
                <Link to="" className="nav-link">
                  <FaUtensils /> Menu
                </Link>
              </li>
              <li className="nav-item">
                <Link to="" className="nav-link">
                  <FaTruck /> Track
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  <FaUserPlus /> Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="" className="nav-link">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin-login" className="nav-link">
                  <FaUserShield /> Admin
                </Link>
              </li>
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
