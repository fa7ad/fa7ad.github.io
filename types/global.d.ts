import { type Metadata } from 'next'

declare global {
  type Entry = 'posts' | 'pages'

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

  interface UnprocessedPage {
    title: string
    file: string
    slug: string
  }

  interface ProcessedPage {
    title: string
    slug: string
    content: string
    shortExcerpt: string
    longExcerpt: string
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

  type UnprocessedEntry = UnprocessedPost | UnprocessedPage
  type ProcessedEntry = ProcessedPost | ProcessedPage

  interface MetadataStore {
    posts: ProcessedPost[]
    pages: ProcessedPage[]
  }

  interface Window {
    DISQUS: unknown
  }
}
