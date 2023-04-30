const { withPlaiceholder } = require('@plaiceholder/next')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    appDir: true
  }
}

module.exports = withPlaiceholder(nextConfig)
