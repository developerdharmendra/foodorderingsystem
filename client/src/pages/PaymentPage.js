import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("");
  const [address, setAddress] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const handelPlaceOrder = async () => {
    if (paymentMode === "online") {
      const { cardNumber, expiryDate, cvv } = cardDetails;
      if (!cardNumber || !expiryDate || !cvv) {
        toast.error("Please fill all card details");
        return;
      }
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}place-order/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            address: address,
            paymentMode: paymentMode,
            cardNumber: paymentMode === "online" ? cardDetails.cardNumber : "",
            expiryDate: paymentMode === "online" ? cardDetails.expiryDate : "",
            cvv: paymentMode === "online" ? cardDetails.cvv : "",
          }),
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/my-orders");
        }, 2000);
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <PublicLayout>
      <ToastContainer position="top-right" autoClose={2000} />
      <section className="py-4">
        <div className="container">
          <h3 className="mb-4 text-center text-primary">
            <i className="fas fa-credit-card"></i> Checkout & Payment
          </h3>
          <div className="card p-4 shadow-sm">
            <div className="mb-2">
              <label className="form-label fw-semibold">Delivery Address</label>
              <textarea
                className="form-control border-primary-subtle"
                rows={2}
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full delivery address"
                value={address}
                required
              ></textarea>
            </div>
            <div className="d-flex gap-4 mb-2">
              <div className="form-check mb-2">
                <input
                  className="form-check-input border-primary-subtle"
                  type="radio"
                  name="paymentMode"
                  checked={paymentMode === "COD"}
                  onChange={(e) => setPaymentMode("COD")}
                  value="COD"
                />
                <label className="form-check-label">Cash on Delivery</label>
              </div>

              <div className="form-check mb-2">
                <input
                  className="form-check-input border-primary-subtle"
                  type="radio"
                  name="paymentMode"
                  checked={paymentMode === "online"}
                  onChange={(e) => setPaymentMode("online")}
                  value="online"
                />
                <label className="form-check-label">Online Payment</label>
              </div>
            </div>
            {paymentMode === "online" && (
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="form-label fw-semibold">Card Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cardNumber"
                    placeholder="1234 **** **** **34"
                    value={cardDetails.cardNumber}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cardNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <label className="form-label fw-semibold">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-md-3 mb-2">
                  <label className="form-label fw-semibold">CVV</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="1**"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) =>
                      setCardDetails({
                        ...cardDetails,
                        cvv: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            )}
            <div className="my-2">
                <button className="btn btn-success w-100" onClick={handelPlaceOrder}>
                    <i className="fas fa-check-circle"></i> Confirm & Place Order
                </button>

            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PaymentPage;
