import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const Card2 = ({ data }) => {
  // Lấy danh sách icon từ Redux store
  const { data: userData } = useSelector((state) => state.user);
  const allIcons = userData?.icons || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative bg-white dark:bg-[#1e2329] border border-gray-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="flex flex-col lg:flex-row min-h-[420px]">
        
        {/* LEFT SIDE: TEXT CONTENT */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-between order-2 lg:order-1">
          <div className="space-y-6">
            {/* Nhãn trang trí phía trên tiêu đề */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-yellow-500"></span>
              <span className="text-[10px] font-bold uppercase text-yellow-600 dark:text-yellow-500">
                Featured Work
              </span>
            </div>

            {/* Tiêu đề dự án */}
            <Link to={`/project/${data.slug}`} className="block group/title">
              <h3 className="text-lg lg:text-xl font-bold dark:text-white text-gray-900 leading-tight transition-colors h-16 line-clamp-2 duration-500 group-hover/title:text-yellow-500 line-clamp-2 min-h-[60px]">
                {data.title}
              </h3>
            </Link>

            {/* Mô tả dự án */}
            <div className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 font-medium opacity-80 min-h-[60px]">
               <div dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>

            {/* Tech Stack - Chỉ lấy tối đa 4 cái dùng .slice */}
            <div className="flex flex-wrap gap-2 pt-2 h-28">
              {data?.category?.slice(0, 4).map((catName, index) => {
                const targetIcon = allIcons.find((iconObj) => iconObj.name === catName);
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 h-fit py-1.5 px-3 bg-gray-100/50 dark:bg-white/5 rounded-lg border border-transparent group-hover:border-yellow-500/20 transition-all duration-500"
                  >
                    {targetIcon?.icon && (
                      <img
                        src={targetIcon.icon}
                        alt={catName}
                        className="w-4 h-4 object-contain grayscale group-hover:grayscale-0 transition-all"
                      />
                    )}
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {catName}
                    </span>
                  </div>
                );
              })}
              {data?.category?.length > 4 && (
                <div className="py-1.5 px-3 text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-white/5 rounded-lg">
                  +{data.category.length - 4}
                </div>
              )}
            </div>
          </div>

          {/* Nút xem chi tiết */}
          <div className="pt-8">
            <Link
              to={`/project/${data.slug}`}
              className="inline-flex items-center gap-4 group/btn"
            >
              <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center transition-transform duration-500 group-hover/btn:scale-110 group-hover/btn:bg-yellow-500">
                <FiArrowUpRight className="text-white dark:text-black text-xl group-hover/btn:text-black transition-colors" />
              </div>
              <span className="text-xs font-bold uppercase dark:text-white group-hover/btn:translate-x-1 transition-all duration-300">
                Explore Project
              </span>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: PREMIUM IMAGE DISPLAY */}
<div className="w-full lg:w-[52%] relative min-h-[350px] lg:min-h-full order-1 lg:order-2 flex items-center justify-center p-4">
  
  {/* Background Decor: Tạo các khối màu trừu tượng mờ ảo phía sau */}
  <div className="absolute inset-0 z-0">
    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-yellow-500/20 blur-[60px] rounded-full animate-pulse" />
    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full" />
  </div>

  <Link 
    to={`/project/${data.slug}`} 
    className="relative w-full h-full flex items-center justify-center group/img z-10"
  >
    {/* Card Holder: Khung chứa ảnh giả lập một màn hình thiết bị */}
    <motion.div 
      whileHover={{ y: -10, rotateX: 2, rotateY: -2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-[90%] h-[85%] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
    >
      {/* Overlay kính khi hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 z-20" />
      
      {/* Nút "View Project" xuất hiện ở giữa ảnh khi hover */}
      <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover/img:opacity-100 transition-all duration-500 scale-90 group-hover/img:scale-100">
        <span className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-bold uppercase tracking-[0.1em]">
          Case Study
        </span>
      </div>

      <motion.img
        src={data.thumbnail}
        alt={data.title}
        // Dùng object-cover nhưng kết hợp với container có tỉ lệ đẹp sẽ không bị xấu
        className="w-full h-full object-cover transform transition-transform duration-[1.5s] group-hover/img:scale-110"
      />
    </motion.div>

    {/* Decorative Elements: Những chi tiết nhỏ làm nên sự chuyên nghiệp */}
    <div className="absolute top-8 left-8 flex gap-1.5 opacity-30">
      <div className="w-2 h-2 rounded-full bg-red-400" />
      <div className="w-2 h-2 rounded-full bg-yellow-400" />
      <div className="w-2 h-2 rounded-full bg-green-400" />
    </div>

    {/* Số thứ tự lớn chạy chìm phía sau */}
    {/* <div className="absolute -bottom-4 -right-2 pointer-events-none select-none">
      <span className="text-[12rem] font-bold leading-none text-gray-950/[0.03] dark:text-white/[0.03] italic">
        0{data.id || '1'}
      </span>
    </div> */}
  </Link>
</div>

      </div>
    </motion.div>
  );
};

Card2.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Card2;