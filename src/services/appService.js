import axios from "axios";
import { BASE_API_URL, EMAIL_SERVICE } from "../config/constant";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

// export api để sau này gắn token, interceptor
export default api;

export const getDataPortfolio = async () => {
  const res = await api.post("/data", {
    email: EMAIL_SERVICE,
  });

  return res.data;
};


export const sendContactMessage = async (formData) => {
  const res = await api.post("/contact", {
    ...formData,
    email_contact: EMAIL_SERVICE, // Gửi kèm email để xác định người nhận
  });
  return res.data;
};
export const getBlogs = async () => {
  const res = await api.post("/blogs", {
    email: EMAIL_SERVICE,
  });
  return res.data;
}
export const getBlogDetail = async (slug) => {
  const res = await api.post("/blog-detail/"+slug, {
    email: EMAIL_SERVICE,
  });
  return res.data;
}
