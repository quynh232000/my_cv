import { useRoutes, useLocation } from "react-router-dom";
import Background from "./components/commons/Background";
import { LayoutHome } from "./layouts";
import ProjectDetailPage from "./pages/ProjectDetail";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import LayoutWork from "./layouts/LayoutWork";
import AppLayout from "./layouts/AppLayout";
import BlogPage from "./pages/blog/BlogPage";
import BlogDetailPage from "./pages/blog/BlogDetailPage";

function App() {
  const location = useLocation();

  // 1. Khởi tạo AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 50,
      once: true,
    });
  }, []);

  // 2. Tự động cuộn lên đầu trang & Refresh AOS khi đổi Route
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [location.pathname]);

  // 3. Quản lý Dark Mode
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark" || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.body.classList.add("dark");
    }
  }, []);

  const routes = [
    {
      path: "/",
      element: <LayoutHome />,
    },
    // GOM NHÓM ROUTE: Sử dụng AppLayout làm layout chung cho toàn bộ phần Project
    {
      path: "/project",
      element: <AppLayout />, 
      children: [
        {
          index: true, // Đây chính là đường dẫn /project
          element: <LayoutWork />,
        },
        {
          path: ":slug", // Đây là /project/:slug
          element: <ProjectDetailPage />,
        },
      ],
    },
     {
      path: "/blog",
      element: <AppLayout />, 
      children: [
        {
          index: true, // Đây chính là đường dẫn /project
          element: <BlogPage />,
        },
        {
          path: ":slug", // Đây là /project/:slug
          element: <BlogDetailPage />,
        },
      ],
    },
    {
      path: "*",
      element: <div className="flex h-screen items-center justify-center font-bold dark:text-white">404 - Page Not Found</div>,
    },
  ];

  const content = useRoutes(routes);

  return (
    <>
      {content}
      <Background />
    </>
  );
}

export default App;