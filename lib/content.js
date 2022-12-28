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

const sizeOf = promisify(imageSize)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FS_DATA_PATH = path.resolve(__dirname, '..', 'data')

const mapPromise = compose(Promise.all.bind(Promise), map)

/**
 * @typedef {'pages' | 'posts'} ContentType
 */

export default class Content {
  #metadata = null

  async #checkAndUpdateMeta() {
    if (!this.#metadata) {
      await this.#updateMeta()
    }
  }

  #parseEntry(type, rawSeries) {
    return async function (entry) {
      const filePath = path.join(FS_DATA_PATH, type, entry.file)
      const fileData = await fs.readFile(filePath, 'utf8')
      const shortExcerpt = await renderExcerpt(fileData, 155)
      const longExcerpt = await renderExcerpt(fileData, 245)
      let cover = entry?.cover ?? null
      let ogCover = null
      let coverInfo = null
      let placeholderImage = null
      if (cover) {
        placeholderImage = (await getPlaiceholder(cover)).base64
        const { width, height } = await sizeOf(`${__dirname}/../public${cover}`)
        ogCover = `${process.env.NEXT_PUBLIC_URL || ''}/og${cover}`
        coverInfo = { width, height }
      }
      const series = rawSeries?.[entry.series] ?? null
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

  /**
   *
   * @param {ContentType} type
   * @param {Record<string, string|number>[]} rawEntries
   * @param {Record<string, Record<string, any>>} rawSeries
   * @returns
   */
  async #processEntries(type, rawEntries = [], rawSeries = {}) {
    const entries = await mapPromise(
      this.#parseEntry(type, rawSeries),
      rawEntries
    )

    const orderFns = {
      posts: sort(descend(prop('published'))),
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
  }

  async getAll(contentType) {
    await this.#checkAndUpdateMeta()
    return this.#metadata[contentType]
  }

  async getBySlug(contentType, slug) {
    await this.#checkAndUpdateMeta()
    return this.#metadata[contentType].find(entry => entry.slug === slug)
  }

  async getAllPaths(contentType) {
    await this.#checkAndUpdateMeta()
    return this.#metadata[contentType].map(
      entry => `${contentType === 'posts' ? '/posts/' : '/'}${entry.slug}`
    )
  }
}
