import React, { useEffect } from "react";
import AdminLayout from "../components/AdminLayout";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
const FoodEdit = () => {
  const adminUser = localStorage.getItem("adminUser");
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    item_name: "",
    item_price: "",
    item_description: "",
    item_image: null,
    item_quantity: "",
    is_available: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (!adminUser) {
      navigate("/admin-login");
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}get-categories/`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
    fetch(`${process.env.REACT_APP_API_BASE_URL}edit-food/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        toast.success(data.message);
        setFormData(data);
      });
  }, [id]);
  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handelFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      item_image: file,
    }));
  };
  const handelUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("category", formData.category);
    data.append("item_name", formData.item_name);
    data.append("item_price", formData.item_price);
    data.append("item_description", formData.item_description);
    data.append("item_image", formData.item_image);
    data.append("item_quantity", formData.item_quantity);
    data.append("is_available", formData.is_available);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}edit-food/${id}/`,
        {
          method: "PUT",
          body: data,
        }
      );
      const result = await response.json();
      if (response.status === 200) {
        toast.success(result.message);
        navigate("/manage-food");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(
        "An error occurred while updating the food item. Please try again."
      );
    }
  };
  return (
    <AdminLayout>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row">
        <div className="col-md-8">
          <div className="shadow p-3">
            <h4 className="text-center">
              {" "}
              <i className="fa fa-edit"></i> Edit Food Item
            </h4>
            <hr className="p-0 m-0" />
            <form
              encType="multipart/form-data"
              className="my-2"
              onSubmit={handelUpdate}
            >
              <div className="mb-2">
                <label htmlFor="" className="mb-2">
                  Food Category
                </label>

                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handelChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label htmlFor="" className="mb-2">
                  Food Item Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="item_name"
                  placeholder="Food Item Name"
                  value={formData.item_name}
                  onChange={handelChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="mb-2">
                  Price
                </label>
                <input
                  type="number"
                  min={1}
                  className="form-control"
                  name="item_price"
                  placeholder="Food Item Price"
                  step="0.01"
                  value={formData.item_price}
                  onChange={handelChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="" className="mb-2">
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="item_description"
                  value={formData.item_description}
                  onChange={handelChange}
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="" className="mb-2">
                  Quantity
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="item_quantity"
                  placeholder="Food Item Quantity"
                  value={formData.item_quantity}
                  onChange={handelChange}
                />
              </div>
              <div className="my-2 form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={(e) =>
                    setFormData({ ...formData, is_available: e.target.checked })
                  }
                  
                />
                <label htmlFor="" className="form-check-label mb-2 ms-2">
                  {formData.is_available ? "Available" : "Not Availabe"}
                </label>
              </div>

              <div className="mb-2">
                <label htmlFor="" className="mb-2">
                  Image
                </label>
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      name="item_image"
                      onChange={handelFileChange}
                    />
                  </div>
                  <div className="col-md-6">
                    {formData.item_image && (
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL_IMAGE}${formData.item_image}`}
                        alt="Food"
                        className="rounded"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>

              <button className="btn btn-success mt-2 px-4 ">
                {" "}
                <i className="fa fa-edit"></i> Update Food
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <i
            className="fas fa-pizza-slice"
            style={{ fontSize: "180px", color: "#e5e5e5" }}
          ></i>
        </div>
      </div>
    </AdminLayout>
  );
};

export default FoodEdit;
