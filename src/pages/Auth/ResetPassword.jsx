import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, TextInput } from "flowbite-react";
import { motion } from "framer-motion";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Handle password reset logic here
    setIsSubmitted(true);
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
            {!isSubmitted ? (
              <>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Reset your password
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Please enter your new password
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <TextInput
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <TextInput
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirm new password"
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Reset Password
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Password reset successful
                </h3>
                <p className="text-sm text-gray-600">
                  Your password has been reset successfully
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-4 text-white bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Back to login
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
