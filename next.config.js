   
   
   /** @type {import('next').NextConfig} */
    const nextConfig = {
        images: {
            domains: ['i.pravatar.cc', "static.wikia.nocookie.net"],
          },
          env: {
            BACKEND: "https://chatcord-xp6j.onrender.com/",
            // BACKEND: "http://192.168.31.12:5000",
          }
    }

    module.exports = nextConfig
