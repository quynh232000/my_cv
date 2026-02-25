/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaCode } from "react-icons/fa";

const Education = () => {
  const { data } = useSelector((state) => state.user);
  const educationData = data?.data_info?.educations || [];

  if (educationData.length === 0) return null;

  return (
    <section className="py-24  relative overflow-hidden bg-transparent">
      {/* Background Decor: Tạo các điểm sáng huyền ảo phía sau */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header: Chỉnh lại font size và khoảng cách chữ cho "ngầu" hơn */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <span className="h-[1px] w-8 bg-yellow-500/50"></span>
            <span className="text-yellow-500 font-black uppercase text-[11px] tracking-[0.6em]">Academic Journey</span>
            <span className="h-[1px] w-8 bg-yellow-500/50"></span>
          </motion.div>
          <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            Learning <span className="text-yellow-500 text-outline-yellow">Path</span>
          </h2>
        </div>

        <div className="space-y-20">
          {educationData.map((edu, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* 1. Viền sáng chạy dọc thân Card khi Hover */}
              <div className="absolute -left-2 top-0 bottom-0 w-[4px] bg-yellow-500 rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top shadow-[0_0_15px_#eab308]"></div>
              
              {/* 2. Nội dung Card chính với hiệu ứng Glassmorphism cực mạnh */}
              <div className="bg-[#0f1115]/80 backdrop-blur-3xl rounded-[2.5rem] lg:rounded-[4rem] p-8 lg:p-16 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group-hover:bg-[#14171c] transition-colors duration-500">
                
                {/* Trang trí icon chìm */}
                <FaCode className="absolute top-10 right-10 text-[150px] text-white/[0.02] -rotate-12 group-hover:text-yellow-500/[0.03] transition-colors duration-700" />

                <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-20">
                  
                  {/* Khối Logo: Xử lý dạng Floating (nổi) */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="w-40 h-40 lg:w-56 lg:h-56 bg-gradient-to-b from-white to-gray-100 p-8 lg:p-12 rounded-full lg:rounded-[3.5rem] shadow-2xl relative z-10 flex items-center justify-center transform group-hover:-rotate-6 group-hover:scale-105 transition-all duration-700">
                      <img
                        className="w-full h-full object-contain filter drop-shadow-md"
                        src={edu.logo}
                        alt={edu.name}
                      />
                    </div>
                  </div>

                  {/* Khối Text: Tối ưu phân cấp thị giác */}
                  <div className="flex-grow text-center lg:text-left">
                    {/* Badge thời gian dạng Glass */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-yellow-500 text-[11px] font-black uppercase tracking-widest mb-6">
                      <FaCalendarAlt className="text-xs" />
                      {edu.time}
                    </div>

                    <h3 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight group-hover:translate-x-2 transition-transform duration-500">
                      {edu.name}
                    </h3>
                    
                    <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-gray-400 font-bold text-xs uppercase tracking-widest mb-8 opacity-70">
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-yellow-500" />
                        {edu.address}
                      </span>
                      {/* <span className="h-1 w-1 bg-gray-600 rounded-full"></span> */}
                      {/* <span className="text-yellow-500/80 italic">Verified Alumni</span> */}
                    </div>

                    {/* Content Box: Bọc trong khung mờ */}
                    <div className="relative p-6 lg:p-8 rounded-3xl bg-white/[0.02] border border-white/5 italic">
                      <span className="absolute -top-4 -left-2 text-6xl text-yellow-500/20 leading-none font-serif">“</span>
                      <p className="text-gray-300 text-lg lg:text-xl font-medium leading-relaxed">
                        {edu.content.replace(/"/g, '')}
                      </p>
                    </div>

                    {/* Tech Stack Chips: Hiện đại hóa */}
                    <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2">
                      {(edu.skills ?? ['Laravel', 'System Design', 'Algorithms']).map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-md text-[9px] font-black text-white/40 border border-white/5 uppercase group-hover:border-yellow-500/30 group-hover:text-yellow-500 transition-all duration-500">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .text-outline-yellow {
          -webkit-text-stroke: 1.5px #eab308;
          color: transparent;
        }
        /* Hiệu ứng mờ dần ở các cạnh */
        .backdrop-blur-3xl {
          backdrop-filter: blur(60px);
        }
      `}</style>
    </section>
  );
};

export default Education;