"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ChatComponent from "@/components/ChatComponent";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import SideNav from "@/components/SideNav";

const ChatPage: React.FC = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex bg-gradient-to-br from-black to-green-900"
    >
      <SideNav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex justify-center items-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="w-full max-w-4xl p-8"
        >
          <ChatComponent />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ChatPage;