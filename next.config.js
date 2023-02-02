/** @type {import('next').NextConfig} */
// wordpress-863910-2986415.cloudwaysapps.com
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cfuk.nu'
        // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
