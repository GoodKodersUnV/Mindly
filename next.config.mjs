/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "tinyppt.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "cdn0.iconfinder.com",
      },
      {
        protocol: "https",
        hostname: "png.pngtree.com",
      },
      {
        protocol: "https",
        hostname: "lordicon.com",
      },
      {
        protocol: "https",
        hostname: "images.rawpixel.com",
      },
      {
        protocol: "https",
        hostname: "my-blob-store.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
