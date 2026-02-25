import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#080808] transition-colors duration-500">
      <div className="relative flex flex-col items-center">
        {/* Vòng tròn loading xoay quanh */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-2 border-yellow-500/20 border-t-yellow-500 rounded-full"
        />
        
        {/* Logo hoặc Chữ ở giữa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-yellow-500 font-serif italic text-xl">Q.</span>
        </motion.div>

        {/* Text Loading phía dưới */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col items-center space-y-2"
        >
          <span className="text-[14px] font-semibold dark:text-gray-400 text-gray-500">
            Fetching data
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                className="w-1 h-1 bg-yellow-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};

export default PageLoader;