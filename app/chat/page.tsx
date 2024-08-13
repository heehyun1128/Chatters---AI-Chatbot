"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ChatComponent from "@/components/ChatComponent";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useEffect } from "react";

const TestPage: React.FC = () => {
  const router = useRouter();

 

  const handleChatSubmit = () => {
    router.push("/chat");
  };

  return (
    <>
      <SignedIn>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex bg-gradient-to-br from-black to-green-900"
        >
          {/* Main content area */}
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex-1 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-full max-w-4xl p-8"
            >
              {/* Chat component */}
              <div className="rounded-3xl">
                <ChatComponent />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </SignedIn>
     
      
   
    </>
  );
};

export default TestPage;
