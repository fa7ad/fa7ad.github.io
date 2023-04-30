import type { ISizeCalculationResult } from 'image-size/dist/types/interface'

export interface PostData {
  title: string
  slug: string
  published: string | null
  date: string | null
  shortExcerpt: string
  longExcerpt: string
  cover: string | null
  ogCover: string | null
  coverInfo: ISizeCalculationResult | null
  placeholderImage: string | null
  content: string
  series: {
    title: string
    posts: {
      title: string
      slug: string
    }[]
  } | null
}
