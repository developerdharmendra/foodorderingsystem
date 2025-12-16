import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { useNavigate, useParams } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FoodDetails = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}food-details/${id}/`)
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        setFood(data);
      });
  }, []);

  const handelAddToCard = async () => {
    if (!userId) {
      navigate("/login");
    } else {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}add-to-cart/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              food_id: id,
              userId: userId,
            }),
          }
        );
        const data = await response.json();
        if (response.status === 201) {
          toast.success(data.message || "Added to cart successfully!");
          setTimeout(() => {
            navigate("/cart");
          }, 2000);
        } else {
          toast.error(
            data.message || "Failed to add to cart. Please try again."
          );
        }
      } catch (error) {
        toast.error("Failed to add to cart. Please try again.");
      }
    }
  };

  if (!food) return <div>Loading...</div>;
  return (
    <>
      <PublicLayout>
        <ToastContainer position="top-right" autoClose={2000} />
        <section className="py-4">
          <div className="container">
            {food && (
              <div className="row">
                <div className="col-md-5 text-center">
                  <div>
                    <Zoom>
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL_IMAGE}${food.item_image}`}
                        alt={food.item_name}
                        className="img-fluid rounded w-100 h-auto"
                      />
                    </Zoom>
                  </div>
                </div>
                <div className="col-md-7 text-center text-md-start">
                  <h2 className="text-primary">{food.item_name}</h2>
                  <p className="text-muted mb-0 pb-1">
                    {food.item_description}
                  </p>
                  <p className="mb-0 pb-2">
                    <strong>Category: </strong>
                    {food.category_name}
                  </p>
                  <h5 className="text-success fw-bold">Rs {food.item_price}</h5>
                  <p>
                    Shipping: <strong>Free</strong>
                  </p>
                  {food.is_available ? (
                    <button
                      className="btn btn-outline-success px-4 mt-2"
                      onClick={handelAddToCard}
                    >
                      <i className="fas fa-shopping-basket"></i> Add to Cart
                    </button>
                  ) : (
                    <button className="btn btn-danger" disabled>
                      Out of Stock
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default FoodDetails;
