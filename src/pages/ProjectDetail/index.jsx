import { Link, useParams } from "react-router-dom";
import { GrLinkPrevious } from "react-icons/gr";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiCalendar,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const { data } = useSelector((state) => state.user);
  const [project, setProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (data?.projects) {
      const foundProject = data.projects?.find((item) => item.slug === slug);
      setProject(foundProject);
    }
  }, [slug, data]);

  if (!project)
    return (
      <div className="h-screen flex items-center justify-center dark:bg-[#18191a]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-yellow-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-yellow-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );

  const imageList = project.images
    ? project.images.split("|")
    : [project.thumbnail];
  const mainFeatures = project.featuremain
    ? project.featuremain.split("|")
    : [];

  const scrollGallery = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen pt-28 pb-32 px-4 lg:px-12 dark:bg-[#18191a] selection:bg-yellow-500/30"
    >
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              src={previewImage}
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button - Refined */}
      <Link
        to="/project"
        className="fixed top-8 left-8 z-[60] group flex items-center gap-3 p-1.5 pr-5 bg-white dark:bg-[#242526] rounded-full border border-gray-200 dark:border-white/10 shadow-lg transition-all hover:border-yellow-500"
      >
        <div className="w-9 h-9 flex items-center justify-center bg-gray-50 dark:bg-[#1e2329] rounded-full group-hover:bg-yellow-500 transition-colors">
          <GrLinkPrevious
            size={14}
            className="dark:text-white group-hover:text-black"
          />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider dark:text-gray-300 group-hover:text-yellow-500">
          Back
        </span>
      </Link>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* LEFT: IMAGES */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl border border-gray-100 dark:border-white/5">
              <motion.img
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
                src={project.thumbnail}
                className="w-full h-auto object-cover cursor-zoom-in"
                onClick={() => setPreviewImage(project.thumbnail)}
              />
            </div>

            {/* Gallery */}
            <div className="relative group/gallery">
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
              >
                {imageList.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setPreviewImage(img)}
                    className="min-w-[240px] h-[150px] snap-start rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 cursor-pointer hover:border-yellow-500 transition-colors"
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt={`gallery-${idx}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4 justify-end opacity-0 group-hover/gallery:opacity-100 transition-opacity">
                <button
                  onClick={() => scrollGallery("left")}
                  className="p-2 bg-gray-100 dark:bg-[#242526] rounded-full hover:bg-yellow-500 dark:text-white"
                >
                  <FiChevronLeft />
                </button>
                <button
                  onClick={() => scrollGallery("right")}
                  className="p-2 bg-gray-100 dark:bg-[#242526] rounded-full hover:bg-yellow-500 dark:text-white"
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 space-y-6">
              <h1 className="text-lg lg:text-2xl font-bold dark:text-white leading-tight tracking-tight uppercase">
                {project.title}
                <span className="text-yellow-500">.</span>
              </h1>
              <div className="flex flex-wrap gap-2">
                {project.category?.map((cat, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-[10px] font-bold uppercase tracking-widest rounded-md border border-yellow-500/20"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              

              <div
                className="text-gray-500 dark:text-gray-400 text-base leading-relaxed font-medium prose prose-sm dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />

              <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-gray-400 font-bold  flex items-center gap-2">
                    <FiCalendar className="text-yellow-500" /> Date
                  </span>
                  <p className="text-sm dark:text-gray-200 font-bold">
                    {project.created_at.split(" ")[0]}
                  </p>
                </div>
                <div className="space-y-1 border-l border-gray-200 dark:border-white/10 pl-4">
                  <span className="text-[10px] uppercase text-gray-400 font-bold  flex items-center gap-2">
                    <FiLayers className="text-yellow-500" /> Platform
                  </span>
                  <p className="text-sm dark:text-gray-200 font-bold">
                    Web Responsive
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-[2] h-14 flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400  font-bold uppercase text-xs tracking-wider text-white rounded-xl transition-all shadow-lg shadow-yellow-500/20 active:scale-95"
                >
                  Live Preview <FiExternalLink size={16} />
                </a>
                <a
                  href={project.source}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 h-14 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-xl hover:opacity-80 transition-all shadow-md active:scale-95"
                >
                  <FiGithub size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: FEATURES & TECH STACK */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-gray-100 dark:border-white/5 pt-16">
          {/* LEFT: CORE FEATURES */}
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-2">
              <h2 className="text-[14px] font-bold  tracking-[0.4em] text-yellow-500">
                Functionality
              </h2>
              <h3 className="text-2xl font-bold dark:text-white  tracking-tighter">
                Core Features
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.feature?.map((f, i) => (
                <div
                  key={i}
                  className="group p-6 bg-gray-50/50 dark:bg-[#1e2329]/50 rounded-xl border border-transparent hover:border-yellow-500/20 hover:bg-white dark:hover:bg-[#1e2329] transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-bold text-yellow-500 mt-1 opacity-50 group-hover:opacity-100">
                      0{i + 1}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 font-semibold text-[14px]  ">
                      {f}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: TECH STACK SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              <div className="p-8 bg-black dark:bg-white rounded-2xl shadow-2xl relative overflow-hidden group">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/20 blur-[40px] group-hover:bg-yellow-500/40 transition-colors"></div>

                <h4 className="text-[12px] font-bold uppercase  mb-8 text-yellow-500 dark:text-gray-500 border-b border-white/10 dark:border-black/5 pb-4">
                  Tech Stack
                </h4>

                <ul className="space-y-4">
                  {mainFeatures.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between group/item"
                    >
                      <span className="text-[11px] font-bold uppercase  text-white dark:text-black opacity-70 group-hover/item:opacity-100 transition-opacity">
                        {item}
                      </span>
                      <div className="h-[1px] flex-1 mx-4 bg-white/10 dark:bg-black/5 group-hover/item:bg-yellow-500/50 transition-colors"></div>
                      <div className="w-1 h-1 bg-yellow-500 rounded-full scale-0 group-hover/item:scale-100 transition-transform"></div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Summary / Status */}
              <div className="px-4 py-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-widest text-yellow-600 dark:text-yellow-500">
                  Project Status
                </span>
                <span className="flex items-center gap-2 text-[9px] font-bold uppercase text-gray-500">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Completed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FULL STORY */}
        {project.content && (
          <div className="mt-32 max-w-3xl border-t border-gray-100 dark:border-white/5 pt-20">
            <h2 className="text-2xl font-bold dark:text-white uppercase tracking-tight mb-10 flex items-center gap-3">
              <span className="w-8 h-[2px] bg-yellow-500"></span> Detailed
              Description
            </h2>
            <div
              className="text-gray-500 dark:text-gray-400 text-base leading-relaxed prose dark:prose-invert font-medium 
              prose-headings:text-black dark:prose-headings:text-white prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter
              prose-strong:text-yellow-600 dark:prose-strong:text-yellow-500"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default ProjectDetailPage;
