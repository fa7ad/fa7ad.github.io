import Content from 'lib/content'

import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_URL || 'https://mildlyboring.com'

const contentProvider = new Content()

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const _untypedposts = await contentProvider.getAll('posts')
  const posts = _untypedposts as ProcessedPost[]
  const _untypedpages = await contentProvider.getAll('pages')
  const pages = _untypedpages as ProcessedPage[]
  return [
    {
      url: BASE_URL,
      lastModified: new Date()
    },
    ...pages.map(page => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: new Date()
    })),
    ...posts.map(post => ({
      url: `${BASE_URL}/posts/${post.slug}`,
      lastModified: post.published || new Date()
    }))
  ]
}
