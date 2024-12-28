import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import VerifyCode from "./pages/Auth/VerifyCode";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import Home from "./pages/Home/Home";
import Question from "./pages/Questions/Question";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./pages/DisplayQuestions/DisplayQuestion";
import Tags from "./pages/Tags/Tags";
import QuestionsWithTag from "./pages/QuestionsWithTag/QuestionsWithTag";
import QuestionsWithKeyWord from "./pages/QuestionWithKeyWord/QuestionWithKeyWord";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";
import About from "./pages/About/About";
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
      {/* Auth Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/About" element={<About />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/VerifyCode" element={<VerifyCode />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />

      {/* Questions and Tags */}
      <Route path="/Questions" element={<Question />} />
      <Route path="/Questions/:postId" element={<DisplayQuestion />} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route path="/Tags" element={<Tags />} />
      <Route path="/Questions/tags/:tagId" element={<QuestionsWithTag />} />
      <Route
        path="/Questions/keyword/:keyword"
        element={<QuestionsWithKeyWord />}
      />

      {/* User Routes */}
      <Route path="/Users" element={<Users />} />
      <Route path="/Users/:userID" element={<UserProfile />} />

      {/* Admin Routes */}
      <Route path="/Admin" element={<HomeDashboard />} />
      <Route path="/Admin/questions" element={<QuestionManagement />} />
      <Route path="/Admin/answers" element={<AnswerManagement />} />
      <Route path="/Admin/comments" element={<CommentManagement />} />
      <Route path="/Admin/tags" element={<TagManagement />} />
      <Route path="/Admin/users" element={<UserManagement />} />
      <Route path="/Admin/roles" element={<RoleManagement />} />
    </Routes>
  );
};

export default AllRoutes;
