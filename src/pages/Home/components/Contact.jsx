/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Globe, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { sendContactMessage } from '../../../services/appService';

function Contact() {
  const { data } = useSelector((state) => state.user);
  const info = data?.data_info || {};
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactDetails = [
    { icon: <Mail size={18} />, label: 'Email', value: info.email, color: 'text-blue-500', glow: 'shadow-blue-500/20' },
    { icon: <Phone size={18} />, label: 'Phone', value: info.phone, color: 'text-green-500', glow: 'shadow-green-500/20' },
    { icon: <Globe size={18} />, label: 'Website', value: info.website || 'quynhnv.site', color: 'text-purple-500', glow: 'shadow-purple-500/20' },
    { icon: <MapPin size={18} />, label: 'Address', value: info.location, color: 'text-red-500', glow: 'shadow-red-500/20' },
  ];

  const handleSubmit = (e) => {
    // Nếu dùng FormSubmit thực tế, hãy để form tự submit lên action URL
    // Ở đây mình demo hiệu ứng success
    e.preventDefault();
    // get data
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email= formData.get('email');
    const message = formData.get('message');
    sendContactMessage({ name, email, content: message })
      .then((res) => {
        if (res.status) {
          setIsSubmitted(true);
          setTimeout(() => setIsSubmitted(false), 6000);
        }else{
          alert('Failed to send message. Please try again later.');
        }
      })
      .catch(() => {
        alert('Failed to send message. Please try again later.');
      });
  };

  return (
    <section className="py-24 relative bg-transparent overflow-hidden">
      {/* Background Decor - Các đốm sáng mờ ảo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <span className="w-12 h-[1px] bg-yellow-500/50"></span>
            <span className="text-yellow-500 font-black uppercase tracking-[0.5em] text-[11px]">Get in Touch</span>
            <span className="w-12 h-[1px] bg-yellow-500/50"></span>
          </motion.div>
          <h2 className="text-6xl lg:text-8xl font-black dark:text-white uppercase tracking-tighter leading-none">
            Let's <span className="text-yellow-500 text-outline-yellow">Connect</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch">
          
          {/* LEFT: CONTACT FORM */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="h-full bg-white dark:bg-[#0f1115]/60 backdrop-blur-xl p-8 lg:p-14 rounded-[3.5rem] border border-gray-100 dark:border-white/5 shadow-2xl relative">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-8 flex flex-col h-full"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1 transition-colors group-focus-within:text-yellow-500">Full Name</label>
                        <input name="name" type="text" required placeholder="Nguyen Van A" className="input-style" />
                      </div>
                      <div className="group space-y-3">
                        <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1 transition-colors group-focus-within:text-yellow-500">Email Address</label>
                        <input name="email" type="email" required placeholder="example@mail.com" className="input-style" />
                      </div>
                    </div>

                    <div className="group space-y-3">
                      <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-1 transition-colors group-focus-within:text-yellow-500">Message</label>
                      <textarea name="message" rows="5" required placeholder="Write your message here..." className="input-style resize-none"></textarea>
                    </div>

                   <div className='w-100 flex-1  flex justify-center '>
                     <button type="submit" className="relative overflow-hidden h-fit group/btn flex items-center justify-center gap-3 w-full md:w-auto px-12 py-4 rounded-full bg-yellow-500 text-black font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-yellow-400 transition-all duration-300">
                      <span className="relative z-10 text-white">Send Message</span>
                      <Send size={16} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-shimmer transition-transform" />
                    </button>
                   </div>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                      <CheckCircle2 size={48} />
                    </div>
                    <h4 className="text-3xl font-black dark:text-white mb-4">Awesome!</h4>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm text-lg leading-relaxed">
                      Your message has been received. I'll get back to you shortly.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-10 text-yellow-500 font-black uppercase text-[10px] tracking-widest hover:text-yellow-400 transition-colors underline underline-offset-8"
                    >
                      Send New Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* RIGHT: INFO BOXES */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              {contactDetails.map((item, index) => (
                <div 
                  key={index}
                  className="group flex items-center gap-5 p-5 bg-white dark:bg-[#0f1115]/40 backdrop-blur-md border border-gray-100 dark:border-white/5 rounded-[2rem] hover:border-yellow-500/30 hover:translate-x-2 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center ${item.color} shadow-inner transition-colors duration-500 group-hover:bg-yellow-500 group-hover:text-black`}>
                    {item.icon}
                  </div>
                  <div className="flex-grow">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{item.label}</p>
                    <p className="text-gray-900 dark:text-gray-200 font-bold text-sm truncate">
                      {item.value || 'N/A'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Quote Card */}
            <div className="relative group p-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-[3rem] overflow-hidden shadow-2xl shadow-yellow-500/20">
               <div className="relative z-10">
                  <h4 className="text-3xl font-black uppercase text-white mb-4 leading-none tracking-tighter">Ready to Work?</h4>
                  <p className="text-white font-bold text-sm leading-relaxed italic border-l-4 border-black/20 pl-4">
                    "I am always ready to take on new challenges and turn your
                    innovative ideas into high-quality digital products."
                  </p>
               </div>
               
               {/* Background Decorative Element */}
               <div className="absolute -bottom-6 -right-6 text-[120px] text-black/10 font-black italic select-none rotate-[-15deg] group-hover:rotate-0 transition-transform duration-700">
                 QUIN
               </div>
            </div>
          </motion.div>

        </div>
      </div>

      <style>{`
        .text-outline-yellow {
          -webkit-text-stroke: 1.5px #eab308;
          color: transparent;
        }
        .input-style {
          width: 100%;
          background: rgba(249, 250, 251, 1);
          border: 1px solid rgba(229, 231, 235, 1);
          border-radius: 1.25rem;
          padding: 1.25rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: #111827;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        :global(.dark) .input-style {
          background: rgba(255, 255, 255, 0.02);
          border-color: rgba(255, 255, 255, 0.05);
          color: white;
        }
        .input-style:focus {
          outline: none;
          border-color: #eab308;
          background: white;
          box-shadow: 0 10px 30px -10px rgba(234, 179, 8, 0.1);
        }
        :global(.dark) .input-style:focus {
          background: rgba(255, 255, 255, 0.04);
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </section>
  );
}

export default Contact;