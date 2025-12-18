import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddCategory from "./pages/AddCategory";
import ManageCategory from "./pages/ManageCategory";
import AddFood from "./pages/AddFood";
import ManageFood from "./pages/ManageFood";
import SearchPage from "./pages/SearchPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import FoodDetails from "./pages/FoodDetails";
import Cart from "./pages/Cart";
import PaymentPage from "./pages/PaymentPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<PaymentPage />} />

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/manage-category" element={<ManageCategory />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/manage-food" element={<ManageFood />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
