import React, { useEffect, useState } from "react";
import PublicLayout from "../components/PublicLayout";
import { Link } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";

const Home = () => {
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}random-foods/`)
      .then((response) => {
        console.log("Response status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Received data:", data);
        setFoods(data);
      });
  }, []);
  return (
    <>
      <PublicLayout>
        <section
          className="hero py-5"
          style={{
            backgroundImage: "url('/images/bg1.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="hero-overlay"></div>
          <div className="container" id="searchItem">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-7 col-12 text-center">
                <h1 className="text-white display-6 fw-bold">
                  Quick & Hot Food, Delivered to You
                </h1>
                <p className="text-white lead mb-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                </p>
                <form method="GET" className="w-50 mx-auto" action="/search">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search for food"
                      name="q"
                    />
                    <button
                      className="btn btn-primary px-3 text-white"
                      type="submit"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* random food section  */}
        <section className="py-3">
          <div className="container">
            <div className="row g-4">
              <div className="col-12">
                <h4 className="text-center text-primary mb-4">
                  Most Loved Dishes This Month{" "}
                  <span className="badge bg-success">Top Picks</span>
                </h4>
              </div>
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
                          <Link to={`/food/${food.id}`} className="text-decoration-none">
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
                              to={`/food/${food.id}`}
                              className="btn btn-outline-primary btn-sm"
                            >
                              <i className="fas fa-shopping-basket"></i> Order
                              Now
                            </Link>
                          ) : (
                            <button className="btn btn-outline-secondary btn-sm disabled">
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
        {/* random food section  */}
        <section className="py-3 bg-dark text-white">
          <div className="container">
            <h3 className="text-center py-2">Ordering in 3 Simple Steps</h3>
            <div className="row text-center">
              <div className="col-md-4">
                <h4>1. Pick a dish you love</h4>
                <p>
                  Explore our wide range of dishes, from classic comfort foods
                  to exotic cuisines, and find the perfect match for your taste
                  buds.
                </p>
              </div>
              <div className="col-md-4">
                <h4>2. Choose your delivery location</h4>
                <p>
                  Enter your delivery address and let us know where you want
                  your food delivered to.
                </p>
              </div>
              <div className="col-md-4">
                <h4>3. Enjoy your delicious meal</h4>
                <p>
                  Sit back, relax, and enjoy your food delivered right to your
                  doorstep.
                </p>
              </div>
            </div>
            <div className="text-center">
              <p>Pay easily with Cash on Delivery - No extra charges.</p>
            </div>
          </div>
        </section>

        <section className="py-4 bg-warning text-center text-dark">
          <h4 className="pb-2">Read to Satisfy Your Hunger?</h4>
          <Link to="" className="btn btn-primary me-3">
            <i className="fas fa-shopping-basket"></i> Order Now
          </Link>
          <Link to="" className="btn bg-warning-subtle me-3">
            <FaUtensils /> View all Menu
          </Link>
          <a href="#searchItem" className="btn btn-secondary">
            {" "}
            <i className="fas fa-search"></i> Search for food
          </a>
        </section>

        <section className="py-3">


        </section>
      </PublicLayout>
    </>
  );
};

export default Home;
