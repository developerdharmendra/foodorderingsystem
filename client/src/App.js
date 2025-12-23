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
import Myorders from "./pages/Myorders";
import OrderDetails from "./pages/OrderDetails";
import ProfilePage from "./pages/ProfilePage";
import ChangePassword from "./pages/ChangePassword";
import OrderNotConfirm from "./pages/OrderNotConfirm";
import OrderConfirmed from "./pages/OrderConfirmed";
import FoodBeingPrepared from "./pages/FoodBeingPrepared";
import FoodPickup from "./pages/FoodPickup";
import OrderDelivered from "./pages/OrderDelivered";
import OrderCancelled from "./pages/OrderCancelled";
import AllOrders from "./pages/AllOrders";
import OrderReport from "./pages/OrderReport";
import ViewFoodOrder from "./pages/ViewFoodOrder";

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
          <Route path="/my-orders" element={<Myorders />} />
          <Route path="/order-details/:order_number" element={<OrderDetails />} />
          <Route path="/my-profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePassword />} />

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/manage-category" element={<ManageCategory />} />
          <Route path="/add-food" element={<AddFood />} />
          <Route path="/manage-food" element={<ManageFood />} />
          <Route path="/not-confirmed" element={<OrderNotConfirm />} />
          <Route path="/order-confirmed" element={<OrderConfirmed />} />
          <Route path="/food-prepared" element={<FoodBeingPrepared />} />
          <Route path="/food-pickup" element={<FoodPickup />} />
          <Route path="/order-delivered" element={<OrderDelivered />} />
          <Route path="/order-cancelled" element={<OrderCancelled />} />
          <Route path="/all-orders" element={<AllOrders />} />
          <Route path="/order-report" element={<OrderReport />} />
          <Route path="/admin-view-order-detail/:order_number" element={<ViewFoodOrder />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
