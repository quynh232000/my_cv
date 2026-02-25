import Footer from "../../components/footer";
import {
  About,
  Education,
  // Quotes,
  Work,   // Projects
} from "./components";
import { Element } from "react-scroll";
import Contact from "./components/Contact";
import Awards from "./components/Awards";
import WorkExperience from "./components/WorkExperience";
import Reviews from "./components/Reviews";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 py-5 lg:gap-20 px-6">
      {/* 1. GIỚI THIỆU CHUNG */}
      <Element name="home" id="home">
        <About />
      </Element>

      {/* 3. KINH NGHIỆM LÀM VIỆC (Mới) */}
      <Element name="experience" id="experience">
        <WorkExperience />
      </Element>

      {/* 4. DỰ ÁN TIÊU BIỂU */}
      <Element name="work" id="project">
        <Work />
      </Element>

      {/* 5. HỌC VẤN */}
      <Element id="education" name="education">
        <Education />
      </Element>

      {/* 6. GIẢI THƯỞNG (Mới) */}
      <Element name="awards" id="awards">
        <Awards />
      </Element>

      {/* 7. ĐÁNH GIÁ TỪ ĐỒNG NGHIỆP/KHÁCH HÀNG */}
      <Element name="reviews" id="reviews">
        <Reviews />
      </Element>

      {/* 8. LIÊN HỆ (Mới) */}
      <Element name="contact" id="contact">
        <Contact />
      </Element>

      <Footer />
    </div>
  );
};

export default HomePage;