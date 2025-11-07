/** @type {import('next').NextConfig} */
const nextConfig = {
  // Les Server Actions sont maintenant activées par défaut dans Next.js 14
  images: {
    domains: [
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
