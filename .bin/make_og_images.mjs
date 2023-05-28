#!/usr/bin/env node
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promises as fsp } from 'node:fs'

import Vips from 'wasm-vips'
import yargs from 'yargs/yargs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const publicDir = resolve(__dirname, '..', 'public')

/**
 * @param {typeof argv} argv
 * @returns {Promise<void>}
 */
async function main(argv) {
  const vips = await Vips()

  const imagesDir = resolve(publicDir, 'featured')
  const images = (await fsp.readdir(imagesDir)).filter(image => !image.startsWith('.'))

  const watermark = vips.Image.newFromFile(resolve(publicDir, 'icons', 'mstile-70x70.png'))
  const bigWatermark = watermark.resize(1) // I have no idea why 1 is 128px, but it is

  for await (const image of images) {
    console.log(`Processing ${image}`)
    const imageFile = resolve(imagesDir, image)

    const outImageFile = resolve(publicDir, 'og', 'featured', image.replace(/\.[^.]+$/, '.webp'))

    let im = vips.Image.newFromFile(imageFile)
    if (im.width / im.height > 1200 / 630) {
      const scaledHeight = Math.floor((im.width * 630) / 1200)
      const topOffset = Math.floor((scaledHeight - im.height) / 2)
      im = im.embed(0, topOffset, im.width, scaledHeight, { extend: vips.Extend.copy })
    }

    const ogImage = im
      .thumbnailImage(1200, {
        size: vips.Size.both,
        height: 630,
        crop: vips.Interesting.centre
      })
      .gaussblur(1.2)
      .composite(bigWatermark, vips.BlendMode.over, {
        // 12px padding + 128px watermark -> bottom right
        x: 1200 - 140,
        y: 630 - 140
      })

    await fsp.writeFile(outImageFile, ogImage.writeToBuffer('.webp[Q=95]'))
  }
}

const argv = yargs(process.argv.slice(2), __dirname)
  .command('$0', 'Generate OpenGraph images for all the featured images')
  .alias('h', 'help')
  .help('h').argv

main(argv)
  .then(() => {
    process.exit(0)
  })
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
