import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
const ManageFood = () => {
  const [foods, setFoods] = useState([]);
  const [allfoods, setAllfoods] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}get-foods/`)
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
        setAllfoods(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handelSearch = (search) => {
    const keyword = search.toLowerCase();
    if (!keyword) {
      setFoods(allfoods);
    } else {
      const filteredFoods = allfoods.filter(
        (food) =>
          food.item_name?.toLowerCase().includes(keyword) ||
          food.category_name?.toLowerCase().includes(keyword)
      );
      setFoods(filteredFoods);
    }
  };

  return (
    <>
      <AdminLayout>
        <h4 className="text-center mb-3">
          <i className="fa fa-list"></i> Manage Food
        </h4>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end gap-2 align-items-center">
            <h6>
              <Link to="/add-food" className="btn btn-success btn-sm">
                <i className="fa fa-plus"></i> Add Food
              </Link>
            </h6>
            <h6 className="text-muted">
              <i className="fas fa-database me-1"></i> Total Food
              <span className="badge bg-success ms-2 p-2">{foods.length}</span>
            </h6>
          </div>
          <div className="col-md-12">
            <div className="my-3 d-flex justify-content-between">
              <input
                type="text"
                className="form-control w-50"
                placeholder="Search Category"
                name="search"
                onChange={(e) => handelSearch(e.target.value)}
              />
              <CSVLink data={foods} filename={"foods.csv"}>
                <button className="btn btn-primary btn-sm mt-2 d-flex gap-2 align-items-center">
                  <i className="fas fa-file-csv"></i> Export to Excel
                </button>
              </CSVLink>
            </div>
            <table className="table table-bordered table-hover table-striped">
              <thead className="table-dark">
                <tr className="text-center">
                  <th>S.No</th>
                  <th>Category</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Image</th>
                  <th>Quantity</th>
                  <th>Availabe</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {foods.map((food, index) => (
                  <tr key={index}>
                    <td className="align-content-center text-center">
                      {index + 1}
                    </td>
                    <td className="align-content-center">
                      {food.category_name}
                    </td>
                    <td className="align-content-center">{food.item_name}</td>
                    <td className="align-content-center">{food.item_price}</td>
                    <td className="align-content-center">
                      {food.item_description}
                    </td>
                    <td className="align-content-center">
                      {food.item_image ? (
                        <img
                          src={`${process.env.REACT_APP_API_BASE_URL_IMAGE}${food.item_image}`}
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

                    <td className="align-content-center">
                      {food.item_quantity}
                    </td>
                    <td className="align-content-center">
                      {food.is_available ? "Yes" : "No"}
                    </td>
                    <td className="align-content-center">
                      <button className="btn btn-warning text-white btn-sm">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button className="btn btn-danger btn-sm ms-2">
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {foods.length === 0 && (
                  <tr>
                    <td colSpan="9" className="text-center">
                      No Categories Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default ManageFood;
