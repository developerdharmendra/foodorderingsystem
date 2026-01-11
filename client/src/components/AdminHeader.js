import React, { useEffect, useState } from "react";
import { FaBars, FaBell, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const AdminHeader = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
   const [newOrders, setNewOrders] = useState(0);
    useEffect(()=>{
      const fetchMetrics = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}dashboard_metrices/`);
          const data = await response.json();
          setNewOrders(data);
        } catch (error) {
          console.error("Error fetching metrics:", error);
        }
      };
      fetchMetrics();
    },[])
  const handleLogout = () => {
    localStorage.removeItem("adminUser");
    navigate("/admin-login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white px-3 py-3 border-bottom shadow-sm">
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
            <Link to="/not-confirmed"  type="button" className="btn btn-outline-secondary position-relative" title="View all New Orders">
            <FaBell />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill px-2 py-1  bg-danger">
             {newOrders.new_Orders}
              <span className="visually-hidden">unread messages</span>
            </span>
          </Link>
            
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
