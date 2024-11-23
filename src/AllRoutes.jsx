import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home/Home";
import Question from "./pages/Questions/Question";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./pages/DisplayQuestions/DisplayQuestion";
import Tags from "./pages/Tags/Tags";
import QuestionsWithTag from "./pages/QuestionsWithTag/QuestionsWithTag";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/Login" element={<Login></Login>}></Route>
      <Route path="/SignUp" element={<SignUp></SignUp>}></Route>
      <Route path="/Questions" element={<Question></Question>}></Route>
      <Route path="/AskQuestion" element={<AskQuestion></AskQuestion>}></Route>
      <Route path="/Questions/:id" element={<DisplayQuestion />}></Route>
      <Route path="/Tags" element={<Tags></Tags>}></Route>
      <Route
        path="/Questions/tags/:tagId"
        element={<QuestionsWithTag></QuestionsWithTag>}
      ></Route>
      <Route path="/Users" element={<Users></Users>}></Route>
      <Route
        path="/Users/:userID"
        element={<UserProfile></UserProfile>}
      ></Route>
    </Routes>
  );
};

export default AllRoutes;
