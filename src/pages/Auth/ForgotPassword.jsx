import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // Trạng thái cho email nhập vào
  const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái xác nhận
  const [error, setError] = useState(""); // Trạng thái lỗi
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Vui lòng nhập email"); // Thông báo lỗi khi để trống email
      return;
    }

    // Kiểm tra định dạng email cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ");
      return;
    }

    // Đặt lại trạng thái lỗi
    setError("");

    try {
      // Gọi API gửi mã xác nhận
      const response = await axios.post(
        `http://localhost:5114/api/Auth/send-verification-code/${encodeURIComponent(
          email
        )}`
      );

      const data = response.data;

      if (response.status === 200 && data.status === "success") {
        setIsSubmitted(true); // Đánh dấu đã gửi yêu cầu thành công

        // Điều hướng tới trang xác minh sau vài giây
        setTimeout(() => {
          navigate(`/VerifyCode?email=${encodeURIComponent(email)}&type=reset`);
        }, 3000);
      } else {
        setError(data.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } catch (error) {
      // Xử lý lỗi từ server hoặc lỗi kết nối
      if (error.response) {
        setError(error.response.data.message || "Đã xảy ra lỗi.");
      } else {
        setError("Không thể kết nối tới server. Vui lòng thử lại.");
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
              <>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Quên mật khẩu?
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Nhập địa chỉ email của bạn, chúng tôi sẽ gửi mã xác mình
                    đến.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nhập email của bạn"
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Gửi mã xác minh
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Kiểm tra email của bạn
                </h3>
                <p className="text-sm text-gray-600">
                  Chúng tôi đã gửi mã xác minh đến email của bạn.
                </p>
                <p className="text-sm text-gray-500">
                  Đang chuyển hướng đến trang xác minh trong vài giây...
                </p>
              </div>
            )}
            <div className="text-center text-sm">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
