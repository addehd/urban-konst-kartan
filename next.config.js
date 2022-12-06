/** @type {import('next').NextConfig} */
// wordpress-863910-2986415.cloudwaysapps.com
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wordpress-863910-2986415.cloudwaysapps.com'
        // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
