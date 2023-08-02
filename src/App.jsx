import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OrderPage from "./pages/Orders";
import AdminPage from "./pages/Admins";
import ProfilePage from "./pages/Profile";
import CustomersPage from "./pages/Customers";
import ProductPage from "./pages/Products";
import CategoriesPage from "./pages/Categories";
import { useIsAuthCustom } from "./hooks/Auth.hook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ServicesPage from "./pages/Services";
import ServiceOrderPage from "./pages/ServiceOrders";

const App = () => {
  useIsAuthCustom();
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/service-orders" element={<ServiceOrderPage/>}/>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/admins" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
