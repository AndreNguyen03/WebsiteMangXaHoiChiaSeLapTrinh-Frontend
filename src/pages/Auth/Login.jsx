import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_long.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/Auth/Auth";
import { motion } from "framer-motion";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const userRole = useSelector((state) => state.auth.userRole);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/"); // Nếu là người dùng
    }
  }, [authState.isAuthenticated, navigate, userRole]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center mt-10"
    >
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        src={logo}
        alt="Logo Stack Overflow"
        className="h-36 mb-6"
      />

      <motion.div
        variants={itemVariants}
        className="w-full max-w-sm bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
      >
        <motion.form variants={itemVariants}>
          <motion.div variants={itemVariants} className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
            />
          </motion.div>
          <motion.div variants={itemVariants} className="mb-4">
            <label className="block text-gray-700">Mật khẩu</label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full border border-gray-300 rounded-lg py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              />
              <a
                href="#"
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                <i className="fas fa-eye"></i>
              </a>
            </div>
            <Link
              to="/ForgotPassword"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline mt-1 inline-block transition-colors duration-300"
            >
              Quên mật khẩu?
            </Link>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Đăng nhập
          </motion.button>
        </motion.form>
      </motion.div>
      <motion.div variants={itemVariants} className="mt-6 text-center">
        <p className="text-gray-700">
          Chưa có tài khoản?{" "}
          <Link
            to="/SignUp"
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300"
          >
            Đăng ký
          </Link>
        </p>
      </motion.div>
      {authState.status === "loading" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Đang tải...
        </motion.p>
      )}

      {authState.error && (
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          style={{ color: "red" }}
        >
          {authState.error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default Login;
