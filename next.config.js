/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src']
  },
  typescript: {
    tsconfigPath: './tsconfig.json'
  }
}

module.exports = nextConfig 