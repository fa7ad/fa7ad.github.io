type Entry = 'posts' | 'pages'

interface UnprocessedPost {
  title: string
  date: string
  file: string
  slug: string
  cover?: string
  series?: string
}

interface ProcessedPost {
  title: string
  slug: string
  published: string
  date: string
  shortExcerpt: string
  longExcerpt: string
  cover: string | null
  ogCover: string | null
  coverInfo: { width: number; height: number } | null
  placeholderImage: string | null
  series?: SeriesMap[string]
  content: string
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
