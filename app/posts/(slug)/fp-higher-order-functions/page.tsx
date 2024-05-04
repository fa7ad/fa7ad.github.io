/// This code was generated using .bin/generate_post.mjs
import wrapPost, { readContentMdx } from 'components/PostWrapper'
import Content, { metadata as rawMeta } from './content.mdx'

const rawMdx = await readContentMdx(import.meta.url)

const post = wrapPost(rawMeta, rawMdx, Content)

export default post

export const metadata = post.metadata
