import { useEffect } from "react";
import { Offcanvas } from "../components/commons";
import MenuLeft from "../components/menuLeft";
import MenuRight from "../components/menuRight";
import { HomePage } from "../pages";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store/userSlice";

const LayoutHome = () => {
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className=" min-h-screen overflow-x-hidden  lg:px-10 px-5 ">
      {/* setting and menu left */}
      <Offcanvas></Offcanvas>
      <div className="">
        <div className="">
          <MenuLeft></MenuLeft>
        </div>
        <div className="lg:ml-[300px] lg:mr-[130px] mb-4">
          <HomePage></HomePage>
        </div> 
        <div className="">
          <MenuRight></MenuRight>
        </div>
      </div>
    </div>
  );
};

export default LayoutHome;
