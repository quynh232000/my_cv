import { useEffect } from "react";
import { Offcanvas } from "../components/commons";
import MenuLeft from "../components/menuLeft";
import MenuRight from "../components/menuRight";
import { HomePage } from "../pages";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store/userSlice";
import { useSelector } from "react-redux";
import { EMAIL_SERVICE } from "../config/constant";
const LayoutHome = () => {
  const dispatch = useDispatch()
  const { data } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(()=>{
    document.title = (data?.data_info?.name  || EMAIL_SERVICE) + ' Portfolio' ;
  },[data])
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
