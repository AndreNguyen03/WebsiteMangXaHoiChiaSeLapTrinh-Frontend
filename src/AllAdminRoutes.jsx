import React from "react";
import { Routes, Route } from "react-router-dom";

import HomeDashboard from "./pages/Admin/HomeDashboard/HomeDashboard";
import QuestionManagement from "./pages/Admin/QuestionManagement/QuestionManagement";
import AnswerManagement from "./pages/Admin/AnswerManagement/AnswerManagement";
import CommentManagement from "./pages/Admin/CommentManagement/CommentManagement";
import TagManagement from "./pages/Admin/TagManagement/TagManagement";
import UserManagement from "./pages/Admin/UserManagement/UserManagement";
import RoleManagement from "./pages/Admin/RoleManagement/RoleManagement";
import LoginAdmin from "./pages/Admin/Login/LoginAdmin";

const AllAdminRoutes = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/Login" element={<LoginAdmin />} />
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

export default AllAdminRoutes;
