import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderReport = () => {
  const adminUser = localStorage.getItem("adminUser");
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    status: "all",
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminUser) {
      navigate("/admin-login");
      return;
    }
  }, []);
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}order-report/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setOrders(data);
      toast.success("Report generated successfully");
    } catch (error) {
      console.error("Error fetching order report:", error);
      toast.error("Failed to generate report. Please check server logs.");
    }
  };
  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <h4 className="text-center mb-3 text-primary">
        <i className="fa fa-bar-chart"></i> Order Report
      </h4>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={handelSubmit} className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label">From Date</label>
              <input
                type="date"
                className="form-control"
                name="fromDate"
                value={formData.fromDate}
                onChange={handelChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">To Date</label>
              <input
                type="date"
                className="form-control"
                name="toDate"
                value={formData.toDate}
                onChange={handelChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                name="status"
                value={formData.status}
                onChange={handelChange}
              >
                <option value="all">All</option>
                <option value="not_confirmed">Not Confirmed</option>
                <option value="Order Confirmed">Order Confirmed</option>
                <option value="Food being prepared">Food being prepared</option>
                <option value="Food Pickup">Food Pickup</option>
                <option value="Food Delivered">Food Delivered</option>
                <option value="Order Cancelled">Order Cancelled</option>
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Generate Report
              </button>
            </div>
          </form>
        </div>
        {orders.length > 0 && (
          <div className="col-md-12">
            <table className="table table-bordered table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Order Number</th>
                  <th>Order Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.order_number}</td>
                    <td>{new Date(item.order_time).toLocaleString()}</td>
                    <td>
                      <a
                        href={`/admin-view-order-detail/${item.order_number}`}
                        className="btn btn-sm btn-primary"
                      >
                        <i className="fa fa-eye"></i> View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrderReport;
