#!/usr/bin/env node
import cp from 'node:child_process'
import { resolve } from 'node:path'
import { subtle } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { platform } from 'node:process'
import { existsSync, promises as fsp } from 'node:fs'

import yargs from 'yargs/yargs'
import Vips from 'wasm-vips'
import imageSize from 'image-size'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const publicDir = resolve(__dirname, '..', 'public')

// set User-Agent to Chrome, because some image hosts are evil
const chromeUA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/91.0.4472.114 Safari/537.36'

/**
 * @param {string} url
 * @param {boolean} force
 * @returns {Promise<string>}
 */
async function main(url, force = false) {
  if (!url) throw new Error('No URL provided')

  const vips = await Vips()

  const digest = await subtle.digest('sha-1', Buffer.from(url))

  const rawRes = await fetch(url, { headers: { 'User-Agent': chromeUA } })
  const nodeBuf = Buffer.from(await rawRes.arrayBuffer())

  const hash = Buffer.from(digest)
    .toString('base64url')
    .replace(/[-_/\\]/g, '')
  const { width, height } = imageSize(nodeBuf)

  const outPath = resolve(publicDir, 'images', `${hash}_${width}x${height}.webp`)

  if (existsSync(outPath) && !force) throw new Error('Image already exists')

  const webp = vips.Image.newFromBuffer(nodeBuf).writeToBuffer('.webp')

  return fsp.writeFile(outPath, webp).then(() => outPath.replace(publicDir, ''))
}

const argv = yargs(process.argv.slice(2), __dirname)
  .command(
    '$0 [options] <url>',
    'Download an image, convert to webp, and save to public/images'
  )
  .positional('url', {
    type: 'string',
    describe: 'URL of the image to download',
    demandOption: true
  })
  .alias('f', 'force')
  .boolean('f')
  .describe('f', 'Overwrite existing image')
  .alias('h', 'help')
  .help('h').argv

main(argv.url, argv?.force)
  .then(outPath => {
    console.log(outPath)
    if (platform === 'darwin') {
      cp.execSync(`printf "%s" ${outPath} | pbcopy`)
    }
    process.exit(0)
  })
  .catch(err => {
    console.error(err.message)
    process.exit(1)
  })
