/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    appDir: true
  },
  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/posts/:slug*',
        permanent: true
      },
      {
        source: '/pages/:slug*',
        destination: '/:slug*',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
