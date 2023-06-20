import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import OrderPage from "./pages/Orders";
import AdminPage from "./pages/Admins";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<OrderPage/>}/>
        <Route path="/admins" element={<AdminPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<Error />} path="*" />
      </Routes>
    </>
  );
};

export default App;