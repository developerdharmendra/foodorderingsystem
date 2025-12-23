import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendar,
  FaChevronDown,
  FaChevronUp,
  FaEdit,
  FaFacebookMessenger,
  FaList,
  FaSearch,
  FaStar,
  FaThLarge,
  FaUsers,
} from "react-icons/fa";
const AdminSiderbar = () => {
  const [openMenus, setOpenMenus] = useState({
    category: false,
    food: false,
    order: false,
  });
  const toggleMenu = (menu) => {
    setOpenMenus((prevMenus) => ({
      ...prevMenus,
      [menu]: !prevMenus[menu],
    }));
  };
  return (
    <div className="bg-dark text-white siderbar">
      <div className="text-center border-bottom p-3">
        <img
          src="../images/user.png"
          width="80"
          className="img-fluid rounded-circle"
        ></img>
        <h6 className="pt-2 mb-0">Admin</h6>
      </div>
      <div className="list-group list-group-flush">
        <Link
          to="/admin-dashboard"
          className="list-group-item list-group-item-action bg-dark text-white border-0"
        >
          <FaThLarge /> Dashboard
        </Link>
        <Link
          to=""
          className="list-group-item list-group-item-action bg-dark text-white border-0"
        >
          <FaUsers /> Users
        </Link>
        <button
          className="list-group-item list-group-item-action bg-dark text-white border-0 d-flex justify-content-between"
          onClick={() => toggleMenu("category")}
        >
          <span>
            <FaEdit /> Food Category{" "}
          </span>{" "}
          <span>
            {openMenus.category ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </button>
        {openMenus.category && (
          <div className="ps-4">
            <Link
              to="/add-category"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Add Category
            </Link>
            <Link
              to="/manage-category"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Manage Category
            </Link>
          </div>
        )}

        <button
          className="list-group-item list-group-item-action bg-dark text-white border-0 d-flex justify-content-between"
          onClick={() => toggleMenu("food")}
        >
          <span>
            <FaEdit /> Food Item{" "}
          </span>{" "}
          <span>{openMenus.food ? <FaChevronUp /> : <FaChevronDown />}</span>
        </button>
        {openMenus.food && (
          <div className="ps-4">
            <Link
              to="/add-food"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Add Item
            </Link>
            <Link
              to="/manage-food"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Manage Item
            </Link>
          </div>
        )}
        <button
          className="list-group-item list-group-item-action bg-dark text-white border-0 d-flex justify-content-between"
          onClick={() => toggleMenu("order")}
        >
          <span>
            <FaList /> Orders
          </span>{" "}
          <span>{openMenus.order ? <FaChevronUp /> : <FaChevronDown />}</span>
        </button>
        {openMenus.order && (
          <div className="ps-4">
            <Link
              to="/not-confirmed"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Not Confirmed
            </Link>
            <Link
              to="/order-confirmed"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Confirmed
            </Link>
            <Link
              to="/food-prepared"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Being Prepared
            </Link>
            <Link
              to="/food-pickup"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Food Pickup
            </Link>
            <Link
              to="/order-delivered"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Delivered
            </Link>
            <Link
              to="/order-cancelled"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              Cancelled
            </Link>
            <Link
              to="/all-orders"
              className="list-group-item list-group-item-action bg-dark text-white border-0"
            >
              All Orders
            </Link>
          </div>
        )}

        <Link
          to="/order-report"
          className="list-group-item list-group-item-action bg-dark text-white border-0"
        >
          <FaCalendar /> Date Report
        </Link>
        <Link
          to=""
          className="list-group-item list-group-item-action bg-dark text-white border-0"
        >
          <FaSearch /> Search
        </Link>
        <Link
          to=""
          className="list-group-item list-group-item-action bg-dark text-white border-0"
        >
          <FaStar /> Manage Reviews
        </Link>
      </div>
    </div>
  );
};

export default AdminSiderbar;
