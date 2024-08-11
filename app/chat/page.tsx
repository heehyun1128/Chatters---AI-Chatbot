"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Loader from "@/components/loader";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';

const Home = () => {
  const [chats, setChats] = useState<any[]>([]);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const postQuestion = async (userPrompt: string) => {
    try {
      setChats((prevChats) => [
        ...prevChats,
        { role: "user", content: userPrompt },
      ]);

      setUserPrompt("");
      setLoading(true);

      const response = await axios.post("http://127.0.0.1:5000/query", {userPrompt} );
      // const response = await axios.post("/api/chat", { userPrompt });
      console.log(response)
      // Extract the response data
      const responseData = response.data;
      
      // Update the state with the response
      setChats((prevChats) => [
        ...prevChats,
        { role: 'assistant', content: responseData.response }
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col justify-between gap-3 p-4 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-1/4 h-1/4 md:w-64 md:h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50" />
      <div className="absolute top-0 right-0 w-1/4 h-1/4 md:w-64 md:h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-50" />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/4 h-1/4 md:w-64 md:h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50" />

      <motion.div
        ref={chatContainerRef}
        className="relative z-10 flex-1 overflow-y-auto mb-4 p-4 md:p-6 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl shadow-lg"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="p-3 bg-white rounded-2xl shadow-sm mb-4 shadow-purple-300"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <strong>Chatters:</strong> How can I help you today?
        </motion.div>

        <AnimatePresence>
          {chats.map((chat, index) => (
            <motion.div
              key={index}
              className={`my-2 flex ${
                chat.role === "user" ? "justify-end" : "justify-start"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`p-3 rounded-2xl ${
                  chat.role === "user"
                    ? "bg-purple-500 text-white"
                    : "bg-white shadow-purple-300"
                } shadow-md max-w-[90%] break-words`}
              >
                <strong>{chat.role === "user" ? "You: " : "Chatters: "}</strong>{" "}
                {chat.role === "user" ? (
                  chat.content
                ) : (
                  <ReactMarkdown className="prose prose-sm max-w-none overflow-hidden">
                    {chat.content}
                  </ReactMarkdown>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-2"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Input
          placeholder="Type your message here..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="flex-1 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full px-4 py-2 sm:px-6 sm:py-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <Button
          onClick={() => postQuestion(userPrompt)}
          className="bg-purple-500 hover:bg-purple-600 text-white rounded-full px-4 py-2 sm:px-6 sm:py-3 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Send
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Home;