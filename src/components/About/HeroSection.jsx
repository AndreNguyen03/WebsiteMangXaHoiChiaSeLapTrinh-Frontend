import { motion } from "framer-motion"; // Thư viện cho hiệu ứng chuyển động

const HeroSection = ({
  title = "Các câu hỏi lập trình của bạn đã có lời giải",
  subtitle = "Tham gia cộng đồng lập trình viên của chúng tôi để cùng nhau giải quyết các thử thách và chia sẻ kiến thức.",
}) => (
  <section
    className="relative h-[70vh] flex items-center justify-center overflow-hidden px-4 bg-gradient-to-b from-primary/5 to-background"
    aria-label="Phần giới thiệu với tiêu đề và mô tả"
  >
    {/* Vùng chứa nội dung chính */}
    <motion.div
      className="text-center z-10 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }} // Trạng thái ban đầu
      animate={{ opacity: 1, y: 0 }} // Hiệu ứng khi hiển thị
      transition={{ duration: 0.8 }} // Thời gian hiệu ứng
    >
      {/* Tiêu đề */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }} // Hiệu ứng xuất hiện sau 0.3 giây
      >
        {title}
      </motion.h1>
      {/* Phụ đề */}
      <motion.p
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }} // Hiệu ứng xuất hiện sau 0.4 giây
      >
        {subtitle}
      </motion.p>
    </motion.div>
  </section>
);

export default HeroSection;
