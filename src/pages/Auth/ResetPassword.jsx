import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, TextInput } from "flowbite-react";
import { motion } from "framer-motion";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState(""); // Trạng thái mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(""); // Trạng thái xác nhận mật khẩu
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái xác nhận
  const [error, setError] = useState(""); // Trạng thái lỗi

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự");
      return;
    }

    // Kiểm tra khớp mật khẩu
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    setError("");

    try {
      // Gửi API đổi mật khẩu
      const response = await axios.post(
        "http://localhost:5114/api/Auth/changepassword",
        {
          email: sessionStorage.getItem("email"),
          newPassword: password,
        }
      );

      if (response.status === 200) {
        setIsSubmitted(true); // Hiển thị thông báo thành công
      } else {
        setError(
          response.data.message || "Đổi mật khẩu thất bại. Vui lòng thử lại."
        );
      }
    } catch (error) {
      console.error("Lỗi khi đổi mật khẩu:", error);

      // Xử lý lỗi từ server
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Có lỗi xảy ra khi kết nối đến máy chủ. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full shadow-lg">
          <div className="space-y-6 p-6">
            {!isSubmitted ? (
              <div>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Đặt lại mật khẩu
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Nhập mật khẩu mới để hoàn tất.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="mt-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mật khẩu mới
                    </label>
                    <TextInput
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhập mật khẩu mới"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Xác nhận mật khẩu
                    </label>
                    <TextInput
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhập lại mật khẩu"
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Đặt lại mật khẩu
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Đặt lại mật khẩu thành công
                </h3>
                <p className="text-sm text-gray-600">
                  Mật khẩu của bạn đã được cập nhật.
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-4 text-white bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Quay lại đăng nhập
                </Link>
              </div>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
