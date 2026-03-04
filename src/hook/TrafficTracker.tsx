import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { sendTracking } from '../services/appService';

export function TrafficTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef<string | null>(null);
  const isHttps = window.location.protocol === 'https:';
      
  if ( !isHttps) return; 
  useEffect(() => {
    const currentPath = location.pathname;

    // 1. Kiểm tra trong SessionStorage xem trang này vừa mới được gửi chưa
    // Điều này chặn spam kể cả khi người dùng F5 liên tục
    const lastSessionPath = sessionStorage.getItem('last_tracked_path');

    if (currentPath === lastSessionPath) {
      // Nếu F5 mà vẫn ở trang cũ, ta cập nhật ref để đồng bộ nhưng không gửi API
      lastTrackedPath.current = currentPath;
      return;
    }

    // 2. Chặn spam nếu chuyển trang quá nhanh (Logic cũ)
    if (currentPath === lastTrackedPath.current) return;

    const timer = setTimeout(() => {
      // 3. Gửi tracking
      // console.log("🚀 Gửi tracking thực tế:", currentPath);
      
      sendTracking({
        tracking: {
          pathname: window.location.href,
        },
        type: "tracking"
      });

      // 4. Lưu vào cả Ref (để chặn khi chuyển trang nội bộ) 
      // và SessionStorage (để chặn khi F5)
      lastTrackedPath.current = currentPath;
      sessionStorage.setItem('last_tracked_path', currentPath);
      
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}