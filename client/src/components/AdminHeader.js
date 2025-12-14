import React from "react";
import { FaBars, FaBell, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin-login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-3 border-bottom shadow-sm">
      <button className="btn btn-outline-dark me-3">
        {sidebarOpen ? (
          <FaChevronLeft onClick={toggleSidebar} />
        ) : (
          <FaChevronRight onClick={toggleSidebar} />
        )}
      </button>
      <span className="navbar-brand fw-semibold">
        <i className="fas fa-utensils"></i> Food Ordering System
      </span>
      <button className="navbar-toggler border-0 ms-auto" type="button">
        <FaBars />
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto align-items-center gap-3">
          <li className="nav-item">
            <button className="btn btn-outline-secondary">
              <FaBell />
            </button>
          </li>
          <li className="nav-item">
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminHeader;
