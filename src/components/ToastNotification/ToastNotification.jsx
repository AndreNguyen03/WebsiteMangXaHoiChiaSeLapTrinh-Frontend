import React from "react";
import { Toast } from "flowbite-react";

const ToastNotification = ({ type, message, onClose }) => {
  return (
    <Toast>
      <div
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          type === "success"
            ? "bg-green-100 text-green-500"
            : "bg-red-100 text-red-500"
        }`}
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-8.293a1 1 0 011.414 0L10 9.586l1.293-1.293a1 1 0 011.414 1.414L11.414 11l1.293 1.293a1 1 0 01-1.414 1.414L10 12.414l-1.293 1.293a1 1 0 01-1.414-1.414L8.586 11 7.293 9.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <Toast.Toggle onClick={onClose} />
    </Toast>
  );
};

export default ToastNotification;
