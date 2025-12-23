import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewFoodOrder = () => {
  const { order_number } = useParams();
  const adminuser = localStorage.getItem("adminUser");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!adminuser) {
      navigate("/admin-login");
    }
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}view-order-detail/${order_number}`
    ).then((res) =>
      res.json().then((data) => {
        setData(data);
      })
    );
  }, [order_number]);
  if (!data)
    return (
      <AdminLayout>
        <p className="mt-3 text-center">Loading...</p>
      </AdminLayout>
    );
  const { order_address, ordered_foods, tracking_info } = data;
  const statusOptions = [
    "Order Confirmed",
    "Food being prepared",
    "Food Pickup",
    "Food Delivered",
    "Order Cancelled",
  ];
  const currentStatus = order_address.order_final_status || "Pending";
  const visibleOptions = statusOptions.slice(
    statusOptions.indexOf(currentStatus) + 1
  );

  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="container mt-3">
        <h4 className="text-center mb-4 text-primary">
          <i className="fa fa-eye"></i> Order Details #
          {order_address.order_number}
        </h4>
        <div className="row">
          <div className="col-md-6">
            <h5>User Info</h5>
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th>First Name</th> <td>{order_address.user_first_name}</td>
                </tr>
                <tr>
                  <th>Last Name</th> <td>{order_address.user_last_name}</td>
                </tr>
                <tr>
                  <th>Email</th> <td>{order_address.user_email}</td>
                </tr>
                <tr>
                  <th>Phone</th> <td>{order_address.user_mobile}</td>
                </tr>
                <tr>
                  <th>Address</th> <td>{order_address.address}</td>
                </tr>
                <tr>
                  <th>Order Time</th>{" "}
                  <td>{new Date(order_address.order_time).toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Final Statu</th>{" "}
                  <td>{order_address.order_final_status || "Pending"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-6">
            <h5>Ordered Foods</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Image</th>
                  <th>Food Name</th>
                  <th>Quantity</th>
                  <th>Price(Rs)</th>
                </tr>
              </thead>
              <tbody>
                {ordered_foods.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {item.item_image ? (
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL_IMAGE}${item.item_image}`}
                          alt="Food"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{item.item_name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.item_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-12 mt-3">
            <h5 className="text-primary">Tracking Info</h5>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Status</th>
                  <th>Remark</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {tracking_info.length == 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Tracking Info Available
                    </td>
                  </tr>
                ) : (
                  tracking_info.map((track, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{track.status}</td>
                      <td>{track.remark}</td>
                      <td>{new Date(track.status_date).toLocaleString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {order_address.order_final_status !== "Food Delivered" && (
              <div className="col-md-4 my-4">
                <h5>Update Tracking Info</h5>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const status = e.target.status.value;
                    const remark = e.target.remark.value;
                    fetch(
                      `${process.env.REACT_APP_API_BASE_URL}update-order-tracking-info/`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          order_number: order_address.order_number,
                          status,
                          remark,
                        }),
                      }
                    )
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.message) {
                          toast.success(data.message || 'Status updated successfully!');
                          setTimeout(() => window.location.reload(), 1000);
                        } else {
                          toast.error(data.error || 'Failed to update status');
                        }
                      })
                      .catch((error) => {
                        console.error('Error:', error);
                        toast.error('Network error occurred');
                      });
                  }}
                >
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" name="status" required>
                      {visibleOptions.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Remark</label>
                    <textarea
                      name="remark"
                      className="form-control"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-success">
                    <FaPlus /> Update Status
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ViewFoodOrder;
