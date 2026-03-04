import { useEffect } from "react";
import { Offcanvas } from "../components/commons";
import { WorkPage } from "../pages";
import { EMAIL_SERVICE } from "../config/constant";
import { useSelector } from "react-redux";

const LayoutWork = () => {
  const { data } = useSelector((state) => state.user);
  useEffect(()=>{
      document.title = (data?.data_info?.name  || EMAIL_SERVICE) + ' Portfolio' ;
    },[data])
  return (
    <div>
      <Offcanvas></Offcanvas>
      <WorkPage />
    </div>
  );
};

export default LayoutWork;
