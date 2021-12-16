import path from 'path'
import fs from 'fs/promises'
import YAML from 'yaml'
import renderMarkdown from './markdown'

const currentDir = process.cwd()
const dataDir = path.join(currentDir, 'data')

export default async function getAllPostMeta() {
  const metadata = await fs.readFile(path.join(dataDir, 'metadata.yml'), 'utf8')
  const parsedMeta = YAML.parse(metadata)
  const posts = parsedMeta?.posts || []
  return posts
}

export async function getPostBySlug(slug) {
  try {
    const allPosts = await getAllPostMeta()
    const post = allPosts.find(post => post.slug === slug)
    if (!post?.file) return null
    const filePath = path.join(dataDir, 'posts', post.file)
    const postData = await fs.readFile(filePath, 'utf8')
    const content = await renderMarkdown(postData)
    return { ...post, content }
  } catch (error) {
    return null
  }
}
