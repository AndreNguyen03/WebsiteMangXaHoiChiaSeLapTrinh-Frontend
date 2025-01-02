import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import AllAdminRoutes from "./AllAdminRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const userRole = useSelector((state) => state.auth.userRole); // Lấy từ Redux

  return (
    <div className="App">
      <Router>
        {/* Kiểm tra role của user */}
        {userRole === "admin" ? (
          <AllAdminRoutes />
        ) : (
          <>
            <Navbar></Navbar>
            <AllRoutes />
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
