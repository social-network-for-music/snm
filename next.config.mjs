/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  env: {
    API: process.env.API
  }
};

export default nextConfig;
