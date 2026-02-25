import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../../../components/slick";
import {  FaExternalLinkAlt } from "react-icons/fa";
import { FaRightLeft } from "react-icons/fa6";

const Work = () => {
  const { data: globalData } = useSelector((state) => state.user);
  const homeProjects =
    globalData?.projects?.filter((item) => item.isHome == 1) || [];

  const settings = {
    dots: true,
    infinite: homeProjects.length > 3,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div style={{ bottom: "-45px" }}>
        <ul className="flex justify-center items-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 rounded-full transition-all duration-300 custom-dot"></div>
    ),
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  if (homeProjects.length === 0) return null;

  return (
    <section className=" bg-transparent relative">
      {/* 1. Decorative Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-yellow-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* 2. Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl text-center lg:text-left">
          <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
            <span className="w-12 h-[2px] bg-yellow-500"></span>
            <span className="text-yellow-500 font-bold uppercase tracking-[0.3em] text-xs">
              Portfolio
            </span>
          </div>
          <h2
            data-aos="fade-right"
            className="text-xl lg:text-3xl font-black dark:text-white leading-none"
          >
            FEATURED <span className="text-yellow-500">PROJECTS</span>
          </h2>
          <p
            className="mt-6 text-gray-500 dark:text-gray-400 text-lg"
            data-aos="fade-up"
          >
            {/* tiếng anh */}
            Here are some of my highlighted projects that showcase my skills and experience.
          </p>
        </div>
        <Link
          to="/project"
          className="hidden lg:flex items-center gap-3 font-bold  text-xs tracking-widest dark:text-white hover:text-yellow-500 transition-all group"
        >
          View all projects{" "}
          <FaRightLeft className="group-hover:rotate-12 transition-transform" />
        </Link>
      </div>

      {/* 3. Slider Section */}
      <div className="slider-container" data-aos="fade-up">
        <Slider {...settings} className="project-slider -mx-4">
          {homeProjects.map((item, index) => (
            <div key={item.id || index} className="px-4 pb-10">
              <div className="group relative bg-white dark:bg-[#1e2329] rounded-3xl overflow-hidden border border-gray-100
               dark:border-gray-800/50 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-500">
                {/* Image Wrap & Hover Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Category Tags */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    {item.category?.slice(0, 4).map((cat, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 bg-white/90 dark:bg-black/60 backdrop-blur-md text-[10px] font-black uppercase rounded-full dark:text-white border border-primary-500/50"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Quick Action Overlay */}
                  <div className="absolute inset-0 bg-yellow-500/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-5 translate-y-10 group-hover:translate-y-0">
                    <a
                      href={item.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <FaExternalLinkAlt />
                    </a>
                    <Link
                      to={`/project/${item.slug}`}
                      className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-black hover:text-white transition-all uppercase text-xs tracking-tighter"
                    >
                      Details
                    </Link>
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold dark:text-white  line-clamp-2 min-h-16">
                      {item.title}
                    </h3>
                    
                  </div>

                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed mb-8">
                    <div dangerouslySetInnerHTML={{ __html: item.description }} className="min-h-12 line-clamp-2"></div>
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {/* Tech Stack giả lập từ featuremain */}
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-[10px] font-bold rounded-md dark:text-gray-400">
                        {item.featuremain || "Modern Stack"}
                      </span>
                    </div>
                    <Link
                      to={`/project/${item.slug}`}
                      className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all dark:text-white"
                    >
                      <FaExternalLinkAlt size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* 4. Mobile See More */}
      <div className="flex lg:hidden justify-center mt-16">
        <Link
          to="/project"
          className="px-8 py-4 bg-yellow-500 text-white font-black uppercase tracking-widest rounded-xl shadow-lg"
        >
          See all works
        </Link>
      </div>

      <style>{`
        .slick-dots li.slick-active .custom-dot {
          background-color: #eab308 !important;
          width: 30px !important;
        }
        .project-slider .slick-list {
          padding: 20px 0 !important;
          margin: 0 -10px;
        }
      `}</style>
    </section>
  );
};

export default Work;
