import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";
import axios from "axios";

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Thông báo thành công
  const [isResending, setIsResending] = useState(false); // Trạng thái gửi lại mã
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "reset"; // 'reset' hoặc 'signup'

  const handleChange = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      setError("Vui lòng nhập đủ 6 chữ số");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5114/api/Auth/verify-code",
        {
          email,
          code: verificationCode,
        }
      );

      if (response.status === 200 && response.data.status === "success") {
        setMessage("Xác minh thành công!");

        // Điều hướng và lưu trữ thông tin
        if (type === "reset") {
          sessionStorage.setItem("email", email);
          navigate("/ResetPassword");
        } else {
          // Lấy password từ sessionStorage và tạo username ngẫu nhiên
          const password = sessionStorage.getItem("signupPassword");
          const username = "User" + Math.random().toString(36).substr(2, 9); // Tạo username ngẫu nhiên

          // Gọi API đăng ký người dùng
          const registerResponse = await axios.post(
            "http://localhost:5114/api/Auth/Register",
            {
              username,
              email,
              password,
            }
          );

          console.log(registerResponse.data);

          if (registerResponse.status === 200) {
            navigate("/Login");
          } else {
            setError(
              registerResponse.data.message || "Đăng ký không thành công."
            );
          }
        }
      } else {
        setError(response.data.message || "Mã xác minh không chính xác.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(
        `http://localhost:5114/api/Auth/send-verification-code/${encodeURIComponent(
          email
        )}`
      );

      if (response.status === 200 && response.data.status === "success") {
        setMessage("Mã xác minh đã được gửi lại thành công.");
      } else {
        setError(response.data.message || "Không thể gửi lại mã.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
      );
    } finally {
      setIsResending(false);
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
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Xác minh email của bạn
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Chúng tôi đã gửi mã xác minh đến email của bạn
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ))}
              </div>
              {error && (
                <p className="text-sm text-red-600 text-center">{error}</p>
              )}
              {message && (
                <p className="text-sm text-green-600 text-center">{message}</p>
              )}
              <button
                type="submit"
                className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Xác minh Email
              </button>
              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className={`text-white font-medium ${
                    isResending ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isResending ? "Đang gửi lại mã..." : "Gửi lại mã"}
                </button>
              </div>
            </form>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyCode;
