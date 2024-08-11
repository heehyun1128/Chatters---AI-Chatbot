"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SideNav from '@/components/SideNav';
import ChatComponent from '@/components/ChatComponent';
import Chat from '@/components/Chat';

const TestPage: React.FC = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const router = useRouter();

  const toggleSideNav = () => setIsSideNavOpen(!isSideNavOpen);

  const handleChatSubmit = () => {
    router.push('/chat');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex bg-gradient-to-br from-black to-green-900"
    >
      {/* SideNav */}
      <AnimatePresence>
        {isSideNavOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full z-10"
          >
            <SideNav />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content area */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex justify-center items-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-4xl p-8 ml-16 sm:ml-24 md:ml-32"
        >
          {/* Chat component */}
          <div className="rounded-3xl ">
            <ChatComponent />
            <Chat />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default TestPage;