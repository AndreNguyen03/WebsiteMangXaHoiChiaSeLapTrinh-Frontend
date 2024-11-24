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
import HomeDashboard from "./pages/Admin/HomeDashboard/HomeDashboard";
import QuestionManagement from "./pages/Admin/QuestionManagement/QuestionManagement";
import AnswerManagement from "./pages/Admin/AnswerManagement/AnswerManagement";
import CommentManagement from "./pages/Admin/CommentManagement/CommentManagement";
import TagManagement from "./pages/Admin/TagManagement/TagManagement";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import RoleManagement from "./pages/Admin/RoleManagement/RoleManagement";

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
      <Route path="/Admin" element={<HomeDashboard></HomeDashboard>}></Route>
      <Route
        path="/Admin/questions"
        element={<QuestionManagement></QuestionManagement>}
      ></Route>
      <Route
        path="/Admin/answers"
        element={<AnswerManagement></AnswerManagement>}
      ></Route>
      <Route
        path="/Admin/comments"
        element={<CommentManagement></CommentManagement>}
      ></Route>
      <Route
        path="/Admin/tags"
        element={<TagManagement></TagManagement>}
      ></Route>
      <Route
        path="/Admin/users"
        element={<UserManagement></UserManagement>}
      ></Route>
      <Route
        path="/Admin/roles"
        element={<RoleManagement></RoleManagement>}
      ></Route>
    </Routes>
  );
};

export default AllRoutes;
