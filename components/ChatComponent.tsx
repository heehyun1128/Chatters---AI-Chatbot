"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';

const ChatComponent: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#202020] rounded-3xl p-8 max-w-[800px] w-full relative shadow-2xl"
    >
      {/* Placeholder for company logo */}
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center"
      >
        <span className="text-gray-600">Logo</span>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-white text-5xl font-medium text-center mb-6 tracking-tighter">How can I help you today?</h1>
        <p className="text-[#8A8A8A] text-center text-base mb-8 leading-relaxed tracking-tighter">
          Powered by advanced AI, I understand context and provide accurate, tailored responses.
          Ask me anything - from information to friendly conversation, I'm here to help.
        </p>
      </motion.div>
      <motion.hr
        initial={{ width: 0 }}
        animate={{ width: '75%' }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="border-[#51DA4C] mx-auto mb-8"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#2C2C2F] p-6 rounded-xl flex flex-col items-center text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#51DA4C" className="w-10 h-10 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
          <h2 className="text-white text-xl font-light mb-2 tracking-tighter">Chat History</h2>
          <p className="text-white text-sm font-extralight tracking-tighter">View and continue your previous conversations.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#2C2C2F] p-6 rounded-xl flex flex-col items-center text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#51DA4C" className="w-10 h-10 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
          </svg>
          <h2 className="text-white text-xl font-light mb-2 tracking-tighter">Language Options</h2>
          <p className="text-white text-sm font-extralight tracking-tighter">Choose your preferred language for our conversation.</p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#2C2C2F] p-6 rounded-xl flex flex-col items-center text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#51DA4C" className="w-10 h-10 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h2 className="text-white text-xl font-light mb-2 tracking-tighter">Powered by Pinecone</h2>
          <p className="text-white text-sm font-extralight tracking-tighter">Utilizing RAG technology for enhanced responses.</p>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex items-center space-x-4 mb-4"
      >
        <div className="relative">
          <select 
            className="appearance-none bg-transparent text-white text-sm pr-8 py-2 focus:outline-none cursor-pointer"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="en" className="bg-[#2C2C2F] text-white">English</option>
            <option value="es" className="bg-[#2C2C2F] text-white">Español</option>
            <option value="zh" className="bg-[#2C2C2F] text-white">中文</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-white">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative"
      >
        <input 
          type="text" 
          className="bg-white rounded-xl px-6 py-4 w-full text-[#2C2C2F] placeholder-[#8A8A8A] text-lg tracking-tighter focus:outline-none focus:ring-2 focus:ring-[#51DA4C]" 
          placeholder="Ask me anything..." 
        />
        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#51DA4C] text-white rounded-xl px-4 py-3 hover:bg-[#51DA4C]/80 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ChatComponent;