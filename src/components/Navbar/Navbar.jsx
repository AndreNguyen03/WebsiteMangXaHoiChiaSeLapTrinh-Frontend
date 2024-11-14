import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar.jsx";
import logo from "../../assets/logo_side.png";
import "./Navbar.css";

const Navbar = () => {
  var User = null;

  return (
    <>
      <nav className="bg-white shadow-sm w-screen m-0 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center ">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 mx-2 hover:bg-gray-200 hover:border-transparent hover:rounded-full"
            >
              <img src={logo} className="h-16" alt="Stack Overflow Logo" />
            </Link>
            <div className="ml-8">
              <Link to="/" className="nav-item-btn">
                About
              </Link>
              <Link to="/" className="nav-item-btn">
                Product
              </Link>
              <Link to="/" className="nav-item-btn">
                For Teams
              </Link>
            </div>
          </div>

          <div className="flex items-center flex-grow ml-6 gap-8">
            <div class="relative flex items-center flex-grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>

              <input
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-orange-200 focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search..."
              />
            </div>
            {User == null ? (
              <Link to="/Login" className="nav-item-btn">
                Log in
              </Link>
            ) : (
              <>
                <Link to="/" className="">
                  <Avatar></Avatar>
                </Link>
                <button className="nav-item-btn">Log out</button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
