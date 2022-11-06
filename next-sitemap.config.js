/**
 * @type {import('next-sitemap').IConfig}
 */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_URL || 'https://mildlyboring.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false
}

module.exports = config
