import { motion } from "framer-motion";
import { React, useState, useEffect } from "react";
import axios from "axios";

const StatsSection = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      console.log("Fetching stats...");
      try {
        const [usersRes, postsRes, answersRes] = await Promise.all([
          axios.get("http://localhost:5114/api/Users"),
          axios.get("http://localhost:5114/api/Posts"),
          axios.get("http://localhost:5114/api/Answers"),
        ]);

        // Kiểm tra xem API trả về mảng và lấy độ dài
        const statsData = [
          { number: `${postsRes.data?.length || 0}+`, label: "Câu hỏi" },
          { number: `${answersRes.data?.length || 0}+`, label: "Câu trả lời" },
          { number: `${usersRes.data?.length || 0}+`, label: "Lập trình viên" },
        ];

        console.log("Stats data:", statsData); // Kiểm tra dữ liệu
        setStats(statsData);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Không thể tải dữ liệu thống kê.");
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    console.log("Updated Stats:", stats); // Log khi stats được cập nhật
  }, [stats]);

  return (
    <section className="py-8 px-4 bg-accent/5">
      <div className="max-w-7xl mx-auto">
        {/* Hiển thị lỗi nếu có */}
        {error && <div className="text-red-500 text-center">{error}</div>}

        {/* Kiểm tra xem stats có dữ liệu không */}
        {stats.length === 0 ? (
          <div className="text-center">Đang tải dữ liệu...</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }} // Chỉ chạy hiệu ứng một lần
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index} // Sử dụng index nếu không có giá trị khác làm key duy nhất
                className="text-center"
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default StatsSection;
