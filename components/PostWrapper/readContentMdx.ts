import { readFile } from 'fs/promises'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

export async function readContentMdx(fileUrl: string) {
  const contents = await readFile(resolve(dirname(fileURLToPath(fileUrl)), 'content.mdx'), 'utf-8')

  return contents
}
