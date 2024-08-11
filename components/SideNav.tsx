import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Chat {
  id: number;
  title: string;
}

const SideNav: React.FC = () => {
  const [savedChats, setSavedChats] = useState<Chat[]>([
    { id: 1, title: 'How do React hooks work?' },
    { id: 2, title: 'Explain the concept of AGI' },
    { id: 3, title: 'Steps to plan a software project' },
  ]);

  const removeChat = (id: number) => {
    setSavedChats(savedChats.filter(chat => chat.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-4 w-80 bg-[#202020]/90 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl overflow-y-auto max-h-[calc(100vh-2rem)]"
    >
      <div className="p-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white text-3xl font-medium mb-6 tracking-tighter"
        >
          Conversations
        </motion.h2>
        <ul className="space-y-3 mb-6">
          <AnimatePresence>
            {savedChats.map((chat) => (
              <motion.li
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-[#2C2C2F] p-3 rounded-xl flex items-center justify-between cursor-pointer hover:bg-[#3C3C3F] transition-colors relative"
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#51DA4C" className="w-4 h-4 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  <h3 className="text-white text-sm font-light tracking-tighter truncate max-w-[180px]">{chat.title}</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white hover:text-[#51DA4C] transition-colors"
                  onClick={() => removeChat(chat.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-[#51DA4C] text-white rounded-xl px-4 py-2 hover:bg-[#51DA4C]/80 transition-colors text-sm font-medium tracking-tighter"
        >
          Sign Out
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SideNav;
