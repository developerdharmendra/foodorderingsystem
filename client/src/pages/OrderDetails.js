import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { Link, useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { order_number } = useParams();
  const [oredrItem, setOrderItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderAddress, setOrderAddress] = useState(null);
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetch(
      `${process.env.REACT_APP_API_BASE_URL}orders/by-order-number/${order_number}`
    )
      .then((response) => response.json())
      .then((data) => {
        setOrderItem(data);
        const totalAmount = data.reduce(
          (acc, item) => acc + item.food.item_price * item.quantity,
          0
        );
        setTotal(totalAmount);
      });

    fetch(`${process.env.REACT_APP_API_BASE_URL}orders/address/${order_number}`)
      .then((response) => response.json())
      .then((data) => {
        setOrderAddress(data);
      });
  }, [order_number]);

  return (
    <PublicLayout>
      <section className="py-4">
        <div className="container">
          <h4 className="mb-4 text-primary">
            <i className="fa fa-box-open"></i> Order #{order_number} Details
          </h4>
          <div className="row">
            <div className="col-md-8">
              {oredrItem.map((item, index) => (
                <div className="card mb-2 shadow-sm border-0" key={index}>
                  <div className="row">
                    <div className="col-md-4">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL_IMAGE}${item.food?.item_image}`}
                        alt={item.food?.item_name}
                        className="img-fluid rounded-start"
                        style={{
                          minHeight: "200px",
                          height: "200px",
                        }}
                      />
                    </div>
                    <div className="col-md-8 pt-3">
                      <h5>
                        {item.food.item_name}({item.food.item_quantity})
                      </h5>
                      <p className="text-muted">{item.food.item_description}</p>
                      <p>
                        {" "}
                        <strong>Price:</strong> Rs {item.food.item_price}
                      </p>
                      <p>
                        {" "}
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              {orderAddress && (
                <div className="card shadow-sm p-3 border-0">
                  <h5>
                    <i className="fa fa-map-marker-alt me-2 text-danger"></i>{" "}
                    Delivery Details
                  </h5>
                  <hr className="my-1" />
                  <p>
                    {" "}
                    <strong>Date:</strong>{" "}
                    {new Date(orderAddress.order_time).toLocaleString()}{" "}
                  </p>
                  <p>
                    {" "}
                    <strong>Address:</strong> {orderAddress.address}{" "}
                  </p>
                  <p>
                    {" "}
                    <strong>Status:</strong>{" "}
                    {orderAddress.order_final_status ||
                      "Waiting for confirmation"}{" "}
                  </p>
                  <p>
                    {" "}
                    <strong>Payment:</strong>{" "}
                    <span className="badge bg-primary p-2">
                      {orderAddress.payment_mode}{" "}
                    </span>
                  </p>
                  <p>
                    {" "}
                    <strong>Total:</strong> Rs. {total}{" "}
                  </p>
                    <a href={`${process.env.REACT_APP_API_BASE_URL}invoice/${order_number}`}
                      className="btn btn-primary btn-sm my-2"
                      target="_blank"
                    >
                      <i className="fa fa-file-invoice me-1"></i>Invoice
                    </a>

                    <a href=""
                      className="btn btn-danger btn-sm my-2"
                      target="_blank"
                    >
                      <i className="fa fa-times-circle me-1"></i>Cancel Order
                    </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default OrderDetails;
