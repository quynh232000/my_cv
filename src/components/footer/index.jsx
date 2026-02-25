/* eslint-disable react/no-unescaped-entities */
import { useSelector } from "react-redux";
import { Link as ScrollLink } from "react-scroll"; // Đổi tên để tránh xung đột
import { Link as RouterLink, useLocation } from "react-router-dom"; // Dùng cho chuyển trang
import { motion } from "framer-motion";
import { 
  Facebook, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  ArrowUpCircle 
} from "lucide-react";

const Footer = () => {
  const { data } = useSelector((state) => state.user);
  const info = data?.data_info || {};
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cấu hình Link: isScroll xác định dùng react-scroll hay react-router-dom
  const navLinks = [
    { to: "home", label: "Home", isScroll: true },
    { to: "project", label: "Projects", isScroll: true },
    { to: "blog", label: "Blog", isScroll: false }, 
    { to: "album", label: "Album", isScroll: false },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, url: info.facebook, color: "hover:text-blue-500" },
    { icon: <Github size={20} />, url: info.github, color: "hover:text-gray-400" },
    { icon: <Linkedin size={20} />, url: info.linkedin, color: "hover:text-blue-700" },
    { icon: <Twitter size={20} />, url: info.twitter, color: "hover:text-sky-400" },
    { icon: <Instagram size={20} />, url: info.instagram, color: "hover:text-pink-500" },
  ];

  return (
    <footer className="relative overflow-hidden pt-20 ">
      <style>{`
        iframe { width: 100%; height: 100%; border: none; }
      `}</style>

      {/* MAP SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-6 mb-16"
      >
        <div className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-[#1a1d23] h-[350px] relative group">
          {info.map_address ? (
            <div 
              className="w-full h-full grayscale-[0.5] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              dangerouslySetInnerHTML={{ __html: info.map_address }} 
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 font-bold">
              Map address not available
            </div>
          )}
          <div className="absolute inset-0 pointer-events-none border-[12px] border-transparent group-hover:border-yellow-500/10 transition-all duration-500 rounded-[3rem]"></div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center">
          {/* Logo / Name */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-10 text-center">
            <h2 className="text-4xl font-black dark:text-white tracking-tighter uppercase">
              {info.full_name || "Mr Quynh"}<span className="text-yellow-500">.</span>
            </h2>
            <div className="w-12 h-1 bg-yellow-500 mx-auto mt-2 rounded-full"></div>
          </motion.div>

          {/* Navigation Links - Đã sửa lỗi chuyển hướng */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-10">
            {navLinks.map((link) => {
              const baseClass = "text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-yellow-500 dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer";
              
              // Nếu là link cuộn và đang ở trang chủ
              if (link.isScroll && isHomePage) {
                return (
                  <ScrollLink key={link.to} to={link.to} smooth={true} duration={500} className={baseClass}>
                    {link.label}
                  </ScrollLink>
                );
              }

              // Nếu là link trang riêng (Blog/Album) hoặc đang ở trang con muốn về Home
              return (
                <RouterLink key={link.to} to={link.isScroll ? `/#${link.to}` : `/${link.to}`} className={baseClass}>
                  {link.label}
                </RouterLink>
              );
            })}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center gap-6 mb-12">
            {socialLinks.map((social, index) => social.url && (
                <a key={index} href={social.url} target="_blank" rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-white dark:bg-[#0f1115] border border-gray-100 dark:border-white/5 text-gray-500 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg ${social.color}`}
                >
                  {social.icon}
                </a>
            ))}
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-white/5 to-transparent mb-8"></div>

          {/* Copyright & Scroll to Top */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide order-2 md:order-1 text-center md:text-left">
              © {new Date().getFullYear()} • Created with ❤️ by 
              <span className="text-gray-900 dark:text-white font-bold ml-1 hover:text-yellow-500 transition-colors">
                 {info.full_name || "Nguyen Van Quynh"}
              </span>
            </p>

            <button onClick={scrollToTop} className="flex items-center gap-2 group order-1 md:order-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-yellow-500 transition-colors">Back to top</span>
              <ArrowUpCircle size={24} className="text-gray-300 group-hover:text-yellow-500 transition-all group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-500/5 blur-[100px] rounded-full pointer-events-none"></div>
    </footer>
  );
};

export default Footer;