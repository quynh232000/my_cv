import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  FiCalendar,
  FiArrowLeft,
  FiClock,
  FiShare2,
  FiMessageCircle,
} from "react-icons/fi";
import { getBlogDetail } from "../../services/appService"; // Giả định service của bạn
import PageLoader from "../../components/commons/PageLoader";
import SEO from "../../components/commons/SEO";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hiệu ứng thanh tiến trình đọc (Reading Progress Bar)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getBlogDetail(slug).then((res) => {
      setBlog({
        ...res.data,
        tags: res.data?.tags
          ? Object.values(res.data?.tags).filter(
              (tag) => typeof tag === "string",
            )
          : [],
      });
      setLoading(false);
    });
  }, [slug]);

  if (loading)
    return (
      <PageLoader/>
    );
  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center dark:text-white">
        Article not found.
      </div>
    );

  const shareToFacebook = () => {
    const navUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;

    // Mở một cửa sổ popup nhỏ để chia sẻ
    window.open(navUrl, "_blank", "noopener,noreferrer,width=600,height=450");
  };
  return (
    <div className="min-h-screen bg-white dark:bg-[#080808] transition-colors duration-500 pb-20">
      {/* READING PROGRESS BAR */}
      <SEO 
        title={blog.title}
        description={blog.description?.replace(/<[^>]*>/g, '').substring(0, 160)} // Lọc bỏ tag HTML và lấy 160 ký tự
        image={blog.image}
        author={blog.creator?.full_name}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* HEADER SECTION */}
      <header className="relative w-full h-[70vh] flex items-end pb-20 px-6 overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={blog.image}
          className="absolute inset-0 w-full h-full object-cover"
          alt={blog.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

        <div className="max-w-4xl mx-auto w-full relative z-10 space-y-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-black font-bold  hover:text-yellow-500 bg-white/40 p-2 rounded-lg hover:-translate-x-2 transition-transform"
          >
            <FiArrowLeft /> Back to all posts
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex flex-wrap gap-2">
              {blog?.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-yellow-500 font-bold text-white rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-[1.1] tracking-tighter">
              {blog.title}
            </h1>
          </motion.div>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-white/60 text-[12px] font-bold  ">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black">
                {blog.creator?.full_name?.charAt(0)}
              </div>
              <span className="text-white">{blog.creator?.full_name}</span>
            </div>
            <span className="flex items-center gap-2">
              <FiCalendar className="text-yellow-500" />{" "}
              {new Date(blog.created_at).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2">
              <FiClock className="text-yellow-500" /> 6 min read
            </span>
          </div>
        </div>
      </header>

      {/* CONTENT SECTION */}
      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-20 mt-20">
        {/* Article Body */}
        <article className="max-w-3xl mx-auto w-full">
          <div
            className="prose prose-lg dark:prose-invert prose-yellow 
            prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
            prose-img:rounded-3xl prose-img:shadow-2xl
            selection:bg-yellow-500/30 selection:text-yellow-500"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* Footer of Article */}
          <div className="mt-20 pt-10 border-t border-gray-100 dark:border-white/5 flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold dark:text-gray-500 ">
                Share this story:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={shareToFacebook}
                  className="w-10 h-10 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center dark:text-white hover:bg-yellow-500 hover:text-black transition-all"
                >
                  <FiShare2 size={16} />
                </button>
                <button className="w-10 h-10 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center dark:text-white hover:bg-yellow-500 hover:text-black transition-all">
                  <FiMessageCircle size={16} />
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              {blog.tags?.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-bold dark:text-gray-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* SIDEBAR - Sticky */}
        <aside className="hidden lg:block">
          <div className="sticky top-32 space-y-12">
            {/* Author Card */}
            <div className="p-8 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-yellow-500 flex items-center justify-center text-3xl font-bold">
                {blog.creator?.full_name?.charAt(0)}
              </div>
              <div>
                <h4 className="dark:text-white font-bold">
                  {blog.creator?.full_name}
                </h4>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mt-1">
                  Developer
                </p>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                {/* Đam mê chia sẻ kiến thức về công nghệ và thiết kế giao diện sáng
                tạo. */}
                {/* tieengs anh */}
                Passionate about sharing knowledge on technology and creative UI
                design.
              </p>
              <button className="w-full py-3 bg-gray-900 dark:bg-white dark:text-black text-white rounded-xl text-xs font-bold uppercase">
                <Link href="/">Contact</Link>
              </button>
            </div>

            {/* Newsletter or CTA */}
            {blog.related_blogs && blog.related_blogs.length > 0 && (
              <div className="space-y-4">
                <h5 className="dark:text-white text-xl font-bold ">
                  Relative blogs
                </h5>

                <div className="flex flex-col gap-3">
                  {blog.related_blogs.map((related) => (
                    <div key={related.id} className="group cursor-pointer">
                      <div className="aspect-video rounded-2xl overflow-hidden mb-3">
                        <img
                          src={related.image}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-50"
                          alt=""
                        />
                      </div>
                      <h6 className="dark:text-gray-300 font-bold leading-snug group-hover:text-yellow-500 transition-colors line-clamp-2">
                        <Link to={`/blog/${related.slug}`}>{related.title}</Link>
                      </h6>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </main>

      {/* MORE BLOGS CTA */}
      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <div className="py-20 rounded-[3rem] bg-yellow-500 text-white px-10">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            {/* Want more insights?
            
            
            */}
            Get more insights and stories in my newsletter!
          </h2>
          <p className="mt-4 font-medium opacity-80">
            Subscribe to our newsletter for the latest design news.
          </p>
          <div className="mt-10 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="your@email.com"
              className="w-full px-8 py-5 rounded-full bg-white/20 border border-black/10 focus:outline-none placeholder:text-black/40 font-bold"
            />
            <button className="absolute right-2 top-2 bottom-2 px-8 bg-black text-white rounded-full font-bold text-xs uppercase">
              Send
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
