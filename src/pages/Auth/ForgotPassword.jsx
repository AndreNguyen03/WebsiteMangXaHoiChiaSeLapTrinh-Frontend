import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }

    // Handle password reset logic here
    setIsSubmitted(true);
    setError("");

    // Navigate to another page after a delay (e.g., 3 seconds)
    setTimeout(() => {
      navigate(`/VerifyCode?email=${encodeURIComponent(email)}&type=reset`); // Change '/login' to your desired route
    }, 3000);
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
                    Forgot your password?
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Enter your email address and we'll send you instructions to
                    reset your password
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
                      placeholder="Enter your email"
                    />
                  </div>
                  {error && <p className="text-sm text-red-600">{error}</p>}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    Send Reset Instructions
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Check your email
                </h3>
                <p className="text-sm text-gray-600">
                  We've sent password reset instructions to your email address
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting to verify code page in a few seconds...
                </p>
              </div>
            )}
            <div className="text-center text-sm">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Back to login
              </Link>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
