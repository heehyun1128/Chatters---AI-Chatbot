// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  },
 
};
