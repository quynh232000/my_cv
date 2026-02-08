import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../../../components/slick";
import { images } from "../../../assets/data/images";
const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="lg:mt-20 pt-10">
      <div className="flex justify-center dark:text-white mb-10 items-center">
        <div className="xl:w-1/2 ">
          <h2
            id="education"
            className="text-center text-3xl font-semibold mb-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Social Life
          </h2>
          <p
            className="text-gray-500 text-center text-sm"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            About my life
          </p>
        </div>
      </div>
      {images.length > 0 && (
        <Slider {...settings}>
          {images.map((item, index) => (
            <div key={index} data-aos="fade-up" className="p-5">
              <figure className="rounded-2xl bg-white dark:bg-[#1e2329] dark:text-white p-6 shadow-lg ring-1 ring-gray-900/5">
                {item.type == "image" ? (
                  <img
                    className="h-[315px] w-full object-contain"
                    src={item.link}
                    alt=""
                  />
                ) : (
                  <iframe
                    width="100%"
                    height="315"
                    src={item.link}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                )}
              </figure>
              {/* More testimonials... */}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Testimonial;
