import { type Metadata } from 'next'

declare global {
  interface RawMetadata {
    title: string
    date: string
    cover?: string
    series?: string
    slug?: string
  }

  interface PostMetadata extends Metadata {
    slug: string
    title: string
    published: string
    date: string
    cover: string | null
    ogCover: string | null
    coverInfo: { width: number; height: number } | null
    placeholderImage: string | null
    series?: SeriesMap[string]
  }

  interface SeriesMap {
    [key: string]: {
      title: string
      posts: {
        title: string
        slug: string
      }[]
    }
  }
  interface Window {
    DISQUS: unknown
  }
}
