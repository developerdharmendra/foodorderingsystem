import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import { Link, useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import { FaUsers } from "react-icons/fa";

const RegisterUser = () => {
  const [users, setUsers] = useState([]);
  const [allusers, setAllusers] = useState([]);
  const adminuser = localStorage.getItem("adminUser");
  const navigate = useNavigate();
  useEffect(() => {
    if (!adminuser) {
      navigate("/admin-login");
      return;
    }
    fetch(`${process.env.REACT_APP_API_BASE_URL}get-users/`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setAllusers(data);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  const handelSearch = (seacTerm) => {
    const keyword = seacTerm.toLowerCase();
    if (!keyword) {
      setUsers(allusers);
    } else {
      const filteredUsers = allusers.filter((user) =>
        user.first_name.toLowerCase().includes(keyword) ||
        user.last_name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
      );
      setUsers(filteredUsers);
    }
  };
  const handelDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}delete-user/${id}/`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          setUsers(users.filter((user) => user.id !== id));
        }
      });
    }
  };

  return (
    <AdminLayout>
      <h4 className="text-center text-primary"> <FaUsers/> Register User Page</h4>
      <div className="row">
        <div className="col-md-12 d-flex justify-content-end gap-2 align-items-center">
          <h6 className="text-muted">
            <i className="fas fa-database me-1"></i> Total Users
            <span className="badge bg-success ms-2 p-2">{users.length}</span>
          </h6>
        </div>
        <div className="col-md-12">
          <div className="my-3 d-flex justify-content-between">
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search user"
              name="search"
              onChange={(e) => handelSearch(e.target.value)}
            />
            <CSVLink data={users} filename={"users.csv"}>
              <button className="btn btn-primary btn-sm mt-2 d-flex gap-2 align-items-center">
                <i className="fas fa-file-csv"></i> Export to Excel
              </button>
            </CSVLink>
          </div>
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td className="text-capitalize">
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address}</td>
                  <td>
                   
                    <button
                      onClick={() => handelDelete(user.id)}
                      className="btn btn-danger btn-sm ms-2"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">
                    No user Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default RegisterUser;
