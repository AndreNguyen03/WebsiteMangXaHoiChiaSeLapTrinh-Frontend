import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

//import Avatar from "../Avatar/Avatar.jsx";
import logo from "../../assets/logo_side.png";
import { Avatar } from "flowbite-react";

import { logout } from "../../features/Auth/Auth";
import { clearWatchedTags } from "../../features/WatchedTags/WatchedTags.jsx";
import { clearIgnoredTags } from "../../features/IgnoreTags/IgnoreTags.js";
import "./Navbar.css";
import "./SearchInput.jsx";
import SearchInput from "./SearchInput.jsx";

const Navbar = () => {
  const authState = useSelector((state) => state.auth); // Lấy trạng thái xác thực từ Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Trạng thái lưu thông tin người dùng

  // Hàm đăng xuất
  const handleLogout = () => {
    dispatch(logout()); // Xóa thông tin người dùng khỏi Redux
    dispatch(clearWatchedTags()); // Xóa danh sách tag theo dõi khỏi Redux
    dispatch(clearIgnoredTags()); // Xóa danh sách tag bị bỏ qua khỏi Redux
    navigate("/Login"); // Chuyển hướng sang trang đăng nhập
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (authState.user) {
        try {
          const response = await axios.get(
            `http://localhost:5114/api/Users/${authState.user}`
          );
          setUser({
            id: response.data.id,
            username: response.data.username,
            gravatar: response.data.gravatar,
          });
        } catch (error) {
          console.error("Lỗi khi tải thông tin người dùng:", error);
          setUser(null);
        }
      } else {
        //setUser(null);
      }
    };
    fetchUser();
  }, [authState.user]); // Lắng nghe cả hai thay đổi

  return (
    <nav className="bg-white shadow-sm w-screen m-0 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo và liên kết điều hướng */}
        <div className="flex items-center">
          <Link to="/" className=" rounded-full">
            <img src={logo} className="h-16" alt="Logo Stack Overflow" />
          </Link>
          <div className="ml-8 flex space-x-4">
            <Link to="/About" className="nav-item-btn">
              Giới thiệu
            </Link>
          </div>
        </div>

        {/* Thanh tìm kiếm và hành động của người dùng */}
        <div className="flex justify-between items-center flex-grow ml-6 gap-8">
          <div className="relative flex items-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                clipRule="evenodd"
              />
            </svg>
            <SearchInput></SearchInput>
          </div>

          {authState.isAuthenticated && user ? (
            <>
              {/* Hiển thị ảnh đại diện và nút đăng xuất nếu đã đăng nhập */}
              <Link to={`/users/${user.id}`}>
                <Avatar
                  img={user.gravatar}
                  size="md"
                  alt={user.username}
                ></Avatar>

                {/* <Avatar gravatar={user.gravatar} /> */}
              </Link>
              <button className="nav-item-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </>
          ) : (
            // Hiển thị nút đăng nhập nếu chưa đăng nhập
            <Link to="/Login" className="nav-item-btn">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
