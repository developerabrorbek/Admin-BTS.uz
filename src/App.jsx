import { Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Order from "./components/Orders";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Order/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<Error />} path="*" />
      </Routes>
    </>
  );
};

export default App;