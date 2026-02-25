/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaChevronDown } from "react-icons/fa";

// Import Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function Awards() {
  const { data } = useSelector((state) => state.user);
  const awards = data?.data_info?.awards || [];

  const [showAll, setShowAll] = useState(false);
  
  // State quản lý Lightbox
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);

  const visibleAwards = showAll ? awards : awards.slice(0, 4);

  if (awards.length === 0) return null;

  // Hàm xử lý khi click vào ảnh
  const handleOpenLightbox = (allImages, startIndex) => {
    // Chuyển đổi mảng string url thành mảng object cho Lightbox
    const formattedSlides = allImages.map(img => ({ src: img }));
    setSlides(formattedSlides);
    setOpen(true);
  };

  return (
    <section className="py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black dark:text-white uppercase tracking-tighter">
            My <span className="text-yellow-500 text-outline-yellow">Awards</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {visibleAwards.map((award, index) => {
              const imageList = award.images?.split("|") || [];
              return (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gray-50 dark:bg-[#0f1115] p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-black dark:text-white group-hover:text-yellow-500 transition-colors">
                      {award.name}
                    </h3>
                    <FaTrophy className="text-yellow-500 flex-shrink-0 text-2xl" />
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 italic">
                    "{award.content}"
                  </p>

                  {/* Gallery 3 ảnh gọn gàng */}
                  <div className="grid grid-cols-3 gap-2 h-24">
                    {imageList.slice(0, 3).map((img, i) => (
                      <div
                        key={i}
                        onClick={() => handleOpenLightbox(imageList, i)} // Click vào là mở toàn bộ ảnh của award đó
                        className="relative rounded-xl overflow-hidden cursor-pointer group/img"
                      >
                        <img 
                            src={img} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" 
                            alt="award-thumb"
                        />
                        
                        {/* Overlay cho tấm ảnh cuối cùng */}
                        {i === 2 && imageList.length > 3 && (
                          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white border-2 border-dashed border-yellow-500/50 rounded-xl">
                            <span className="text-lg font-bold">+{imageList.length - 3}</span>
                            <span className="text-[10px]  tracking-tighter">More</span>
                          </div>
                        )}
                        
                        {/* Hover effect cho 2 tấm đầu */}
                        {(i !== 2 || imageList.length <= 3) && (
                            <div className="absolute inset-0 bg-yellow-500/0 group-hover/img:bg-yellow-500/20 transition-colors" />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Nút View All Awards */}
        {awards.length > 4 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-white font-black uppercase text-xs rounded-full hover:bg-yellow-400 transition-all shadow-lg"
            >
              {showAll ? "Show Less" : `View All ${awards.length} Awards`}
              <motion.span animate={{ rotate: showAll ? 180 : 0 }}>
                <FaChevronDown />
              </motion.span>
            </button>
          </div>
        )}
      </div>

      {/* Cửa sổ Lightbox hiện ra khi click vào ảnh */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
      />

      <style>{`
        .text-outline-yellow {
          -webkit-text-stroke: 1px #eab308;
          color: transparent;
        }
      `}</style>
    </section>
  );
}

export default Awards;