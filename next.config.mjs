/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "plus.unsplash.com"],
  },
  env: {
    API_URL: "https://razorpay-demo-server.onrender.com",
  },
};

export default nextConfig;
