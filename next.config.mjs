/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "plus.unsplash.com"],
  },
  env: {
    API_URL: "http://localhost:8080",
  },
};

export default nextConfig;
