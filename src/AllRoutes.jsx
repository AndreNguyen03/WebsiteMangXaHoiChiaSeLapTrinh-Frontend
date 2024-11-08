import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Question from "./pages/Questions/Question";
import AskQuestion from "./pages/AskQuestion/AskQuestion";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/Login" element={<Login></Login>}></Route>
      <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
      <Route path="/Questions" element={<Question></Question>}></Route>
      <Route path="/AskQuestion" element={<AskQuestion></AskQuestion>}></Route>
    </Routes>
  );
};

export default AllRoutes;
