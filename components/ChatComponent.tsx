"use client"
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import axios from "axios";

const ChatComponent: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage = { role: 'user', content: input };
    setChatHistory(prev => [...prev, userMessage]);
    setInput('');

    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();

    const res=await axios.post("http://127.0.0.1:5000/query", {userPrompt:input} );
    const ragInput=res.data.response
    console.log(ragInput)
    console.log(input)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: ragInput, language: selectedLanguage }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error('Failed to fetch response');

      const data = await response.json();
      const aiMessage = { role: 'assistant', content: data.message };
      setChatHistory(prev => [...prev, aiMessage]);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request was aborted');
      } else {
        console.error('Error:', error);
        // Handle error (e.g., show error message to user)
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleNewConversation = useCallback(() => {
    // Cancel ongoing request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setChatHistory([]);
    setInput('');
    setIsLoading(false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#202020] rounded-3xl p-8 w-full h-screen max-h-[80vh] relative shadow-2xl flex flex-col justify-center"
    >
      <AnimatePresence>
        {chatHistory.length === 0 ? (
          <motion.div
            key="initial-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Custom AI Assistant logo */}
            <div className="w-12 h-12 mx-auto mb-10 flex items-center justify-center">
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-full h-full fill-[#51DA4C]"
                  initial={{ filter: "drop-shadow(0 0 0px #51DA4C)" }}
                  animate={{ filter: "drop-shadow(0 0 10px #51DA4C)" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6z" />
                </motion.svg>
              <motion.div
                initial={{ filter: "drop-shadow(0 0 0px #51DA4C)" }}
                animate={{ filter: "drop-shadow(0 0 15px #51DA4C)" }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 pointer-events-none"
              />
            </div>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="w-10 h-10 mb-4 fill-[#51DA4C]">
                  <path d="M180.4 203c-.7 22.7 10.6 32.7 10.9 39.1a8.2 8.2 0 0 1 -4.1 6.3l-12.8 9a10.7 10.7 0 0 1 -5.6 1.9c-.4 0-8.2 1.8-20.5-25.6a78.6 78.6 0 0 1 -62.6 29.5c-16.3 .9-60.4-9.2-58.1-56.2-1.6-38.3 34.1-62.1 70.9-60.1 7.1 0 21.6 .4 47 6.3v-15.6c2.7-26.5-14.7-47-44.8-43.9-2.4 0-19.4-.5-45.8 10.1-7.4 3.4-8.3 2.8-10.8 2.8-7.4 0-4.4-21.5-2.9-24.2 5.2-6.4 35.9-18.4 65.9-18.2a76.9 76.9 0 0 1 55.7 17.3 70.3 70.3 0 0 1 17.7 52.4l0 69.3zM94 235.4c32.4-.5 46.2-20 49.3-30.5 2.5-10.1 2.1-16.4 2.1-27.4-9.7-2.3-23.6-4.9-39.6-4.9-15.2-1.1-42.8 5.6-41.7 32.3-1.2 16.8 11.1 31.4 30 30.5zm170.9 23.1c-7.9 .7-11.5-4.9-12.7-10.4l-49.8-164.7c-1-2.8-1.6-5.7-1.9-8.6a4.6 4.6 0 0 1 3.9-5.3c.2 0-2.1 0 22.3 0 8.8-.9 11.6 6 12.6 10.4l35.7 140.8 33.2-140.8c.5-3.2 2.9-11.1 12.8-10.2h17.2c2.2-.2 11.1-.5 12.7 10.4l33.4 142.6L421 80.1c.5-2.2 2.7-11.4 12.7-10.4h19.7c.9-.1 6.2-.8 5.3 8.6-.4 1.9 3.4-10.7-52.8 169.9-1.2 5.5-4.8 11.1-12.7 10.4h-18.7c-10.9 1.2-12.5-9.7-12.7-10.8L328.7 110.7l-32.8 137c-.2 1.1-1.7 11.9-12.7 10.8h-18.3zm273.5 5.6c-5.9 0-33.9-.3-57.4-12.3a12.8 12.8 0 0 1 -7.8-11.9v-10.8c0-8.5 6.2-6.9 8.8-5.9 10 4.1 16.5 7.1 28.8 9.6 36.7 7.5 52.8-2.3 56.7-4.5 13.2-7.8 14.2-25.7 5.3-35-10.5-8.8-15.5-9.1-53.1-21-4.6-1.3-43.7-13.6-43.8-52.4-.6-28.2 25.1-56.2 69.5-56 12.7 0 46.4 4.1 55.6 15.6 1.4 2.1 2 4.6 1.9 7v10.1c0 4.4-1.6 6.7-4.9 6.7-7.7-.9-21.4-11.2-49.2-10.8-6.9-.4-39.9 .9-38.4 25-.4 19 26.6 26.1 29.7 26.9 36.5 11 48.7 12.8 63.1 29.6 17.1 22.3 7.9 48.3 4.4 55.4-19.1 37.5-68.4 34.4-69.3 34.4zm40.2 104.9c-70 51.7-171.7 79.3-258.5 79.3A469.1 469.1 0 0 1 2.8 327.5c-6.5-5.9-.8-14 7.2-9.5a637.4 637.4 0 0 0 316.9 84.1 630.2 630.2 0 0 0 241.6-49.6c11.8-5 21.8 7.8 10.1 16.4zm29.2-33.3c-9-11.5-59.3-5.4-81.8-2.7-6.8 .8-7.9-5.1-1.8-9.5 40.1-28.2 105.9-20.1 113.4-10.6 7.6 9.5-2.1 75.4-39.6 106.9-5.8 4.9-11.3 2.3-8.7-4.1 8.4-21.3 27.4-68.5 18.4-80z"/>
                </svg>
                <h2 className="text-white text-xl font-light mb-2 tracking-tighter">AWS Bedrock</h2>
                <p className="text-white text-sm font-extralight tracking-tighter">Powered by Amazon Bedrock API for advanced AI capabilities.</p>
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10l-8 4" />
                </svg>
                <h2 className="text-white text-xl font-light mb-2 tracking-tighter">Powered by Pinecone</h2>
                <p className="text-white text-sm font-extralight tracking-tighter">Utilizing RAG technology for enhanced responses.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="chat-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-grow overflow-auto mb-4 pr-4"
            ref={chatContainerRef}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#51DA4C #202020',
            }}
          >
            <style jsx global>{`
              ::-webkit-scrollbar {
                width: 8px;
              }
              ::-webkit-scrollbar-track {
                background: #202020;
              }
              ::-webkit-scrollbar-thumb {
                background-color: #51DA4C;
                border-radius: 20px;
                border: 3px solid #202020;
              }
            `}</style>
            {chatHistory.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}
              >
                <span className={`inline-block p-3 rounded-2xl shadow-lg ${message.role === 'user' ? 'bg-[#2C2C2F] text-white' : 'bg-[#51DA4C] text-[#2C2C2F]'} max-w-[80%] break-words`}>
                  {message.content}
                </span>
              </motion.div>
            ))}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-left mb-4"
                >
                  <span className="inline-block p-3 rounded-2xl shadow-lg bg-[#51DA4C] text-[#2C2C2F]">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      •••
                    </motion.span>
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center">
          <span className="text-white text-sm mr-2">Respond in:</span>
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
        </div>
        {chatHistory.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNewConversation}
            className="bg-[#2C2C2F] text-white rounded-xl px-4 py-2 flex items-center space-x-2 hover:bg-[#3C3C3F] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            <span>New Chat</span>
          </motion.button>
        )}
      </motion.div>
      <form onSubmit={handleSubmit} className="relative">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-white rounded-xl px-6 py-4 w-full text-[#2C2C2F] placeholder-[#8A8A8A] text-lg tracking-tighter focus:outline-none focus:ring-2 focus:ring-[#51DA4C] pr-16" 
          placeholder={
            selectedLanguage === 'en' ? "Ask me anything..." :
            selectedLanguage === 'es' ? "Pregúntame lo que quieras..." :
            selectedLanguage === 'zh' ? "问我任何问题..." :
            "Ask me anything..."
          }
        />
        <motion.button
          type="submit"
          disabled={isLoading}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#51DA4C] text-white rounded-xl px-3 py-2 hover:bg-[#51DA4C]/80 transition-colors"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ChatComponent;