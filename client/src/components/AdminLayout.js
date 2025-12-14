import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import AdminSiderbar from "./AdminSiderbar";
import AdminHeader from "./AdminHeader";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  return (
    <div className="d-flex">
      {sidebarOpen && <AdminSiderbar />}

      <div
        id="page-content-wrapper"
        className={`flex-grow-1 ${
          sidebarOpen ? "width-sidebar" : "full-width"
        }  `}
      >
        <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <div className="container-fluid my-3">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
