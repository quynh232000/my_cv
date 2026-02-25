import { useState } from "react";
import { FaArrowRight, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const About = () => {
  const { data } = useSelector((state) => state.user);
  const [isExpanded, setIsExpanded] = useState(false);
  const info = data?.data_info;
  console.log(data);

  if (!info) return null;

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#1e2329] rounded-[2.5rem] p-8 lg:p-16 shadow-2xl border border-gray-100 dark:border-gray-800 transition-all duration-500">
      {/* Background Decor - Mesh Gradient hiệu ứng hiện đại */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="flex lg:flex-row flex-col-reverse items-center justify-between gap-12 relative z-10">
        {/* Nội dung bên trái */}
        <div className="basis-3/5 dark:text-white">
          <div className="space-y-4 mb-8">
            <div
              data-aos="fade-down"
              className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-xs font-bold uppercase tracking-widest"
            >
              🚀 Welcome to my portfolio
            </div>

            <h1
              className="text-4xl lg:text-7xl font-black tracking-tight text-center lg:text-start leading-[1.1]"
              data-aos="fade-right"
            >
              I am{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-gradient-x">
                {info.name}
              </span>
            </h1>

            <h2
              className="text-2xl lg:text-4xl font-semibold text-center lg:text-start flex flex-col lg:flex-row lg:gap-3"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <span className="text-gray-800 dark:text-gray-200">
                {info.major}
              </span>
              <span className="text-yellow-500 font-light lg:border-l-2 lg:pl-3 border-gray-300 dark:border-gray-700">
                {info.position}
              </span>
            </h2>
          </div>

          {/* Bio Section với Read More */}
          <div
            className="relative group"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <p
              className={`text-gray-500 dark:text-gray-400 text-base lg:text-md leading-relaxed text-center lg:text-start transition-all duration-700 ease-in-out ${!isExpanded ? "line-clamp-3" : "line-clamp-none"}`}
            >
              {info.description || info.bio}
            </p>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-3 flex items-center gap-2 mx-auto lg:mx-0 text-yellow-600 dark:text-yellow-500 font-bold text-sm hover:underline transition-all"
            >
              {isExpanded ? (
                <>
                  {" "}
                  Hide <FaChevronUp className="animate-bounce" />
                </>
              ) : (
                <>
                  More infom <FaChevronDown className="animate-bounce" />
                </>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-10 "
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <a
              href={info.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-10 py-4 font-bold text-white uppercase tracking-widest bg-yellow-500 rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_20px_40px_-15px_rgba(234,179,8,0.6)] active:scale-95"
            >
              Hire Me{" "}
              <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3 transition-all duration-500 hover:-space-x-1 p-2">
                {data?.icons?.slice(0, 5).map((icon, idx) => (
                  <div
                    key={idx}
                    className="group relative w-11 h-11 rounded-full border-2 border-white dark:border-[#1e2329] bg-white dark:bg-gray-800 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex items-center justify-center overflow-hidden cursor-pointer"
                    style={{ zIndex: 10 - idx }}
                  >
                    {/* Tooltip công nghệ đơn lẻ */}
                    <span className="absolute -top-10 scale-0 group-hover:scale-100 bg-black text-white text-[10px] px-2 py-1 rounded transition-all duration-200 z-50 whitespace-nowrap">
                      {icon.name}
                    </span>

                    <img
                      src={icon.icon}
                      alt={icon.name}
                      className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}

                {/* Nút Extra với Popup danh sách còn lại */}
                {data?.icons?.length > 5 && (
                  <div className="group/extra relative w-11 h-11 rounded-full border-2 border-white dark:border-[#1e2329] bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-[12px] font-black text-white shadow-lg z-0 hover:scale-110 transition-transform cursor-pointer">
                    +{data.icons.length - 5}
                    {/* POPUP KHI HOVER */}
                    <div className="absolute bottom-full mb-3 right-0 scale-0 group-hover/extra:scale-100 origin-bottom-right transition-all duration-300 z-[100]">
                      <div className="bg-white dark:bg-[#1a1d23] p-3 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 w-48">
                        <p className="text-[9px] uppercase font-black text-gray-400 mb-2 tracking-widest border-b border-gray-100 dark:border-white/5 pb-1">
                          Other Techs
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                          {data.icons.slice(5).map((extraIcon, eIdx) => (
                            <div
                              key={eIdx}
                              className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center p-1.5 hover:bg-yellow-500/10 transition-colors group/item"
                              title={extraIcon.name}
                            >
                              <img
                                src={extraIcon.icon}
                                alt={extraIcon.name}
                                className="w-full h-full object-contain grayscale group-hover/item:grayscale-0 transition-all"
                              />
                            </div>
                          ))}
                        </div>
                        {/* Mũi tên trỏ xuống của Popup */}
                        <div className="absolute -bottom-1.5 right-4 w-3 h-3 bg-white dark:bg-[#1a1d23] rotate-45 border-r border-b border-gray-100 dark:border-white/10"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest hidden sm:block">
                Tech Stack
              </p>
            </div>
          </div>
        </div>

        {/* Ảnh bên phải - Hiệu ứng 3D Floating */}
        <div
          className="relative basis-1/3 flex justify-center items-center "
          data-aos="fade-left"
        >
          {/* Vòng tròn trang trí phía sau ảnh */}
          <div className="absolute w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative">
            <img
              className="w-[280px] lg:w-[350px] object-contain rounded-2xl transform lg:rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl border-8 border-white dark:border-gray-800"
              src={info.img_background}
              alt={info.name}
            />
            {/* Badge nhỏ nổi bật */}
            <div className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 hidden lg:block">
              <p className="text-yellow-500 font-bold text-xl">1+</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold">
                Years Experience
              </p>
            </div>
          </div>
        </div>

        <div
          className="relative basis-2/5 flex justify-center items-center hidden"
          data-aos="fade-left"
        >
          <div className="relative z-10 animate-float">
            <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-500 to-orange-500 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <img
              className="relative w-[300px] lg:w-[420px] aspect-[4/5] object-contain rounded-[2.5rem] shadow-2xl border-[12px] border-white dark:border-[#2b3139] grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              src={info.img_background}
              alt={info.name}
            />

            {/* Experience Badge - Floating Glassmorphism */}
            <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20 hidden sm:block animate-pulse-slow">
              <div className="text-center">
                <span className="block text-4xl font-black text-yellow-500">
                  1+
                </span>
                <span className="text-[10px] uppercase font-black tracking-tighter dark:text-white">
                  Years of
                  <br />
                  Experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trang trí Shapes - Dạng mờ ảo */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute left-[5%] top-[10%] w-24 h-24 border border-yellow-500 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute right-[10%] bottom-[15%] w-32 h-32 border-2 border-blue-500/30 rounded-3xl rotate-45 animate-pulse"></div>
      </div>

      <style>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default About;
