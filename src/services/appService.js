import axios from "axios";
import { BASE_API_URL, EMAIL_SERVICE } from "../config/constant";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

// export api để sau này gắn token, interceptor
export default api;

// CACHING: Lưu trữ dữ liệu portfolio vào localStorage để tránh gọi API nhiều lần
const DEFAULT_TTL = 7 * 24 * 60 * 60 * 1000; // 7 ngày tính bằng ms

/**
 * @param {string} key - Tên định danh duy nhất cho cache (ví dụ: 'portfolio_data')
 * @param {Function} apiCall - Hàm callback thực hiện việc gọi API
 * @param {number} ttl - Thời gian sống của cache (ms)
 */
export const withCache = async (key, apiCall, ttl = DEFAULT_TTL) => {
  const now = new Date().getTime();

  // 1. Kiểm tra cache
  const cached = localStorage.getItem(key);
  if (cached) {
    const item = JSON.parse(cached);
    if (now < item.expiry) {
      // console.log(`%c Cache hit: ${key}`, "color: #00ff00");
      return item.value;
    }
    localStorage.removeItem(key);
  }

  // 2. Gọi API nếu không có cache hoặc hết hạn
  // console.log(`%c Cache miss/expired: ${key}. Fetching new data...`, "color: #ff9900");
  const data = await apiCall();

  // 3. Lưu vào cache
  const dataToCache = {
    value: data,
    expiry: now + ttl,
  };
  localStorage.setItem(key, JSON.stringify(dataToCache));

  return data;
};

export const getDataPortfolio = async () => {
  return await withCache("portfolio_data", async () => {
    const res = await api.post("/data", { email: EMAIL_SERVICE });
    return res.data;
  });
};

export const sendContactMessage = async (formData) => {
  const res = await api.post("/contact", {
    ...formData,
    email_contact: EMAIL_SERVICE, // Gửi kèm email để xác định người nhận
  });
  return res.data;
};
export const getBlogs = async () => {
  return await withCache("blogs", async () => {
    const res = await api.post("/blogs", {
      email: EMAIL_SERVICE,
    });
    return res.data;
  });
};
export const getBlogDetail = async (slug) => {
  const res = await api.post("/blog-detail/" + slug, {
    email: EMAIL_SERVICE,
  });
  return res.data;
};
