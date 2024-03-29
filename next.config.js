/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.pravatar.cc",
      "static.wikia.nocookie.net",
      "res.cloudinary.com",
      "cdn.pixabay.com",
    ],
  },
  env: {
    BACKEND: "https://chatcord-c9of.onrender.com/",
    // BACKEND: "http://192.168.31.12:5000/"
  },
};

module.exports = nextConfig;
