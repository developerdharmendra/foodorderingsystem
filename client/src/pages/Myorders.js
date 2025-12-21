import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { Link, useNavigate } from "react-router-dom";
import { FaInfoCircle, FaMapMarkedAlt } from "react-icons/fa";

const Myorders = () => {
  const userId = localStorage.getItem("userId");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}orders/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      });
  }, [userId, navigate]);

  return (
    <PublicLayout>
      <section className="py-4">
        <div className="container">
          <h3 className="mb-4 text-center text-primary">
            <i className="fa fa-box-open"></i> My Orders
          </h3>
          <div className="row">
           { orders.length === 0 ? (
              <p className="text-center">You have no orders yet.</p>
            ) : (
              orders.map((order) => (
                <div className="col-md-12" key={order.id}>
                  <div className="card mb-3 shadow-sm">
                    <div className="card-body d-flex align-items-center gap-3 flex-wrap">
                      <i className="fa fa-box-open text-warning fs-1"></i>
                      <div className="flex-grow-1">
                        <h5 className="card-title mt-2">
                          <Link to="">Order # {order.order_number}</Link>
                        </h5>
                        <p className="mb-0">
                          <strong>Date:</strong>{" "}
                          {new Date(order.order_time).toLocaleString()}{" "}
                        </p>
                        <p className="mb-0 text-muted">
                          <span>Status:</span>{" "}
                          <span className="badge bg-secondary">
                            {order.order_final_status}
                          </span>{" "}
                        </p>
                      </div>

                      <div className="card-text">
                        <Link
                          to=""
                          className="btn btn-outline-secondary btn-sm me-2"
                        >
                          <FaMapMarkedAlt /> Track
                        </Link>
                        <Link
                          to={`/order-details/${order.order_number}`}
                          className="btn btn-outline-primary btn-sm me-2"
                        >
                          <FaInfoCircle /> View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Myorders;
