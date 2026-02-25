/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { NextArrow, PrevArrow } from "../../../components/slick";

const Reviews = () => {
  const { data } = useSelector((state) => state.user);
  const reviews = data?.data_info?.reviews || [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    centerMode: true, // Tạo hiệu ứng tập trung vào giữa
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    customPaging: (i) => (
      <div className="w-8 lg:w-12 h-[3px] bg-white/10 mt-10 rounded-full overflow-hidden relative">
         <div className="absolute inset-0 bg-yellow-500 origin-left scale-x-0 dot-progress"></div>
      </div>
    ),
  };

  if (reviews.length === 0) return null;

  return (
    <section className="px-6 lg:px-12 py-24 relative overflow-hidden bg-[#050505]">
      {/* --- GLOW EFFECTS: Tinh chỉnh lại để sang hơn --- */}
      <div className="absolute top-0 left-1/4 w-full h-full bg-yellow-500/[0.03] blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-600/[0.05] blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-yellow-500 font-bold uppercase tracking-[0.4em] text-[10px] block mb-4"
          >
            Kind words from colleagues
          </motion.span>
          <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight uppercase">
            The Trusted <span className="text-yellow-500">Voices</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto mt-6 rounded-full opacity-50"></div>
        </div>

        <Slider {...settings} className="review-slider-modern">
          {reviews.map((item, index) => (
            <div key={index} className="outline-none px-2 lg:px-4">
              <div className="relative group p-1">
                {/* Neon Border: Hiệu ứng viền chạy khi hover nhẹ nhàng hơn */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-yellow-500/50 to-transparent rounded-[2.5rem] opacity-20 group-hover:opacity-100 transition duration-700"></div>
                
                {/* Main Content Card */}
                <div className="relative bg-[#0f1115] backdrop-blur-md p-8 lg:p-16 rounded-[2.5rem] border border-white/5 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                  
                  {/* Left Side: Profile */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="relative w-28 h-28 lg:w-40 lg:h-40 mb-6 group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 border-2 border-yellow-500/20 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
                      <div className="absolute inset-2 bg-gradient-to-tr from-yellow-500 to-transparent rounded-full p-[2px]">
                        <img 
                          src={item.avatar} 
                          alt={item.name} 
                          className="w-full h-full rounded-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all shadow-2xl bg-[#0f1115]"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-white mb-1">{item.name}</h4>
                      <p className="text-yellow-500/80 font-medium text-[10px] uppercase tracking-widest">{item.username}</p>
                    </div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="relative flex-grow text-center lg:text-left">
                    <FaQuoteLeft className="text-yellow-500/10 text-7xl absolute -top-8 lg:-top-12 -left-4 lg:-left-10" />
                    
                    <div className="flex justify-center lg:justify-start gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500 text-xs shadow-yellow-500" />
                      ))}
                    </div>

                    <p className="text-lg lg:text-2xl font-light text-gray-300 leading-relaxed italic relative z-10">
                      &ldquo;{item.content}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .review-slider-modern .slick-dots { bottom: -60px; display: flex !important; justify-content: center; gap: 10px; }
        .review-slider-modern .slick-dots li { margin: 0; width: auto; height: auto; }
        .review-slider-modern .slick-dots li.slick-active .dot-progress {
          transform: scaleX(1);
          transition: transform 5.8s linear;
        }
        .review-slider-modern .slick-list { overflow: visible; }
        .review-slider-modern .slick-slide { 
          opacity: 0.2; 
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.85);
        }
        .review-slider-modern .slick-center { 
          opacity: 1; 
          transform: scale(1);
        }
        /* Mobile adjustment */
        @media (max-width: 768px) {
          .review-slider-modern .slick-slide { transform: scale(0.95); }
        }
      `}} />
    </section>
  );
};

export default Reviews;