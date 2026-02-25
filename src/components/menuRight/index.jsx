import { useEffect, useState } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { FiHome, FiMail, FiArrowUp, FiAward, FiMessageSquare } from "react-icons/fi";
import { FaRegFileCode } from "react-icons/fa6";
import { PiStudentBold, PiBriefcaseBold } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { useTime } from "../../hook";
import { Darkmod } from "../commons";

const MenuRight = () => {
  const { hours, minutes, seconds } = useTime();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  // Danh sách các mục menu tương ứng với Element name của bạn
  const menuItems = [
    { to: "home", icon: <FiHome size={20} />, label: "Home" },
    { to: "experience", icon: <PiBriefcaseBold size={20} />, label: "Experience" },
    { to: "work", icon: <FaRegFileCode size={20} />, label: "Projects" },
    { to: "education", icon: <PiStudentBold size={20} />, label: "Education" },
    { to: "awards", icon: <FiAward size={20} />, label: "Awards" },
    { to: "reviews", icon: <FiMessageSquare size={20} />, label: "Reviews" },
    { to: "contact", icon: <FiMail size={20} />, label: "Contact" },
  ];

  const formatTime = (time) => (time <= 9 ? `0${time}` : time);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] lg:bottom-auto lg:right-8 lg:left-auto lg:top-1/2 lg:-translate-y-1/2"
    >
      <div className="flex lg:flex-col items-center gap-4">
        
        {/* TIME & DARKMODE - Desktop */}
        <div className="hidden lg:flex flex-col items-center gap-3 mb-2">
          <div className="bg-white/80 dark:bg-[#1e2329]/80 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5">
            <Darkmod />
          </div>
          <div className="text-[9px] font-black text-yellow-600 dark:text-yellow-500 bg-white dark:bg-[#1a1d23] py-1.5 px-3 rounded-lg shadow-lg border border-gray-100 dark:border-white/5 tracking-tighter">
            {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
          </div>
        </div>

        {/* MAIN NAV BOX */}
        <nav className="w-full lg:w-auto bg-white/90 dark:bg-[#1e2329]/90 backdrop-blur-xl lg:rounded-full shadow-2xl border-t lg:border border-gray-100 dark:border-white/5 p-3 lg:py-6">
          <ul className="flex lg:flex-col flex-row justify-around lg:justify-center items-center gap-4 lg:gap-5">
            {menuItems.map((item) => (
              <li key={item.to} className="relative group">
                <Link
                  spy={true}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-20} // Trừ đi khoảng cách header
                  activeClass="!bg-yellow-500 !text-black !scale-110 shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                  className="cursor-pointer text-gray-500 dark:text-gray-400 flex justify-center items-center w-10 h-10 lg:w-11 lg:h-11 bg-gray-100 dark:bg-white/5 rounded-full transition-all duration-300 hover:text-yellow-500 hover:bg-yellow-500/10"
                >
                  {item.icon}
                </Link>

                {/* Tooltip (Desktop Only) */}
                <span className="absolute hidden lg:block right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl whitespace-nowrap">
                  {item.label}
                  <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </span>
              </li>
            ))}
          </ul>
        </nav>

        {/* SCROLL TO TOP */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={() => scroll.scrollToTop()}
              className="hidden lg:flex items-center justify-center w-11 h-11 bg-black dark:bg-yellow-500 text-white dark:text-black rounded-xl shadow-xl hover:-translate-y-1 transition-all group"
            >
              <FiArrowUp size={20} className="group-hover:animate-bounce" />
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default MenuRight;