import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import metadata from '../data/metadata.mjs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const rootLayout = path.resolve(__dirname, '../app/page.tsx')

if (!metadata) {
  throw new Error('No metadata found')
}

const { posts, pages } = metadata
let sitemap = ''

sitemap += `
  <url>
    <loc>https://www.mildlyboring.com/</loc>
    <lastmod>${fs.statSync(rootLayout).mtime.toISOString()}</lastmod>
    <changefreq>always</changefreq>
  </url>`

pages.forEach(page => {
  const { slug, file } = page
  const url = `https://www.mildlyboring.com/${slug}`
  const filePath = path.resolve(__dirname, `../data/pages/${file}`)
  const lastMod = fs.statSync(filePath).mtime.toISOString()
  sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`
})

posts.forEach(post => {
  const { slug, date } = post
  const url = `https://www.mildlyboring.com/posts/${slug}`
  sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
  </url>`
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}
</urlset>
`

fs.writeFileSync(path.resolve(__dirname, '../app/sitemap.xml'), xml)
