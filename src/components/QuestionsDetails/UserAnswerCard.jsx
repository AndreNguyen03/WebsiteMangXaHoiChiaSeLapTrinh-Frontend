import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const UserAnswerCard = ({ userId, createdAt }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5114/api/Users/${userId}`)
      .then((response) => {
        const mappedData = {
          id: response.data.id,
          username: response.data.username,
          gravatar: response.data.gravatar,
        };

        setUser(mappedData);
      })
      .catch((error) => {
        console.error("Lỗi khi tải thông tin người dùng:", error);
      });
  }, [userId]);

  return (
    <div className="flex items-center gap-6 mt-6">
      <img
        src={user?.gravatar || "https://www.gravatar.com/avatar/placeholder"}
        className="w-12 h-12 rounded-full"
      />
      <div>
        <span className="font-semibold text-gray-800">
          {user?.username || `Người dùng ${userId}`}
        </span>
        <p className="text-sm text-gray-500">
          Đã trả lời vào {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default UserAnswerCard;
