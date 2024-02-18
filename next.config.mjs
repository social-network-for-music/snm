/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  env: {
    API: process.env.API
  },

  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "i.scdn.co",
      pathname: "/image/*",
      port: ""
    }]
  }
};

export default nextConfig;
