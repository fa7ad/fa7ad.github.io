import Content from 'lib/content'
import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://mildlyboring.com'

const contentProvider = new Content()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await contentProvider.getAll('posts')
  const pages = await contentProvider.getAll('pages')
  return [
    {
      url: BASE_URL,
      lastModified: new Date()
    },
    ...pages.map(page => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: page.published || new Date()
    })),
    ...posts.map(post => ({
      url: `${BASE_URL}/posts/${post.slug}`,
      lastModified: post.published || new Date()
    }))
  ]
}
