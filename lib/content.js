import path from 'path'
import fs from 'fs/promises'
import YAML from 'yaml'
import dayjs from 'dayjs'
import { getPlaiceholder } from 'plaiceholder'
import { compose, map } from 'ramda'
import renderMarkdown, { renderExcerpt } from './markdown'

const dataDir = path.join(process.cwd(), 'data')

const mapPromise = compose(Promise.all.bind(Promise), map)

const getImages = async entry => {
  const cover = entry?.cover ?? null
  let placeholderImage = null
  if (!cover) {
    return { cover, placeholderImage }
  }
  const { base64 } = await getPlaiceholder(cover)
  placeholderImage = base64
  return { cover, placeholderImage }
}

export async function getAllMeta(contentType, withExcerpt = false) {
  const metadataFile = path.join(dataDir, 'metadata.yml')
  const metadata = await fs.readFile(metadataFile, 'utf8')
  const parsedMeta = YAML.parse(metadata)
  const content = parsedMeta?.[contentType] || []
  const entries = await mapPromise(async entry => ({ ...entry, ...(await getImages(entry)) }), content)
  if (withExcerpt) {
    return mapPromise(async item => {
      const markdown = await fs.readFile(path.join(dataDir, contentType, item.file), 'utf8')
      return { ...item, excerpt: await renderExcerpt(markdown) }
    }, entries)
  }
  return entries
}

export async function getContentBySlug(contentType, slug) {
  try {
    const allEntries = await getAllMeta(contentType)
    const entry = allEntries.find(entry => entry.slug === slug)

    const filePath = path.join(dataDir, contentType, entry.file)
    const entryData = await fs.readFile(filePath, 'utf8')
    const date = entry?.date ? dayjs(entry.date).format('dddd, MMMM D, YYYY HH:mm') : null
    const { cover, placeholderImage } = await getImages(entry)
    return { ...entry, content: await renderMarkdown(entryData), date, cover, placeholderImage }
  } catch (error) {
    console.log({ date: Date.now(), error })
    return null
  }
}
