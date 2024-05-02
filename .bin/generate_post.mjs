#!/usr/bin/env node
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promises as fsp } from 'node:fs'

import yargs from 'yargs/yargs'
import prettier from 'prettier'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(__dirname, '..')
const postsDir = resolve(rootDir, 'app', 'posts', '(slug)')

async function main(slug) {
  const directory = resolve(postsDir, slug)
  await fsp.mkdir(directory)
  const content = `export const metadata = {
  title: '${slug}',
  slug: '${slug}',
  date: '${new Date().toISOString()}',
  cover: '/featured/${slug}_1080x720.webp'
}///META

<${slug} />`

  const page = `
/// This code was generated using .bin/generate_post.mjs
import wrapPost, { readContentMdx } from 'components/PostWrapper'
import Content, { metadata as rawMeta } from './content.mdx'

const rawMdx = await readContentMdx(import.meta.url)

const post = wrapPost(rawMeta, rawMdx, Content)

export default post

export const metadata = post.metadata
`

  const prettycfg = await prettier.resolveConfig(import.meta.url)

  const fmtContent = await prettier.format(content, {
    filepath: 'content.mdx',
    ...prettycfg
  })

  const fmtPage = await prettier.format(page, {
    filepath: 'page.tsx',
    ...prettycfg
  })

  await fsp.writeFile(resolve(directory, 'content.mdx'), fmtContent, 'utf-8')
  await fsp.writeFile(resolve(directory, 'page.tsx'), fmtPage, 'utf-8')
}

const parsedArgv = yargs(process.argv.slice(2), __dirname)
  .command('$0 <slug>', 'Generate a post component')
  .positional('slug', {
    type: 'string',
    describe: 'Post slug',
    demandOption: true
  })
  .alias('h', 'help')
  .help('h').argv

main(parsedArgv.slug)
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
