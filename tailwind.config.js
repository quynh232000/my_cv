/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        // 'background-custom': '#f0f0f6', // Thay đổi mã màu tùy chỉnh ở đây
        'background-custom': '#8037f1', // Thay đổi mã màu tùy chỉnh ở đây
        'bg-yellow-500':'#8037f1'
      },
    },
  },
  plugins: [],
}