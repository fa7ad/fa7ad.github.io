import dayjs from 'dayjs'

import { getExcerptFromMd } from './getExcerpt'

import blurHashes from 'data/blurhashes.mjs'
import serieses from 'data/series.mjs'

export function generateMeta(meta: RawMetadata, rawMdx: string): PostMetadata {
  const excerpt = getExcerptFromMd(rawMdx, 200)

  const cover = meta.cover ?? null

  const finalMeta: PostMetadata = {
    slug: meta.slug ?? 'NEVER',
    title: meta.title,
    description: excerpt,
    published: meta.date,
    date: dayjs(meta.date).format('dddd, MMMM D, YYYY HH:mm'),
    cover,
    ogCover: null,
    coverInfo: null,
    placeholderImage: null,
    openGraph: {
      type: 'article',
      authors: ['Fahad Hossain <fahad at mildlyboring dot com>'],
      images: [],
      publishedTime: meta.date
    },
    alternates: { canonical: `https://mildlyboring.com/posts/${meta.slug}` }
  }

  if (cover) {
    finalMeta.ogCover = `/og${cover}`
    finalMeta.placeholderImage = blurHashes[cover]
    const res = cover.match(/_(?<width>\d+)x(?<height>\d+)\..*?$/)
    const width = res?.groups?.width as number | undefined
    const height = res?.groups?.height as number | undefined
    if (height && width) {
      finalMeta.coverInfo = { width, height }
    }
    finalMeta.openGraph!.images = [
      {
        url: finalMeta.ogCover,
        width: 1200,
        height: 630,
        type: 'image/jpeg'
      }
    ]
  }

  if (meta.series) {
    finalMeta.series = serieses[meta.series]
  }

  return finalMeta
}
