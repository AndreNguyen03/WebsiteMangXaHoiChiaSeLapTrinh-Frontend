import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";

const VerifyCode = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "reset"; // 'eset' or 'ignup'

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    if (verificationCode.length !== 6) {
      setError("Vui lòng nhập đủ 6 chữ số");
      return;
    }
    if (type === "reset") {
      navigate("/ResetPassword");
    } else {
      navigate("/Login");
    }
    // Handle verification logic here
    setError("");
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
              <button
                type="submit"
                className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Xác minh Email
              </button>
              <div className="text-center text-sm">
                <button
                  type="button"
                  className="text-white hover:blue-700 font-medium"
                >
                  Gửi lại mã
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
