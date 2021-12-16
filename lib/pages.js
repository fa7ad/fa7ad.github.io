import path from 'path'
import fs from 'fs/promises'
import YAML from 'yaml'
import renderMarkdown from './markdown'

const currentDir = process.cwd()
const dataDir = path.join(currentDir, 'data')

export default async function getAllPageMeta() {
  const metadata = await fs.readFile(path.join(dataDir, 'metadata.yml'), 'utf8')
  const parsedMeta = YAML.parse(metadata)
  const pages = parsedMeta?.pages || []
  return pages
}

export async function getPageBySlug(slug) {
  try {
    const allPages = await getAllPageMeta()
    const page = allPages.find(page => page.slug === slug)
    if (!page?.file) return null
    const filePath = path.join(dataDir, 'pages', page.file)
    const pageData = await fs.readFile(filePath, 'utf8')
    const content = await renderMarkdown(pageData)
    return { ...page, content }
  } catch (error) {
    return null
  }
}
