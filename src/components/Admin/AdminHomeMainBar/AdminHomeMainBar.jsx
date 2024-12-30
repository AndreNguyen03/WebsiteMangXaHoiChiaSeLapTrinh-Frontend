import React, { useState } from "react";
import { Dropdown } from "flowbite-react";
import QuestionChart from "./QuestionChart";

const AdminHomeMainBar = () => {
  const [chartType, setChartType] = useState("today");

  // Map để hiển thị tên loại tiếng Việt
  const typeMap = {
    today: "Hôm nay",
    "1 month": "1 Tháng",
    "1 year": "1 Năm",
  };

  const handleSelect = (key) => {
    setChartType(key); // Cập nhật loại biểu đồ
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admin Home Main Bar</h1>
      <div className="mb-4">
        <Dropdown
          label={`Chọn khoảng thời gian: ${typeMap[chartType]}`}
          color="gray"
          size="lg"
        >
          {Object.entries(typeMap).map(([key, label]) => (
            <Dropdown.Item key={key} onClick={() => handleSelect(key)}>
              {label}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
      <div>
        <QuestionChart type={chartType}></QuestionChart>
      </div>
    </div>
  );
};

export default AdminHomeMainBar;
