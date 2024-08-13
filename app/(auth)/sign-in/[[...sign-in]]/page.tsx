"use client";
import { SignIn } from "@clerk/nextjs";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const DarkGreenGradientBackground = React.memo(() => (
  <div className="fixed inset-0 z-0 bg-gradient-to-br bg-[#020c02]" />
));

export default function Page() {
  return (
    <div className="bg-[#010501] text-white font-sans min-h-screen overflow-hidden relative">
      <DarkGreenGradientBackground />
      <div className="container mx-auto px-6 py-16 relative z-10 flex flex-col justify-center items-center min-h-screen">
        <div className="w-full max-w-md">
          <motion.div
            whileHover={{ x: -5 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="flex items-center text-green-400 hover:text-green-300 transition-colors mb-4">
              Back to Home
            </Link>
          </motion.div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}