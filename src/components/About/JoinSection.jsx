import { motion } from "framer-motion"; // Thư viện hiệu ứng chuyển động
import { Button } from "flowbite-react"; // Thư viện UI cho React
import { Link } from "react-router-dom";

const JoinSection = () => (
  <section className="py-24 px-4 bg-accent/5">
    <div className="max-w-3xl mx-auto items-center text-center">
      {/* Sử dụng motion để tạo hiệu ứng khi thành phần xuất hiện */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} // Bắt đầu với trạng thái mờ và dịch xuống
        whileInView={{ opacity: 1, y: 0 }} // Hiện rõ và dịch về vị trí ban đầu khi cuộn tới
        viewport={{ once: true }} // Chỉ chạy hiệu ứng một lần
      >
        {/* Tiêu đề chính */}
        <h2 className="text-3xl font-bold mb-4">
          Sẵn sàng tham gia cộng đồng của chúng tôi?
        </h2>
        {/* Nội dung mô tả */}
        <p className="text-muted-foreground mb-8">
          Bắt đầu đặt câu hỏi, chia sẻ kiến thức và kết nối với các lập trình
          viên.
        </p>
        {/* Nút tham gia */}
        <div className="flex justify-center">
          <Link to="/">
            <Button size="lg" className="px-8">
              Tham gia cộng đồng
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default JoinSection;
