import { useSelector } from "react-redux";
import { FaBriefcase,  FaMapMarkerAlt, FaCheck, FaLayerGroup } from "react-icons/fa";

function WorkExperience() {
  const { data } = useSelector((state) => state.user);
  const experiences = data?.data_info?.work_experience || [];

  if (experiences.length === 0) return null;


  return (
    <section className="px-5 lg:px-10 py-12 bg-white dark:bg-[#1e2329] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
      
      {/* Header gọn gàng hơn */}
      <div className="flex items-end justify-between mb-12 border-b border-gray-50 dark:border-gray-800 pb-6">
        <div>
          <h2 className="text-3xl lg:text-4xl font-black dark:text-white uppercase tracking-tighter">
            Career <span className="text-yellow-500">History</span>
          </h2>
          <p className="text-gray-500 text-xs mt-1 font-medium tracking-widest uppercase">My professional journey</p>
        </div>
        <FaLayerGroup className="text-yellow-500/20 text-4xl hidden sm:block" />
      </div>

      <div className="relative">
        {/* Đường line dọc thanh mảnh bên trái */}
        <div className="absolute left-[18px] top-2 bottom-2 w-[1px] bg-gray-200 dark:bg-gray-800"></div>

        <div className="space-y-10">
          {experiences.map((exp, index) => {
            const achievementList = exp.achievements?.split('|').filter(item => item.trim() !== "") || [];

            return (
              <div key={index} className="relative pl-12 group" data-aos="fade-up">
                
                {/* Timeline Point - Nhỏ gọn hơn */}
                <div className="absolute left-0 top-1 w-9 h-9 bg-white dark:bg-[#1e2329] border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-center z-10 group-hover:border-yellow-500 transition-colors shadow-sm">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full group-hover:scale-150 transition-transform"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
                  {/* Cột 1: Thời gian & Công ty (Cố định chiều rộng trên desktop để thẳng hàng) */}
                  <div className="lg:w-1/4 flex-shrink-0">
                    <div className="inline-block px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-[10px] font-black rounded-lg mb-2">
                      {exp.period}
                    </div>
                    <h4 className="text-base font-bold dark:text-white leading-tight mb-1">{exp.company}</h4>
                    <p className="text-gray-400 text-[11px] font-bold flex items-center gap-1 uppercase tracking-tighter">
                      <FaMapMarkerAlt className="text-yellow-500/50" /> {exp.location}
                    </p>
                  </div>

                  {/* Cột 2: Nội dung chi tiết - Dạng Card mờ */}
                  <div className="flex-grow bg-gray-50/50 dark:bg-gray-800/30 p-6 rounded-3xl border border-gray-100 dark:border-gray-700/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold dark:text-yellow-500">{exp.position}</h3>
                      <FaBriefcase className="text-gray-300 dark:text-gray-700 text-sm" />
                    </div>

                    {/* Danh sách achievements chia grid 2 cột để tiết kiệm dòng nếu cần */}
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                      {achievementList.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 leading-snug">
                          <FaCheck className="text-yellow-500 mt-1 text-[10px] flex-shrink-0" />
                          <span>{item.trim()}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack Chips - Tự động hiển thị nếu bạn muốn */}
                    <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
                       {/* Bạn có thể lọc tech stack dựa trên text trong achievement hoặc thêm field mới */}
                       {exp.roles_and_tech?.length > 0 ? 
                            exp.roles_and_tech.map((role, idx) => (
                                <span key={idx} className="text-[9px] font-black px-2 py-0.5 bg-white dark:bg-gray-900 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-md uppercase">
                                    {role?.name?.trim() ?? ''}
                                </span>
                            ))
                            : <>
                            <span className="text-[9px] font-semibold px-2 py-0.5 bg-white dark:bg-gray-900 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-md uppercase">Backend</span>
                            <span className="text-[9px] font-semibold px-2 py-0.5 bg-white dark:bg-gray-900 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-md uppercase">API Design</span>
                            </>
                    }
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WorkExperience;