import React from "react";
import logo from "../../assets/logo.png";

const SignUp = () => {
  return (
    <div className="flex-grow h-screen container mx-auto px-4 py-8 flex">
      <div className="w-1/2 flex flex-col justify-center items-start">
        <img src={logo} alt="Stack Overflow logo" className="h-32 mb-4" />

        <ul className="space-y-2 ml-4 mb-4">
          <li className="flex items-center text-lg">
            <i className="fas fa-question-circle text-blue-500 mr-2"></i>
            Get unstuck - ask a question!
          </li>
          <li className="flex items-center text-lg">
            <i className="fas fa-tag text-blue-500 mr-2"></i>
            Save your favorite posts, tags and filters
          </li>
          <li className="flex items-center text-lg">
            <i className="fas fa-trophy text-blue-500 mr-2"></i>
            Answer questions and earn reputation
          </li>
        </ul>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Create your account</h2>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input type="email" className="w-full border rounded px-3 py-2" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2"
              />
              <p className="text-xs text-gray-500 mt-1">
                Must contain 8+ characters, including at least 1 letter and 1
                number.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded mb-4"
            >
              Sign up
            </button>
            <button
              type="button"
              className="w-full border border-gray-300 text-gray-700 py-2 rounded mb-4 flex items-center justify-center"
            >
              <i className="fab fa-google mr-2"></i> Sign up with Google
            </button>
          </form>
          <p className="text-center text-sm text-gray-700 mt-4">
            Already have an account?{" "}
            <a href="#" className="text-blue-500">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
