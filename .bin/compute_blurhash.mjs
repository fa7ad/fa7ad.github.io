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

/** @type {<T, U>(arr: T[], fn: (v: T) => Promise<U>) => Promise<U[]>} */
const mapPromise = (arr, fn) => Promise.all(arr.map(async v => await fn(v)))

/** @type {(vips: Awaited<ReturnType<Vips>>, buf: Buffer) => Promise<string>)} */
async function blurHashForImage(vips, buf) {
  const image = vips.Image.newFromBuffer(buf)
  const arBuf = image.resize(0.1).gaussblur(2).writeToBuffer('.webp')
  return Buffer.from(arBuf).toString('base64')
}

async function blurHashAll(category) {
  const vips = await Vips()
  const fullLocation = resolve(publicDir, category)
  const directoryListing = await fsp.readdir(fullLocation)
  return mapPromise(directoryListing, async img => {
    if (!img.endsWith('.webp')) return []
    console.error(`Processing ${category}/${img}`)
    const imageContent = await fsp.readFile(resolve(publicDir, category, img))
    return [`/${category}/${img}`, `data:image/webp;base64,${await blurHashForImage(vips, imageContent)}`]
  })
}

async function main() {
  const blurHashes = (await Promise.all([blurHashAll('images'), blurHashAll('featured')])).flat()
  const output = `/** @type {Record<string, string>} */
const blurHashes = ${JSON.stringify(Object.fromEntries(blurHashes), null, 2)}\n\nexport default blurHashes`
  const fmtd = await prettier.format(output, {
    filepath: 'blurhashes.mjs',
    ...(await prettier.resolveConfig(import.meta.url))
  })
  await fsp.writeFile(resolve(rootDir, 'data', 'blurhashes.mjs'), fmtd, 'utf-8')
}

const parsedArgv = yargs(process.argv.slice(2), __dirname)
  .command('$0', 'Generate blurhashes for all images in public/images and save to public/featured')
  .alias('h', 'help')
  .help('h').argv

main(parsedArgv)
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
