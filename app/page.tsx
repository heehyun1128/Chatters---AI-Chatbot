"use client";

import Link from "next/link";
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative z-10 overflow-hidden bg-[#202020] min-h-screen flex items-center justify-center"
    >
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="flex justify-center">
          <div className="w-full max-w-[800px]">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-5 text-3xl font-bold leading-tight text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
                Chatter AI
              </h1>
              <p className="mb-12 text-base !leading-relaxed text-[#ffffff] sm:text-lg md:text-xl lg:text-2xl">
                Discover the power of AI-driven conversations. Wonderchat is your personal AI chatbot, ready to engage in intelligent, informative, and captivating dialogues on any topic.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link
                  href="/chat"
                  className="rounded-full bg-[#51DA4C] px-8 py-4 text-base font-semibold text-[#202020] duration-300 ease-in-out hover:bg-[#51DA4C]/80 w-full sm:w-auto"
                >
                  Sign In
                </Link>
                <Link
                  href="https://github.com/yourusername/wonderchat"
                  className="inline-block rounded-full bg-[#ffffff] px-8 py-4 text-base font-semibold text-[#202020] duration-300 ease-in-out hover:bg-[#ffffff]/90 w-full sm:w-auto"
                >
                  View on GitHub
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 450 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle
            cx="277"
            cy="63"
            r="225"
            fill="url(#paint0_linear_25:217)"
          />
          <circle
            cx="17.9997"
            cy="182"
            r="18"
            fill="url(#paint1_radial_25:217)"
          />
          <circle
            cx="76.9997"
            cy="288"
            r="34"
            fill="url(#paint2_radial_25:217)"
          />
          <circle
            cx="325.486"
            cy="302.87"
            r="180"
            transform="rotate(-37.6852 325.486 302.87)"
            fill="url(#paint3_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="184.521"
            cy="315.521"
            r="132.862"
            transform="rotate(114.874 184.521 315.521)"
            stroke="url(#paint4_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="356"
            cy="290"
            r="179.5"
            transform="rotate(-30 356 290)"
            stroke="url(#paint5_linear_25:217)"
          />
          <circle
            opacity="0.8"
            cx="191.659"
            cy="302.659"
            r="133.362"
            transform="rotate(133.319 191.659 302.659)"
            fill="url(#paint6_linear_25:217)"
          />
          <defs>
            <linearGradient id="paint0_linear_25:217" x1="277" y1="-162" x2="277" y2="288" gradientUnits="userSpaceOnUse">
              <stop stopColor="#51DA4C" />
              <stop offset="1" stopColor="#424242" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="paint1_radial_25:217" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.9997 182) rotate(90) scale(18)">
              <stop stopColor="#51DA4C" />
              <stop offset="1" stopColor="#51DA4C" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="paint2_radial_25:217" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(76.9997 288) rotate(90) scale(34)">
              <stop stopColor="#424242" />
              <stop offset="1" stopColor="#424242" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="paint3_linear_25:217" x1="325.486" y1="122.87" x2="325.486" y2="482.87" gradientUnits="userSpaceOnUse">
              <stop stopColor="#51DA4C" />
              <stop offset="1" stopColor="#51DA4C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint4_linear_25:217" x1="184.521" y1="182.659" x2="184.521" y2="448.383" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint5_linear_25:217" x1="356" y1="110.5" x2="356" y2="469.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#51DA4C" />
              <stop offset="1" stopColor="#51DA4C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint6_linear_25:217" x1="191.659" y1="169.297" x2="191.659" y2="435.021" gradientUnits="userSpaceOnUse">
              <stop stopColor="#424242" />
              <stop offset="1" stopColor="#424242" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 364 201"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
            stroke="url(#paint0_linear_25:218)"
          />
          <path
            d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
            stroke="url(#paint1_linear_25:218)"
          />
          <path
            d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
            stroke="url(#paint2_linear_25:218)"
          />
          <path
            d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
            stroke="url(#paint3_linear_25:218)"
          />
          <circle
            opacity="0.8"
            cx="214.505"
            cy="60.5054"
            r="49.7205"
            transform="rotate(-13.421 214.505 60.5054)"
            stroke="url(#paint4_linear_25:218)"
          />
          <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)" />
          <defs>
            <linearGradient
              id="paint0_linear_25:218"
              x1="184.389"
              y1="69.2405"
              x2="184.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#51DA4C" stopOpacity="0" />
              <stop offset="1" stopColor="#51DA4C" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_25:218"
              x1="156.389"
              y1="69.2405"
              x2="156.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#51DA4C" stopOpacity="0" />
              <stop offset="1" stopColor="#51DA4C" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_25:218"
              x1="125.389"
              y1="69.2405"
              x2="125.389"
              y2="212.24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#51DA4C" stopOpacity="0" />
              <stop offset="1" stopColor="#51DA4C" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_25:218"
              x1="93.8507"
              y1="67.2674"
              x2="89.9278"
              y2="210.214"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#51DA4C" stopOpacity="0" />
              <stop offset="1" stopColor="#51DA4C" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_25:218"
              x1="214.505"
              y1="10.2849"
              x2="212.684"
              y2="99.5816"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#424242" />
              <stop offset="1" stopColor="#424242" stopOpacity="0" />
            </linearGradient>
            <radialGradient
              id="paint5_radial_25:218"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(220 63) rotate(90) scale(43)"
            >
              <stop offset="0.145833" stopColor="#51DA4C" stopOpacity="0" />
              <stop offset="1" stopColor="#51DA4C" stopOpacity="0.08" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
