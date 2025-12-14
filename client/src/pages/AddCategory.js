import React from "react";
import AdminLayout from "../components/AdminLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const [name, setName] = React.useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}add-category/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_name: name }),
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        toast.success(data.message);
        setName('')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during category adding:", error);
      toast.error("An error occurred during category adding");
    }
  };

  return (
    <>
      <AdminLayout>
        <div className="row">
          <div className="col-md-8">
            <div className="shadow p-3">
              <h4 className="text-center">
                {" "}
                <i className="fa fa-plus-circle"></i> Add Category
              </h4>
              <hr className="p-0 m-0" />
              <form action="" className="my-2" onSubmit={handelSubmit}>
                <div>
                  <label htmlFor="" className="my-3">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button className="btn btn-success mt-4 px-4 ">
                  {" "}
                  <i className="fa fa-plus"></i> Add Category
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-4 d-flex justify-content-center align-items-center">
             <i className="fas fa-utensils" style={{fontSize:'180px', color:'#e5e5e5'}}></i>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </AdminLayout>
    </>
  );
};

export default AddCategory;
