import path from 'path'
import fs from 'fs/promises'
import YAML from 'yaml'
import dayjs from 'dayjs'
import { promisify } from 'util'
import imageSize from 'image-size'
import { getPlaiceholder } from 'plaiceholder'
import { assoc, compose, map, mergeRight } from 'ramda'
import renderMarkdown, { renderExcerpt } from './markdown'

const sizeOf = promisify(imageSize)

const dataDir = path.join(process.cwd(), 'data')

const mapPromise = compose(Promise.all.bind(Promise), map)

const getMetaData = async () => {
  const metadataFile = path.join(dataDir, 'metadata.yml')
  const metadata = await fs.readFile(metadataFile, 'utf8')
  return YAML.parse(metadata)
}

const getImages = async entry => {
  const cover = entry?.cover ?? null
  let placeholderImage = null
  if (!cover) {
    return { cover, placeholderImage, ogCover: null }
  }
  const { base64 } = await getPlaiceholder(cover)
  const { width, height } = await sizeOf(`./public${cover}`)
  placeholderImage = base64
  const ogCover = `${process.env.NEXT_PUBLIC_URL || ''}/og${cover}`
  return { cover, coverInfo: { height, width }, placeholderImage, ogCover }
}

const getEntryExcerpt = async (entry, contentType, length = 155) => {
  const markdown = await fs.readFile(
    path.join(dataDir, contentType, entry.file),
    'utf8'
  )
  return renderExcerpt(markdown, length)
}

export async function getAllMeta(contentType, singleEntry = false) {
  const parsedMeta = await getMetaData()
  const content = parsedMeta?.[contentType] || []

  const allEntries = await mapPromise(async entry => {
    const withImages = mergeRight(entry, await getImages(entry))
    const withSeries = assoc(
      'series',
      parsedMeta?.series?.[entry?.series] ?? null,
      withImages
    )
    const withExcerpt = assoc(
      'excerpt',
      await getEntryExcerpt(withSeries, contentType, singleEntry ? 155 : 245),
      withSeries
    )
    return withExcerpt
  }, content)
  return allEntries
}

export async function getContentBySlug(contentType, slug) {
  try {
    const allEntries = await getAllMeta(contentType)
    const entry = allEntries.find(entry => entry.slug === slug)

    const filePath = path.join(dataDir, contentType, entry.file)
    const entryData = await fs.readFile(filePath, 'utf8')
    const date = entry?.date
      ? dayjs(entry.date).format('dddd, MMMM D, YYYY HH:mm')
      : null
    const { cover, ogCover, placeholderImage } = await getImages(entry)
    return {
      ...entry,
      content: await renderMarkdown(entryData),
      date,
      published: entry?.date ?? null,
      cover,
      ogCover,
      placeholderImage
    }
  } catch (error) {
    console.log({ date: Date.now(), error })
    return null
  }
}
