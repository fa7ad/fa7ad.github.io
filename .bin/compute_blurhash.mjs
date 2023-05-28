#!/usr/bin/env node
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promises as fsp } from 'node:fs'

import Vips from 'wasm-vips'
import yargs from 'yargs/yargs'
import prettier from 'prettier'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(__dirname, '..')
const publicDir = resolve(rootDir, 'public')

/**
 * 
 * @param {Awaited<ReturnType<Vips>>} vips
 * @param {Buffer} buf 
 * @returns 
 */
async function blurHashForImage(vips, buf) {
  const image = vips.Image.newFromBuffer(buf)
  const arBuf = image.resize(0.1).gaussblur(2).writeToBuffer('.webp')
  return Buffer.from(arBuf).toString('base64')
}

/**
 * @param {typeof argv} argv
 * @returns {*}
 */
async function main(argv) {
  const vips = await Vips()

  const imagesDir = resolve(publicDir, 'images')
  const featuredDir = resolve(publicDir, 'featured')

  const images = (await fsp.readdir(imagesDir)).filter(f => f.endsWith('.webp'))
  const featured = (await fsp.readdir(featuredDir)).filter(f => f.endsWith('.webp'))

  const imagesBlurHashes = await Promise.all(
    images.map(async img => {
      const b64 = await blurHashForImage(vips, await fsp.readFile(resolve(imagesDir, img)))
      return { [`images/${img}`]: `data:image/webp;base64,${b64}` }
    })
  )
  const featuredBlurHashes = await Promise.all(
    featured.map(async img => {
      const b64 = await blurHashForImage(vips, await fsp.readFile(resolve(featuredDir, img)))
      return { [`featured/${img}`]: `data:image/webp;base64,${b64}` }
    })
  )

  const map = Object.assign({}, ...imagesBlurHashes, ...featuredBlurHashes)
  const jazon = JSON.stringify(map, null, 2)

  const output = `const blurHashes = ${jazon}\n\nexport default blurHashes\n`

  const config = await prettier.resolveConfig(rootDir)
  const fmtd = prettier.format(output, { filepath: 'blurhashes.mjs', ...config })

  return fsp.writeFile(resolve(rootDir, 'data', 'blurhashes.mjs'), fmtd)
}

const argv = yargs(process.argv.slice(2), __dirname)
  .command('$0', 'Generate blurhashes for all images in public/images and save to public/featured')
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
