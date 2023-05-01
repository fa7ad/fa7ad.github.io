import path from 'node:path'
import fs from 'node:fs/promises'

import Jimp from 'jimp'
import dayjs from 'dayjs'
import { descend, map, prop, sort, isEmpty } from 'ramda'

import metadata from 'data/metadata'
import renderMarkdown, { renderExcerpt } from './markdown'

const FS_DATA_PATH = path.resolve('.', 'data')
const FS_PUBLIC_PATH = path.resolve('.', 'public')

type AsyncTransformer<T, U> = (item: T) => Promise<U>
const mapPromise = async <T, U>(fn: AsyncTransformer<T, U>, list: T[]) =>
  Promise.all(map(fn, list))

const getPlaceHolder = async (path: string) => {
  const image = await Jimp.read(path)
  return image.scale(0.1).blur(10).getBase64Async('image/jpeg')
}

const getDimensions = async (path: string) => {
  const image = await Jimp.read(path)
  return {
    width: image.getWidth(),
    height: image.getHeight()
  }
}

export default class Content {
  #metadata = {} as Record<Entry, ProcessedEntry[]>

  #updatedLast = 0

  async #checkAndUpdateMeta() {
    if (isEmpty(this.#metadata) || Date.now() - this.#updatedLast > 30_000) {
      await this.#updateMeta()
    }
  }

  #parseEntry(type: Entry, rawSeries: SeriesMap) {
    return async function (entry: UnprocessedEntry): Promise<ProcessedEntry> {
      const filePath = path.join(FS_DATA_PATH, type, entry.file)
      const fileData = await fs.readFile(filePath, 'utf8')
      const shortExcerpt = await renderExcerpt(fileData, 155)
      const longExcerpt = await renderExcerpt(fileData, 245)

      if (type === 'pages') {
        const pageEntry = entry as UnprocessedPage
        const content = await renderMarkdown(fileData)
        return {
          title: pageEntry.title,
          slug: pageEntry.slug,
          content,
          shortExcerpt,
          longExcerpt
        }
      }

      const postEntry = entry as UnprocessedPost

      const cover = postEntry?.cover ?? null
      let ogCover = null
      let coverInfo = null
      let placeholderImage = cover
      if (cover) {
        const imageLoc = path.resolve(FS_PUBLIC_PATH, '.' + cover)
        ogCover = `${process.env.NEXT_PUBLIC_URL || ''}/og${cover}`
        placeholderImage = await getPlaceHolder(imageLoc)
        coverInfo = await getDimensions(imageLoc)
      }

      const seriesName = postEntry?.series ?? null
      const series = rawSeries?.[seriesName ?? ''] ?? null
      const content = await renderMarkdown(fileData)

      return {
        title: postEntry.title,
        slug: postEntry.slug,
        date: dayjs(postEntry.date).format('dddd, MMMM D, YYYY HH:mm'),
        published: postEntry.date,
        content,
        shortExcerpt,
        longExcerpt,
        cover,
        ogCover,
        coverInfo,
        placeholderImage,
        series
      }
    }
  }

  async #processEntries(
    type: Entry,
    rawEntries: UnprocessedEntry[] = [],
    rawSeries: SeriesMap = {}
  ): Promise<ProcessedPage[] | ProcessedPost[]> {
    const entries = await mapPromise<UnprocessedEntry, ProcessedEntry>(
      this.#parseEntry(type, rawSeries),
      rawEntries
    )

    if (type === 'posts') {
      const postPipeline = sort(
        descend<ProcessedPost>(prop<number>('published'))
      )
      return postPipeline(entries as ProcessedPost[])
    }
    return entries as ProcessedPage[]
  }

  async #updateMeta() {
    const result = structuredClone(metadata)
    const posts = await this.#processEntries(
      'posts',
      result.posts,
      result.series
    )
    const pages = await this.#processEntries('pages', result.pages)

    this.#updatedLast = Date.now()

    this.#metadata = {
      posts,
      pages
    }
  }

  async getAll(contentType: Entry) {
    await this.#checkAndUpdateMeta()
    return this.#metadata[contentType]
  }

  async getBySlug(contentType: Entry, slug: string) {
    await this.#checkAndUpdateMeta()
    const allEntries = await this.getAll(contentType)
    return allEntries.find(entry => entry.slug === slug)
  }

  async getAllSlugs(contentType: Entry) {
    await this.#checkAndUpdateMeta()
    const allEntries = await this.getAll(contentType)
    return map(prop<string>('slug'), allEntries)
  }
}
