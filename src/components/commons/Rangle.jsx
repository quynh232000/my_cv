import PropTypes from "prop-types";
const Rangle = ({ title ,content}) => {
  return (
    <div className="mt-5 ">
      <div className="flex text-sm dark:text-white justify-between">
        <p>{title}</p>
      </div>
      <div className=" dark:text-white text-gray-500 mt-2 rounded-full   w-full">
      {content}
      </div>
    </div>
  );
};
Rangle.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};
export default Rangle;
