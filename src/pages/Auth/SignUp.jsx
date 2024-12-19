import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { motion } from "framer-motion";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Thêm state loading
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form gửi đi mặc định

    // Lưu email và mật khẩu vào sessionStorage
    sessionStorage.setItem("signupPassword", password);

    // Bắt đầu quá trình gửi mã xác minh
    setIsLoading(true);

    try {
      // Gửi yêu cầu gửi mã xác minh tới email
      const response = await axios.post(
        `http://localhost:5114/api/Auth/send-verification-code/${encodeURIComponent(
          email
        )}`
      );

      if (response.status === 200 && response.data.status === "success") {
        // Chuyển hướng sang trang VerifyCode
        navigate(`/VerifyCode?email=${encodeURIComponent(email)}&type=signup`);
      } else {
        alert("Không thể gửi mã xác minh. Vui lòng thử lại.");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
    } finally {
      // Kết thúc quá trình gửi mã, ẩn loading
      setIsLoading(false);
    }
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-grow h-screen container mx-auto px-4 py-8 flex"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-1/2 flex flex-col justify-center items-start"
      >
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={logo}
          alt="Logo Stack Overflow"
          className="h-32 mb-4"
        />
        <ul className="space-y-2 ml-4 mb-4">
          {[
            /* Translated list items */
            { icon: "question-circle", text: "Được giúp đỡ - đặt câu hỏi!" },
          ].map((item, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              className="flex items-center text-lg hover:translate-x-2 transition-transform duration-200"
            >
              <i className={`fas fa-${item.icon} text-blue-500 mr-2`}></i>
              {item.text}
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-1/2 flex justify-center items-center"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md hover:shadow-xl transition-shadow duration-300"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-2xl font-bold mb-4"
          >
            Tạo tài khoản của bạn
          </motion.h2>
          <form onSubmit={handleSubmit}>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mb-4"
            >
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email..."
                required
                className="mt-1 transition-all duration-200 focus:scale-[1.02]"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="mb-4"
            >
              <label className="block text-gray-700 mb-2">Mật khẩu</label>
              <TextInput
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Tạo mật khẩu..."
                required
                className="mt-1 transition-all duration-200 focus:scale-[1.02]"
              />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded mb-4 hover:bg-blue-600 transition-colors duration-200"
            >
              Đăng ký
            </motion.button>
          </form>
          {/* Hiển thị trạng thái loading nếu đang gửi mã */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-sm text-gray-700 mt-4"
            >
              Đang gửi mã xác minh, vui lòng đợi...
            </motion.div>
          )}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-gray-700 mt-4"
          >
            Bạn đã có tài khoản?{" "}
            <Link
              to="/Login"
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
            >
              Đăng nhập
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;
