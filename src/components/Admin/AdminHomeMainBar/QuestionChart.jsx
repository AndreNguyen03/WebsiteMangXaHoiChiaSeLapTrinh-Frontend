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
      let currentMonth;
      let currentYear; // Định nghĩa biến currentYear
      let startDate; // Định nghĩa biến startDate

      switch (type) {
        case "1 Năm":
          apiUrl = "http://localhost:5114/api/Report/Post1Year";
          currentMonth = new Date().getMonth(); // Lấy tháng hiện tại (0-11)
          currentYear = new Date().getFullYear(); // Lấy năm hiện tại

          labels = Array.from({ length: 12 }, (_, i) => {
            const month = (currentMonth - 11 + i + 12) % 12; // Lùi 11 tháng và tăng dần
            const year = currentYear + Math.floor((currentMonth - 11 + i) / 12); // Điều chỉnh năm
            return `Tháng ${month + 1}/${year}`;
          });

          groupByKey = "month";
          break;

        case "1 Tháng":
          apiUrl = "http://localhost:5114/api/Report/Post30Days";
          const today = new Date();
          startDate = new Date(today); // Gán giá trị cho startDate
          startDate.setDate(today.getDate() - 29);
          labels = Array.from({ length: 4 }, (_, i) => {
            const weekStart = new Date(startDate);
            weekStart.setDate(startDate.getDate() + i * 7);

            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);

            const formatDate = (date) =>
              `${date.getDate().toString().padStart(2, "0")}/${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}/${date.getFullYear()}`;

            return `Tuần ${i + 1} (${formatDate(weekStart)} - ${formatDate(
              weekEnd
            )})`;
          });
          groupByKey = "week";
          break;

        case "Hôm nay":
          apiUrl = "http://localhost:5114/api/Report/PostToday";
          labels = Array.from({ length: 24 }, (_, i) => `${i}h`);
          groupByKey = "hour";
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
            const diffMonths =
              (createdAt.getFullYear() - currentYear) * 12 +
              (createdAt.getMonth() - currentMonth);
            index = labels.length - 1 - Math.abs(diffMonths);
          } else if (groupByKey === "week") {
            const diffDays = Math.floor(
              (createdAt - startDate) / (1000 * 60 * 60 * 24)
            );
            index = Math.floor(diffDays / 7);
          } else if (groupByKey === "hour") {
            index = createdAt.getHours();
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
      series={[
        {
          data: data,
          label: "Số lượng câu hỏi",
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
