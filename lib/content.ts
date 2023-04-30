import path from 'node:path'
import fs from 'node:fs/promises'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'

import YAML from 'yaml'
import dayjs from 'dayjs'
import imageSize from 'image-size'
import { getPlaiceholder } from 'plaiceholder'
import { assoc, compose, descend, identity, map, prop, sort } from 'ramda'

import renderMarkdown, { renderExcerpt } from './markdown'

import type { ISizeCalculationResult } from 'image-size/dist/types/interface'

type AsyncSizeOf = (t: string | Buffer) => Promise<ISizeCalculationResult>
const sizeOf = promisify(imageSize) as AsyncSizeOf

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FS_DATA_PATH = path.resolve(__dirname, '..', 'data')

type MapToPromiseArr = <T, U>(
  fn: (item: T) => Promise<U>,
  list: T[]
) => Promise<U[]>
const mapPromise: MapToPromiseArr = compose(
  Promise.all.bind(Promise),
  map as any
) as MapToPromiseArr

type Entry = 'posts' | 'pages'
type SeriesMap = {
  [key: string]: {
    title: string
    posts: {
      title: string
      slug: string
    }[]
  }
}

type EntryObject = {
  title: string
  file: string
  slug: string
  date?: string
  cover?: string
  series?: string
}

type ProcessedEntry = {
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
  series: SeriesMap[string] | null
  content: string
}

export default class Content {
  #metadata: Record<Entry, ProcessedEntry[]> = {} as Record<
    Entry,
    ProcessedEntry[]
  >

  #updatedLast = 0

  async #checkAndUpdateMeta() {
    if (
      Object.keys(this.#metadata).length === 0 ||
      Date.now() - this.#updatedLast > 30_000
    ) {
      await this.#updateMeta()
    }
  }

  #parseEntry(type: Entry, rawSeries: SeriesMap) {
    return async function (entry: EntryObject): Promise<ProcessedEntry> {
      const filePath = path.join(FS_DATA_PATH, type, entry.file)
      const fileData = await fs.readFile(filePath, 'utf8')
      const shortExcerpt = await renderExcerpt(fileData, 155)
      const longExcerpt = await renderExcerpt(fileData, 245)
      const cover = entry?.cover ?? null
      let ogCover = null
      let coverInfo = null
      let placeholderImage = null
      if (cover) {
        placeholderImage = (await getPlaiceholder(cover)).base64
        const { width, height } = await sizeOf(`${__dirname}/../public${cover}`)
        ogCover = `${process.env.NEXT_PUBLIC_URL || ''}/og${cover}`
        coverInfo = { width, height }
      }
      const series = rawSeries?.[entry?.series ?? ''] ?? null
      const content = await renderMarkdown(fileData)
      const date = entry?.date
        ? dayjs(entry.date).format('dddd, MMMM D, YYYY HH:mm')
        : null
      return {
        title: entry.title,
        slug: entry.slug,
        published: entry?.date ?? null,
        date,
        shortExcerpt,
        longExcerpt,
        cover,
        ogCover,
        coverInfo,
        placeholderImage,
        series,
        content
      }
    }
  }

  async #processEntries(
    type: Entry,
    rawEntries: EntryObject[] = [],
    rawSeries: SeriesMap = {}
  ) {
    const entries = await mapPromise(
      this.#parseEntry(type, rawSeries),
      rawEntries
    )

    const orderFns = {
      posts: sort(descend(prop<number>('published'))),
      pages: identity
    }

    return orderFns[type](entries)
  }

  async #updateMeta() {
    const metadataFile = path.join(FS_DATA_PATH, 'metadata.yml')
    const metadata = await fs.readFile(metadataFile, 'utf8')
    const result = await YAML.parse(metadata)

    const withPosts = assoc(
      'posts',
      await this.#processEntries('posts', result?.posts, result?.series),
      result
    )

    const withPages = assoc(
      'pages',
      await this.#processEntries('pages', result?.pages),
      withPosts
    )

    this.#metadata = withPages
    this.#updatedLast = Date.now()
  }

  async getAll(contentType: Entry) {
    await this.#checkAndUpdateMeta()
    return this.#metadata[contentType]
  }

  async getBySlug(contentType: Entry, slug: string) {
    await this.#checkAndUpdateMeta()
    return this.#metadata[contentType].find(entry => entry.slug === slug)
  }

  async getAllSlugs(contentType: Entry) {
    await this.#checkAndUpdateMeta()
    return this.#metadata[contentType].map(entry => entry.slug)
  }
}
