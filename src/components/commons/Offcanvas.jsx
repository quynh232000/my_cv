import { useState, useEffect } from "react";
import { useTime } from "../../hook";
import { IoClose } from "react-icons/io5";
import { HiBars3BottomLeft } from "react-icons/hi2";
import Darkmod from "./Darkmod";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const Offcanvas = () => {
  const { hours, minutes, seconds } = useTime();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const formatTime = (t) => (t <= 9 ? `0${t}` : t);

  // Khóa cuộn trang khi menu đang mở
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const menuItems = [
    { to: "home", label: "Home", isScroll: true },
    { to: "experience", label: "Experience", isScroll: true },
    { to: "/project", label: "Projects", isScroll: false },
    { to: "contact", label: "Contact", isScroll: true },
    { to: "/blog", label: "Blog", isScroll: false },
  ];

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Nút Toggle - Cải tiến để luôn nổi bật */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-10 left-0 z-[100] flex items-center justify-center h-12 w-12 rounded-r-2xl transition-all duration-300 shadow-lg ${
          isOpen ? "bg-red-500 translate-x-[280px] lg:translate-x-[320px] rounded-l-2xl" : "bg-yellow-500 hover:w-14"
        } text-white`}
      >
        {isOpen ? <IoClose size={30} /> : <HiBars3BottomLeft size={30} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay với hiệu ứng mờ kính */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] cursor-pointer"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] lg:w-[320px] h-full shadow-2xl dark:bg-[#1e2329] bg-white z-[90] p-10 flex flex-col justify-between"
            >
              {/* Top: Darkmode & Close info */}
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-gray-50 dark:bg-[#24292f] rounded-3xl w-full flex justify-center shadow-inner">
                  <Darkmod size={40} />
                </div>
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"></div>
              </div>

              {/* Middle: Navigation */}
              <nav>
                <ul className="flex flex-col gap-2">
                  {menuItems.map((item) => {
                    const baseClass = "block py-4 px-6 text-md font-bold  tracking-widest text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-white transition-all hover:translate-x-2 cursor-pointer";

                    if (item.isScroll && isHomePage) {
                      return (
                        <li key={item.to}>
                          <ScrollLink
                            to={item.to}
                            smooth={true}
                            duration={500}
                            onClick={handleClose}
                            className={baseClass}
                            activeClass="!text-yellow-500 translate-x-2"
                            spy={true}
                          >
                            {item.label}
                          </ScrollLink>
                        </li>
                      );
                    }

                    return (
                      <li key={item.to}>
                        <RouterLink
                          to={item.isScroll ? `/#${item.to}` : item.to}
                          onClick={handleClose}
                          className={baseClass}
                        >
                          {item.label}
                        </RouterLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom: Time & Footer */}
              <div className="flex flex-col items-center gap-4">
                <div className="px-6 py-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                  <span className="text-lg font-bold text-yellow-600 dark:text-yellow-500 tracking-widest">
                    {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400  tracking-widest">© {new Date().getFullYear()} Portfolio</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Offcanvas;