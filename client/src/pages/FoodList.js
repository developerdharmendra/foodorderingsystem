import React, { useEffect } from "react";
import PublicLayout from "../components/PublicLayout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const FoodList = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);
  const foodsPerPage = 8;

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}get-foods/`)
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
        setFilteredFoods(data);
      });
    fetch(`${process.env.REACT_APP_API_BASE_URL}get-categories/`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    if (foods.length > 0) {
      applyFilters(search, selectedCategory);
    }
  }, [foods, minPrice, maxPrice]);

  const handelSearch = (e) => {
    e.preventDefault();
    applyFilters(search, selectedCategory);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    applyFilters(search, category);
  };

  const applyFilters = (searchItem, cat) => {
    let result = foods;
    if (searchItem) {
      result = result.filter((food) =>
        food.item_name.toLowerCase().includes(searchItem.toLowerCase())
      );
    }
    if (cat !== "All") {
      result = result.filter((food) => food.category_name === cat);
    }
    result = result.filter(
      (food) => food.item_price >= minPrice && food.item_price <= maxPrice
    );
    setFilteredFoods(result);
    setCurrentPage(1);
  };

  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);
  const totalPages = Math.ceil(filteredFoods.length / foodsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <PublicLayout>
      <div className="container py-4">
        <h4 className="text-center py-2">Find your delicious Food here ...</h4>
        <div className="row">
          <div className="col-md-9">
            <form className="w-100 mx-auto" onClick={handelSearch}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for food"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
          <div className="col-md-3">
            <select
              className="form-select mb-3"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.category_name}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">
                Filter by Price:{" "}
                <span className="fw-bold">
                  Rs {minPrice} - Rs {maxPrice}
                </span>
              </label>
              <Slider
                range
                min={0}
                max={500}
                defaultValue={[minPrice, maxPrice]}
                onChange={(value) => {
                  setMinPrice(value[0]);
                  setMaxPrice(value[1]);
                  applyFilters(search, selectedCategory);
                }}
              ></Slider>
            </div>
        </div>

        <div className="row">
          {currentFoods.length > 0 ? (
            currentFoods.map((food, index) => (
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
                      <Link
                        to={`/food/${food.id}`}
                        className="text-decoration-none"
                      >
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
                          <i className="fas fa-shopping-basket"></i> Order Now
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
          {totalPages > 1 && (
            <div className="col-12 d-flex justify-content-center mt-4">
              <nav>
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button className="page-link" onClick={prevPage}>
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li
                      key={i}
                      className={`page-item ${
                        currentPage === i + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button className="page-link" onClick={nextPage}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  );
};

export default FoodList;
