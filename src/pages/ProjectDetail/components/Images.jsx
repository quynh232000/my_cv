import Slider from "react-slick";
import PropTypes from "prop-types";
const Images = ({ data }) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
  };
  return (
    <div className="w-[500px] lg:mb-10 mb-4 overflow-y-auto lg:shadow-xl rounded-md p-5 overflow-x-hidden md:w-5/12 ml-auto mr-auto ">
      <Slider {...settings} className="h-full ">
        {data?.images?.map((item, index) => (
          <div key={index} className="px-5 h-full ">
            <img
              alt="..."
              className="max-w-full w-full h-[500px]  object-contain   rounded-lg shadow-lg"
              src={item}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};
Images.propTypes = {
  data: PropTypes.object,
};
export default Images;
