import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import { ImHere3 } from "../components/ui/ImHere3";
import { FaWhatsapp, FaEnvelope, FaRegClock, FaGithub, FaLinkedinIn } from 'react-icons/fa6'; // ← Import ini

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setIsSubmitted(true);
      formRef.current.reset();
    } catch (error: any) {
      console.error('FAILED...', error);
      alert(`Gagal kirim: ${error.text || error.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="overflow-y-auto">
      <div className="w-full py-10">
        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

          {/* Kolom Kiri: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-left text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
              Contact <span className="text-blue-600">Me</span>
            </h2>
            <p className="text-left text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              I'm currently open to <strong>remote frontend positions</strong>.
              Despite the timezone difference, I ensure seamless collaboration with flexible
              overlapping hours.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <FaEnvelope className="w-5 h-5" />
                </div>
                <span>wasonoj@gmail.com</span>
              </div>

              {/* Jam */}
              <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <FaRegClock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-left">Jakarta, Indonesia</p>
                  <p className="text-sm opacity-70">UTC+7 (Open to Sync Hours)</p>
                </div>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/6289666184844"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-slate-700 dark:text-slate-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                  <FaWhatsapp className="w-5 h-5" />
                </div>
                <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  +62 896-6618-4844
                </span>
              </a>

              <div className="flex items-center gap-4">
                <a href="https://github.com/username" target="_blank" className="w-10 h-10 rounded-full bg-slate-50 dark:bg-gray-700/30 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-900 hover:text-white transition-colors">
                  <FaGithub className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/username" target="_blank" className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-colors">
                  <FaLinkedinIn className="w-5 h-5" />
                </a>
              </div>

              <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
                <ImHere3 />
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan: Form - sama kayak sebelumnya */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-2xl"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-slate-300">Full Name</label>
                    <input
                      type="text"
                      name="user_name"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-blue-500 focus:ring-0 transition-all outline-none"
                      placeholder="Joko Wasono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-slate-300">Email Address</label>
                    <input
                      type="email"
                      name="user_email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-blue-500 focus:ring-0 transition-all outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-slate-300">Message</label>
                    <textarea
                      rows={4}
                      name="message"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border-transparent focus:border-blue-500 focus:ring-0 transition-all outline-none resize-none"
                      placeholder="Write your message"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending...' : 'Submit'}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-slate-600 dark:text-slate-400">I'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-6 text-sm text-blue-600 hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;