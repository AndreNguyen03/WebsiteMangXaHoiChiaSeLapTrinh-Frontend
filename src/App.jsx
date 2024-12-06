import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AllRoutes from "./AllRoutes";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./features/Auth/Auth";
import { useEffect } from "react";
import { getAuthCookies } from "./features/Cookies/CookiesHelper";

function App() {
  const [count, setCount] = useState(0);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const { userID, token } = getAuthCookies();
  //   if (token) {
  //     dispatch(login({ userID, token }));
  //   }
  // }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
