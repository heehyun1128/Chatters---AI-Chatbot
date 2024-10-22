"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaGithub } from "react-icons/fa";

const GlassmorphicBackground = React.memo(() => (
  <div className="fixed inset-0 z-0">
    <div className="absolute inset-0 bg-[#010501] bg-opacity-50 backdrop-filter backdrop-blur-2xl" />
    <div className="absolute top-0 right-0 w-full h-full bg-green-600 rounded-full mix-blend-multiply filter blur-[150px] opacity-5" />
    <div className="absolute bottom-0 left-0 w-full h-full bg-green-700 rounded-full mix-blend-multiply filter blur-[150px] opacity-5" />
  </div>
));

const AISuperpowersPage: React.FC = () => {
  const headerAnimationProps = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
    }),
    []
  );

  const mainAnimationProps = useMemo(
    () => ({
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    }),
    []
  );

  const buttonHoverProps = useMemo(
    () => ({
      whileHover: {
        scale: 1.05,
        backgroundImage: "linear-gradient(to right, #2F855A, #38A169)",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    }),
    []
  );

  const buttonAnimationProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }),
    []
  );

  return (
    <div className="bg-[#010501] text-white font-sans min-h-screen overflow-hidden relative">
      <GlassmorphicBackground />

{/* Navigation Bar */}
      <header className="container mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <motion.div
          {...headerAnimationProps}
          className="text-green-400 text-2xl font-bold"
        >
          ChatterAI
        </motion.div>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </header>

{/* Hero Heading */}
      <main className="container mx-auto px-6 py-16 text-center relative z-10">
        <motion.h1
          {...mainAnimationProps}
          className="text-7xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-200"
        >
          AI-Powered Chat Assistant
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-green-100 text-xl mt-6"
        >
          Elevate Your Conversations with AWS Bedrock and Pinecone-Enhanced AI
        </motion.p>

{/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 flex justify-center space-x-4"
        >
          <SignedIn>
            <Link href="/chat" passHref>
              <motion.button
                className="bg-gradient-to-r from-green-600 to-green-400 text-white font-bold py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg backdrop-filter backdrop-blur-3xl"
                {...buttonHoverProps}
                {...buttonAnimationProps}
                whileHover={{
                  boxShadow: '0 0 25px rgba(0, 255, 0, 0.5)',
                }}
              >
                Resume Chatting
              </motion.button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" passHref>
              <motion.button
                className="bg-gradient-to-r from-green-600 to-green-400 text-white font-bold py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg backdrop-filter backdrop-blur-3xl"
                {...buttonHoverProps}
                {...buttonAnimationProps}
                whileHover={{
                  boxShadow: '0 0 25px rgba(0, 255, 0, 0.5)',
                }}
              >
                Sign in to Start Chatting
              </motion.button>
            </Link>
          </SignedOut>

          <Link href="https://github.com/heehyun1128/Chatters" passHref>
            <motion.button
              className="bg-[#24292e] text-white font-light py-3 px-8 rounded-[0.50rem] text-lg transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 backdrop-filter backdrop-blur-3xl"
              {...buttonAnimationProps}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(255, 255, 255, 0.5)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub className="text-xl" />
              <span>View repository</span>
            </motion.button>
          </Link>
        </motion.div>

{/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-20 p-2 bg-green-400 bg-opacity-10 rounded-3xl shadow-6xl relative overflow-hidden backdrop-filter backdrop-blur-3xl"
          style={{
            boxShadow: "0 0 50px 2px rgba(0, 255, 0, 0.2)",
          }}
        >
          <div className="absolute inset-0 bg-green-500 opacity-30 filter blur-3xl"></div>
          <Image
            src="/images/hero.png"
            alt="AI-Powered Chat Assistant"
            width={1200}
            height={600}
            layout="responsive"
            objectFit="cover"
            className="rounded-2xl relative z-10"
            priority
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-green-200 text-lg mt-6"
        >
          Harnessing the power of AWS Bedrock for advanced language processing
          and Pinecone for efficient information retrieval.
        </motion.p>
      </main>
    </div>
  );
};

export default React.memo(AISuperpowersPage);