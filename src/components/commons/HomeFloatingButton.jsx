import { Link, useLocation } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { motion } from "framer-motion";

const HomeFloatingButton = () => {
  const location = useLocation();

  // Ẩn nút nếu đang ở trang chủ
  if (location.pathname === "/") return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ y: -4 }}
      className="fixed bottom-8 right-8 z-[70]"
    >
      <Link
        to="/"
        className="relative flex items-center justify-center w-14 h-14 bg-white/10 dark:bg-[#242526]/80 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl group transition-all hover:bg-yellow-500"
      >
        {/* Tooltip nhỏ khi hover */}
        <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 text-white text-[10px] font-bold   rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
          Back to Home
        </span>

        {/* Icon Home */}
        <FiHome 
          size={20} 
          className="text-gray-600 dark:text-white group-hover:text-black transition-colors" 
        />

        {/* Hiệu ứng nền quét nhẹ */}
        {/* <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div> */}
      </Link>
    </motion.div>
  );
};

export default HomeFloatingButton;