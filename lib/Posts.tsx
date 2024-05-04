import path from 'node:path'
import { readFile } from 'node:fs/promises'

import glob from 'fast-glob'
import { descend, prop, sort } from 'ramda'

import { generateMeta } from 'components/PostWrapper/generateMeta'

async function importPost(postFilename: string): Promise<PostMetadata> {
  const postModule = await import(`app/posts/${postFilename}`)
  const filePath = path.resolve(`app/posts/${postFilename}`)
  const content = await readFile(filePath, 'utf-8')
  const post = generateMeta(postModule.metadata, content)
  return post
}

export async function findAll() {
  const postFilenames = await glob('**/*.mdx', {
    cwd: './app/posts'
  })
  const posts = await Promise.all(postFilenames.map(importPost))

  return sort(descend<PostMetadata>(prop('published')), posts)
}
