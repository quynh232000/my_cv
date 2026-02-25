/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaGithub,
  FaYoutube,
  FaBehance,
  FaDownload,
} from "react-icons/fa";
import avatarDefault from "../../assets/images/avatar.jpg";

const MenuLeft = () => {
  const { data } = useSelector((state) => state.user);
  const info = data?.data_info;

  const socialIcons = {
    facebook: <FaFacebookF />,
    github: <FaGithub />,
    youtube: <FaYoutube />,
    behance: <FaBehance />,
  };

  if (!info)
    return <div className="w-[300px] h-screen bg-gray-50 animate-pulse" />;

  return (
    <div className="bg-[#f7f7f8] dark:bg-[#18191a] lg:w-[280px] h-screen lg:fixed overflow-y-auto px-6 py-10 scrollbar-hide shadow-inner border-r border-gray-200 dark:border-gray-800">
      {/* 1. Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <img
            className="w-28 h-28 rounded-full object-cover shadow-2xl border-2 border-white dark:border-gray-700"
            src={info.avatar || avatarDefault}
            alt={info.name}
          />
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-[#f7f7f8] rounded-full"></div>
        </div>
        <h2 className="text-xl font-bold dark:text-white text-[#2b2b2b]">
          {info.name}
        </h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">{info.major} {info.position}</p>

        {/* Social Icons hiện đại hơn với hình tròn nhỏ */}
        <div className="flex gap-3 mt-4">
          {info.socials?.map((social, idx) => (
            <Link
              key={idx}
              to={social.link}
              target="_blank"
              className="w-8 h-8 flex justify-center items-center rounded-full bg-yellow-500 text-white hover:scale-110 transition-transform shadow-md"
            >
              {socialIcons[social.type.toLowerCase()] || <FaGithub />}
            </Link>
          ))}
        </div>
      </div>

      <hr className="border-gray-200 dark:border-gray-800 mb-6" />

      {/* 2. Personal Info List */}
      <div className="space-y-3 mb-8">
        <InfoRow label="Birthday" value={info.birthday} />
        <InfoRow label="Phone" value={info.phone} />
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-800 dark:text-gray-200 font-medium">
            Freelance:
          </span>
          <span className="text-green-500 font-bold">Available</span>
        </div>
        <InfoRow label="Address" value={info.location} />
      </div>

      <hr className="border-gray-200 dark:border-gray-800 mb-6" />

      {/* 4. Skills Section - Phân loại theo Icon như hình */}
      <div className="mb-10">
        <h3 className="text-lg font-bold dark:text-white mb-5">Skills</h3>

        {/* Render group kỹ năng từ skills array hoặc extra_skills */}
        <div className="space-y-6">
          <SkillGroup
            icon="💻"
            title="Programming Languages"
            tags={["JavaScript", "PHP", "Python"]}
          />
          <SkillGroup
            icon="🎨"
            title="Frontend Development"
            tags={["ReactJS", "Angular", "NextJS", "TypeScript"]}
          />
          <SkillGroup
            icon="⚙️"
            title="Backend Development"
            tags={["NodeJS", "Laravel", "NestJS"]}
          />
          <SkillGroup
            icon="🗄️"
            title="Database & Storage"
            tags={["MySQL", "MongoDB", "Redis"]}
          />
          <SkillGroup
            icon="☁️"
            title="Cloud & DevOps"
            tags={["CI/CD", "GitLab CI"]}
          />
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-800 mb-6" />
      {/* 3. Languages Section */}
      <div className="mb-8">
        <h3 className="text-lg font-bold dark:text-white mb-3">Languages</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-4 italic">
          {info.languages?.[0]?.content}
        </p>
        <div className="flex flex-wrap gap-2">
          {info.languages?.map((lang, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-xs font-medium dark:text-gray-300"
            >
              {lang.name}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Download Button Sticky */}
      <div className="sticky bottom-0 bg-[#f7f7f8] dark:bg-[#18191a] pt-4 pb-6">
        <a
          href={info.cv}
          className="flex items-center justify-center gap-2 w-full bg-yellow-500 text-white font-bold py-3 rounded uppercase text-xs tracking-widest hover:bg-yellow-400 transition-colors shadow-lg"
        >
          Download CV <FaDownload size={14} />
        </a>
      </div>
    </div>
  );
};

// Component con cho từng dòng thông tin
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-800 dark:text-gray-200 font-medium">
      {label}:
    </span>
    <span className="text-gray-500 dark:text-gray-400">{value}</span>
  </div>
);

// Component con cho từng nhóm Skill
// eslint-disable-next-line react/prop-types
const SkillGroup = ({ icon, title, tags = [] }) => (
  <div>
    <div className="flex items-center gap-2 mb-3 border-b border-dashed border-gray-300 dark:border-gray-700 pb-1">
      <span>{icon}</span>
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        {title}
      </h4>
    </div>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <span
          key={idx}
          className="px-3 py-1 bg-white dark:bg-[#242526] border border-gray-200 dark:border-gray-800 rounded shadow-sm text-[11px] text-gray-600 dark:text-gray-400 hover:border-yellow-500 transition-colors cursor-default"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

export default MenuLeft;
