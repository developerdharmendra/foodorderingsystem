import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const adminuser = localStorage.getItem("adminUser");
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    total_Users: 0,
    total_Orders: 0,
    total_foods:0,
    new_Orders: 0,
    confirmed_orders: 0,
    food_preparing: 0,
    food_pickup: 0,
    food_delivered: 0,
    cancelled_orders: 0,
    total_catagories: 0,
    today_sales: 0,
    weeks_sales: 0,
    monthly_sales: 0,
    yearly_sales: 0,
    total_reviews: 0,
    total_wishlists: 0,
  });
  const cardData = [
    {
      title: "Total Users",
      color: "primary",
      value: metrics.total_Users,
      icon: "fa-users",
    },
    {
      title: "Total Orders",
      color: "success",
      value: metrics.total_Orders,
      icon: "fa-shopping-cart",
    },
    {
      title: "Total Food",
      color: "secondary",
      value: metrics.total_foods,
      icon: "fa-burger",
    },
    {
      title: "New Orders",
      color: "info",
      value: metrics.new_Orders,
      icon: "fa-plus-circle",
    },
    {
      title: "Confirmed Orders",
      color: "warning",
      value: metrics.confirmed_orders,
      icon: "fa-check-circle",
    },
    {
      title: "Food Preparing",
      color: "secondary",
      value: metrics.food_preparing,
      icon: "fa-utensils",
    },
    {
      title: "Food Pickup",
      color: "success",
      value: metrics.food_pickup,
      icon: "fa-truck",
    },
    {
      title: "Food Delivered",
      color: "dark",
      value: metrics.food_delivered,
      icon: "fa-box-open",
    },
    {
      title: "Cancelled Orders",
      color: "danger",
      value: metrics.cancelled_orders,
      icon: "fa-times-circle",
    },
    {
      title: "Total Categories",
      color: "primary",
      value: metrics.total_catagories,
      icon: "fa-list",
    },
    {
      title: "Total Reviews",
      color: "warning",
      value: metrics.total_reviews,
      icon: "fa-star",
    },
    {
      title: "Total Wishlists",
      color: "primary",
      value: metrics.total_wishlists,
      icon: "fa-heart",
    },
    {
      title: "Today's Sales",
      color: "info",
      value: metrics.today_sales,
      icon: "fa-dollar-sign",
    },
    {
      title: "Week's Sales",
      color: "success",
      value: metrics.weeks_sales,
      icon: "fa-dollar-sign",
    },
    {
      title: "Monthly Sales",
      color: "primary",
      value: metrics.monthly_sales,
      icon: "fa-dollar-sign",
    },
    {
      title: "Yearly Sales",
      color: "dark",
      value: metrics.yearly_sales,
      icon: "fa-dollar-sign",
    },
    
  ];
  useEffect(() => {
    if (!adminuser) {
      navigate("/adminlogin");
    }
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}dashboard_metrices/`);
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };
    fetchMetrics();
  }, []);
  return (
    <>
      <AdminLayout>
        <div className="row g-3">
          {cardData.map((card, index) => (
            <div className="col-md-3" key={index}>
              <div
                className={`card text-white bg-${card.color} mb-2 text-center p-2`}
              >
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{card.title}</h5>
                    <h2 className="card-text">{ (card.title.includes('Sales'))? `Rs ${card.value}`: card.value}</h2>
                  </div>
                  <div>
                    <i className={`fa ${card.icon} fs-1`}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
         
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
