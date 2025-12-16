import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const userId = localStorage.getItem("userId");
  const [cartItems, setCartItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`${process.env.REACT_APP_API_BASE_URL}cart/${userId}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);

        const items = Array.isArray(data) ? data : data.cart_items || [];
        setCartItems(items);

        const total = items.reduce(
          (acc, item) => acc + item.food.item_price * item.quantity,
          0
        );

        setGrandTotal(total);
      })
      .catch(() => toast.error("Failed to load cart"));
  }, [userId, navigate]);
  return (
    <PublicLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <section className="py-4">
        <div className="container">
          <h2 className="text-center text-primary mb-4">
            {" "}
            <i className="fas fa-shopping-cart"></i> Your Cart
          </h2>
          <div className="row">
            <div className="col-md-12 table-responsive">
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Image</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price(Rs)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">
                        No Items in Cart
                      </td>
                    </tr>
                  ) : (
                    <>
                      {cartItems.map((item, index) => (
                        <tr key={item.id || index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={`${process.env.REACT_APP_API_BASE_URL_IMAGE}${item.food?.item_image}`}
                              alt={item.food?.item_name}
                              className="img-fluid rounded"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>{item.food?.item_name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.food?.item_price * item.quantity}</td>
                          <td>
                            <button className="btn btn-danger btn-sm">
                              <i className="fa fa-trash"></i>
                            </button>
                            
                          </td>
                        </tr>
                      ))}

                      <tr>
                        <td colSpan="4" className="text-end fw-bold">
                          Grand Total:
                        </td>
                        <td className="fw-bold">{grandTotal}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>

            </div>

          </div>
          
        </div>
      </section>
    </PublicLayout>
  );
};

export default Cart;
