/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chimp-tracker-images.s3.eu-west-3.amazonaws.com',
        port: '',
        pathname:"/"
      },
    ],
  },
}

module.exports = nextConfig
