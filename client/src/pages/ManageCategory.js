import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [allcategories, setAllcategories] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}get-categories/`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setAllcategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  const handelSearch = (searchTerm) => {
    const keyword = searchTerm.toLowerCase();
    if (!keyword) {
      setCategories(allcategories);
    } else {
      const filteredCategories = allcategories.filter((category) =>
        category.category_name.toLowerCase().includes(keyword)
      );
      setCategories(filteredCategories);
    }
  };
  return (
    <>
      <AdminLayout>
        <h4 className="text-center mb-3">
          <i className="fa fa-list"></i> Manage Category
        </h4>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-end gap-2 align-items-center">
            <h6>
              <Link to="/add-category" className="btn btn-success btn-sm">
                <i className="fa fa-plus"></i> Add Category
              </Link>
            </h6>
            <h6 className="text-muted">
              <i className="fas fa-database me-1"></i> Total Categories
              <span className="badge bg-success ms-2 p-2">
                {categories.length}
              </span>
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
              <CSVLink data={categories} filename={"categories.csv"}>
                <button className="btn btn-primary btn-sm mt-2 d-flex gap-2 align-items-center">
                  <i className="fas fa-file-csv"></i> Export to Excel
                </button>
              </CSVLink>
            </div>
            <table className="table table-bordered table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Category Name</th>
                  <th>Creation Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category.category_name}</td>
                    <td>{new Date(category.creation_date).toLocaleString()}</td>
                    <td>
                      <button className="btn btn-warning text-white btn-sm">
                        <i className="fa fa-edit"></i>
                      </button>
                      <button className="btn btn-danger btn-sm ms-2">
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center">
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

export default ManageCategory;
