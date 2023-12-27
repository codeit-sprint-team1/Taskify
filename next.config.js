/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.utoimage.com',
      },
      {
        protocol: 'https',
        hostname: 'www.simplilearn.com',
      },
    ],
  },
};

module.exports = nextConfig;
