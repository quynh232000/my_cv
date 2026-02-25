/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Card2 } from "../../components/commons";
import { FiArrowUpRight } from "react-icons/fi";

const Work = () => {
  const { data: reduxData } = useSelector((state) => state.user);
  const [displayData, setDisplayData] = useState([]);
  const [cate, setCate] = useState("All");

  // Sử dụng useMemo để tránh tính toán lại sourceData vô ích
  const sourceData = useMemo(() => reduxData?.projects || [], [reduxData]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (cate === "All") {
      setDisplayData(sourceData);
    } else {
      // Lọc dự án dựa trên mảng category của từng project
      const filtered = sourceData.filter(
        (item) =>
          item.category?.some((c) => c === cate) ||
          item.category?.includes(cate),
      );
      setDisplayData(filtered);
    }
  }, [cate, sourceData]);
  const categoriesList = useMemo(() => {
    return reduxData?.categories || [];
  }, [reduxData]);
  return (
    <div className="min-h-screen pb-32 dark:bg-[#121212] duration-500">
      {/* HERO HEADER */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <span className="px-4 py-1.5 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-[11px] font-bold uppercase">
              Portfolio - {reduxData?.data_info?.full_name || "Mr Quynh"}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-gray-900 leading-[1.1]">
              Crafting{" "}
              <span className="italic font-serif text-yellow-500">Digital</span>{" "}
              Stories
            </h1>
            <p className="max-w-xl text-gray-500 dark:text-gray-400 text-sm font-medium leading-relaxed opacity-80">
              A curated collection of interfaces and experiences built with
              focus on clean code and user-centric design.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent -z-0" />
      </header>

      {/* STICKY NAVIGATION & FILTER */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-16 flex items-center justify-between gap-8">
            {/* Thanh cuộn Category mượt mà */}
            <div className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              <button
                onClick={() => setCate("All")}
                className={`relative shrink-0 px-4 py-2 text-[11px] font-bold uppercase transition-all
                  ${cate === "All" ? "text-yellow-600 dark:text-yellow-500" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
              >
                All Works
                {cate === "All" && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-full"
                  />
                )}
              </button>

              {categoriesList.map((item) => (
                <button
                  key={item} // Dùng chính tên item làm key thay vì Math.random()
                  onClick={() => setCate(item)}
                  className={`relative shrink-0 px-4 py-2 text-[11px] font-bold uppercase transition-all
                    ${cate === item ? "text-yellow-600 dark:text-yellow-500" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`}
                >
                  {item}
                  {cate === item && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Counter - Chỉ hiện trên máy tính để tiết kiệm không gian */}
            <div className="hidden lg:flex shrink-0 items-center gap-4 text-[10px] font-bold text-gray-400 border-l border-gray-200 dark:border-white/10 pl-6">
              <span className="uppercase">{displayData.length} Projects</span>
            </div>
          </div>
        </div>
      </nav>

      {/* GRID CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 mt-16">
        <div mode="">
          {displayData.length > 0 ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16"
            >
              {displayData.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Card2 data={item} />
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-[40vh] flex flex-col items-center justify-center text-center"
            >
              <div className="text-6xl mb-6 opacity-10">Empty</div>
              <h3 className="text-xl font-bold dark:text-white text-gray-900">
                No project in this category
              </h3>
              <button
                onClick={() => setCate("All")}
                className="mt-4 px-6 py-2 bg-yellow-500/10 text-yellow-500 rounded-full text-xs font-bold hover:bg-yellow-500 hover:text-black transition-all"
              >
                Return to all works
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* FOOTER CALL TO ACTION */}
      <footer className="mt-40 max-w-7xl mx-auto px-6">
        <div className="p-12 lg:p-20 rounded-[3.5rem] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 flex flex-col items-center text-center space-y-8">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-bold dark:text-white max-w-4xl leading-[1.1] tracking-tight">
                Have a vision in mind? <br />
                Let’s build your next{" "}
                <span className="italic font-serif text-yellow-500 relative">
                  digital masterpiece
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-2 text-yellow-500/30"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 25 0 50 5 T 100 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>{" "}
                together.
              </h2>

              <p className="max-w-xl mx-auto text-gray-500 dark:text-gray-400 text-base md:text-lg font-medium opacity-80">
                I’m currently available for freelance projects and full-time
                opportunities. Let’s turn your ideas into a high-performing
                reality.
              </p>
            </div>

            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-full overflow-hidden transition-all shadow-xl shadow-yellow-500/5"
            >
              <span className="relative z-10 uppercase text-xs tracking-widest">
                Get In Touch
              </span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <FiArrowUpRight className="text-black text-lg" />
              </div>

              {/* Background Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </motion.a>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default Work;
