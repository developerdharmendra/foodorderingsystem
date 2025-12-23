
import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

const OrderCancelled = () => {
  const [orders, setOrders] = useState([]);
  const adminUser = localStorage.getItem("adminUser");
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminUser) {
      navigate("/admin-login");
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}order-cancelled/`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  return (
    <AdminLayout>
      <h4 className="text-center mb-3">
        <i className="fa fa-list"></i> Details of Order Cancelled
      </h4>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end gap-2 align-items-center">
          <h6 className="text-muted">
            <i className="fas fa-database me-1"></i> Total Orders Cancelled
            <span className="badge bg-success ms-2 p-2">{orders.length}</span>
          </h6>
        </div>

        <div className="col-md-12">
          <div className="my-3 d-flex justify-content-end">
            
            <CSVLink data={orders} filename={"orders.csv"}>
              <button className="btn btn-primary btn-sm mt-2 d-flex gap-2 align-items-center">
                <i className="fas fa-file-csv"></i> Export to Excel
              </button>
            </CSVLink>
          </div>
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
                    <a href={`/admin-view-order-detail/${item.order_number}`} className="btn btn-sm btn-primary">
                      <i className="fa fa-eye"></i>  View Details
                    </a>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No Order Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default OrderCancelled;

