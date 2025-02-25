/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'images.unsplash.com',
      'unsplash.com',
      'plus.unsplash.com'
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src']
  },
  typescript: {
    tsconfigPath: './tsconfig.json'
  }
}

module.exports = nextConfig 