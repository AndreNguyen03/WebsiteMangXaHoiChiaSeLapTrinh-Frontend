import React, { useState, useEffect } from "react";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import axios from "axios";

const QuestionChart = ({ type }) => {
  const [data, setData] = useState([]);
  const [xLabels, setXLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let apiUrl = "";
      let labels = [];
      let groupByKey = "";

      // Chọn API URL và thiết lập nhãn theo `type`
      switch (type) {
        case "1 year":
          apiUrl = "http://localhost:5114/api/Report/Post1Year";
          labels = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
          groupByKey = "month"; // Nhóm theo tháng
          break;
        case "1 month":
          apiUrl = "http://localhost:5114/api/Report/Post30Days";
          labels = ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];
          groupByKey = "week"; // Nhóm theo tuần
          break;
        case "today":
          apiUrl = "http://localhost:5114/api/Report/PostToday";
          labels = Array.from({ length: 24 }, (_, i) => `${i}h`);
          groupByKey = "hour"; // Nhóm theo giờ
          break;
        default:
          return;
      }

      try {
        const response = await axios.get(apiUrl);
        const result = response.data;

        // Nhóm dữ liệu theo `groupByKey`
        const groupedData = new Array(labels.length).fill(0);
        result.forEach((item) => {
          const createdAt = new Date(item.createdAt);
          let index = -1;

          if (groupByKey === "month") {
            index = createdAt.getMonth(); // Tháng từ 0-11
          } else if (groupByKey === "week") {
            const day = createdAt.getDate(); // Ngày trong tháng
            index = Math.floor((day - 1) / 7); // Tuần từ 0-3
          } else if (groupByKey === "hour") {
            index = createdAt.getHours(); // Giờ từ 0-23
          }

          if (index >= 0 && index < groupedData.length) {
            groupedData[index]++;
          }
        });

        setData(groupedData);
        setXLabels(labels);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type]);

  return (
    <LineChart
      width={1000}
      height={500}
      series={[
        {
          data: data,
          label: "Số lượng bài viết",
          area: true,
          showMark: false,
        },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
      sx={{
        [`& .${lineElementClasses.root}`]: {
          display: "none",
        },
      }}
    />
  );
};

export default QuestionChart;
