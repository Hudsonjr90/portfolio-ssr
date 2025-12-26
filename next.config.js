/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Desabilita pre-rendering estático
  staticPageGenerationTimeout: 1000,
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig