import Footer from "../../components/footer";
import { About, Education, Testimonial, Work } from "./components";
import { Element } from "react-scroll";
const HomePage = () => {
  return (
    <div>
      {/* my infomation home  */}
      <Element
        name="home"
        id="home"
        className="bg-white   shadow-lg dark:bg-[#1e2329] rounded-b-lg px-10 pt-10 relative"
      >
        <About />
      </Element>
      {/* quotes */}
      {/* <Quotes /> */}
      {/* Work  */}
      <Element name="work" className="pb-0 pt-10">
        <Work />
      </Element>
      {/* education */}
      <Element name="testimonials">
        <Testimonial />
      </Element>
      <Element className="py-10 " name="education">
        <Education />
      </Element>
      {/* Testimonial */}
      
      {/* <Element name="reviews">
        <Review />
      </Element> */}
      <Footer/>
    </div>
  );
};

export default HomePage;
