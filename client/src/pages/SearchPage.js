import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { Link, useLocation } from "react-router-dom";

const SearchPage = () => {
  const query = new URLSearchParams(useLocation().search).get("q") || "";
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    if (query) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}food-search/?q=${query}`)
        .then((response) => {
          console.log("Response status:", response.status);
          return response.json();
        })
        .then((data) => {
          console.log("Received data:", data);
          setFoods(data);
        });
    }
  }, [query]);

  return (
    <>
      <PublicLayout>
        <section className="py-3">
          <div className="container">
            <h4 className="text-primary pb-2 text-center">
              Results for: "{query}"
            </h4>
            <div className="row">
              {foods.length > 0 ? (
                foods.map((food, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card border-0 shadow-sm h-100 search-card">
                      <div className="d-flex justify-content-center">
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL_IMAGE}${food.item_image}`}
                          className="card-img-top img-fluid"
                          style={{ width: "auto", height: "200px" }}
                          alt="logo"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          <Link to="" className="text-decoration-none">
                            {food.item_name}
                          </Link>
                        </h5>
                        <p className="card-text text-muted mb-0 pb-2">
                          {food.item_description.slice(0, 60)}...
                        </p>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold">Rs. {food.item_price}</span>
                          {food.is_available ? (
                            <Link
                              to=""
                              className="btn btn-outline-primary btn-sm"
                            >
                              <i className="fas fa-shopping-basket"></i> Order
                              Now
                            </Link>
                          ) : (
                            <button
                              className="btn btn-outline-secondary btn-sm disabled"
                            >
                              <i className="fas fa-times-circle"></i> Unavailabe
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center">
                  <h4 className="text-muted">No results found</h4>
                </div>
              )}
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  );
};

export default SearchPage;
