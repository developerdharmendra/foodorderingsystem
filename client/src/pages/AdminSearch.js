import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminSearch = () => {
  const adminuser = localStorage.getItem("adminUser");
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!adminuser) {
      navigate("/admin-login");
      return;
    }
  }, []);
  const handelSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}admin-search/?q=${searchTerm}`
      );
      const data = await response.json();
      if (response.status === 200) {
        setOrders(data);
        setSubmitted(true);
      }
    } catch (error) {
      toast.error("An error occurred while searching. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <div className="container mt-3">
        <h4 className="text-center mb-4 text-primary">
          <i className="fa fa-search"></i> Admin Search Page
        </h4>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handelSearch}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search orders by order number or user name"
                  name="q"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </form>
          </div>
          {submitted && (
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
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={order.order_number}>
                      <td>{index + 1}</td>
                      <td>{order.order_number}</td>
                      <td>{new Date(order.order_time).toLocaleString()}</td>
                      <td>
                        <a
                          href={`/admin-view-order-detail/${order.order_number}`}
                          className="btn btn-sm btn-primary"
                        >
                          <i className="fa fa-eye"></i> View Details
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No orders found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSearch;
