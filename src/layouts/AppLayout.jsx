import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchUsers } from "../store/userSlice";
import HomeFloatingButton from "../components/commons/HomeFloatingButton";
import SEO from "../components/commons/SEO";

const AppLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    
  }, [dispatch]);

  return (
    <div className="min-h-screen  transition-colors duration-300">
      <SEO
        title="Journal & Insights | Chia sẻ kiến thức lập trình & Design"
        description="Blog cá nhân của Nguyen Van Quynh - Nơi chia sẻ kiến thức về ReactJS, tư duy lập trình hiện đại và hướng dẫn làm đồ án tốt nghiệp FPT Polytechnic chi tiết."
        // LƯU Ý: Sử dụng URL tuyệt đối cho ảnh để Facebook/Zalo có thể đọc được
        image={`data:image/png;base64,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`}
        url={window.location.origin + "/blog"}
        author="Nguyen Van Quynh"
      />
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
