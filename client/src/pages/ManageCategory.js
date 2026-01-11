import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";

const ManageCategory = () => {
  const adminuser = localStorage.getItem("adminUser");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [allcategories, setAllcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState({
    id: "",
    category_name: "",
  });
  useEffect(() => {
    if (!adminuser) {
      navigate("/admin-login");
      return;
    }
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
  const handelEdit = (category) => {
    setEditCategory({ id: category.id, category_name: category.category_name });
    setShowModal(true);
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}update-delete-category/${editCategory.id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category_name: editCategory.category_name }),
        }
      );
      if (response.ok) {
        const updatedCategories = categories.map((cat) =>
          cat.id === editCategory.id
            ? { ...cat, category_name: editCategory.category_name }
            : cat
        );
        setCategories(updatedCategories);
        setAllcategories(updatedCategories);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handelDelete = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}update-delete-category/${categoryId}/`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setCategories(categories.filter((cat) => cat.id !== categoryId));
        } else {
          console.error("Failed to delete category");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
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
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>{category.category_name}</td>
                    <td>{new Date(category.creation_date).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => handelEdit(category)}
                        className="btn btn-warning text-white btn-sm"
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        onClick={() => handelDelete(category.id)}
                        className="btn btn-danger btn-sm ms-2"
                      >
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

        {showModal && (
          <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Category</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handelUpdate}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editCategory.category_name}
                        onChange={(e) =>
                          setEditCategory({
                            ...editCategory,
                            category_name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-success">
                      {" "}
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
};

export default ManageCategory;
