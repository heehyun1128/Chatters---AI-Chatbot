import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { UserButton, useClerk } from "@clerk/nextjs";
import  Link  from 'next/link';

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

  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-80 h-full bg-[#202020]/90 backdrop-filter backdrop-blur-lg shadow-2xl overflow-y-auto"
    >
      <div className="p-6 flex flex-col h-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-white text-3xl font-medium tracking-tighter">
            Conversations
          </h2>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-10 h-10"
              }
            }}
            afterSignOutUrl="/"
          />
        </motion.div>
        <ul className="space-y-3 mb-6 flex-grow">
          <AnimatePresence>
            {savedChats.map((chat) => (
              <motion.li
                key={chat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
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
                  transition={{ duration: 0.1 }}
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
      </div>
    </motion.div>
  );
};

export default SideNav;