import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchUsers } from "../store/userSlice";
import HomeFloatingButton from "../components/commons/HomeFloatingButton";

const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div className="min-h-screen  transition-colors duration-300">
      <Outlet />

      {/* Trang trí Background chung cho toàn App */}
      {/* <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div> */}
      <HomeFloatingButton/>
    </div>
  );
};

export default AppLayout;
