import { unified } from 'unified'
import gfm from 'remark-gfm'
import parse from 'remark-parse'
import strip from 'strip-markdown'
import rehypeRaw from 'rehype-raw'
import rehypePrism from 'rehype-prism-plus'
import remarkRehype from 'remark-rehype'
import stringify from 'remark-stringify'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { sanitize } from './markdown.config'

export default async function renderMarkdown(markdown) {
  const result = await unified()
    .use(parse)
    .use(gfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypePrism, { showLineNumbers: true })
    .use(rehypeSanitize, sanitize)
    .use(rehypeStringify)
    .process(markdown)
  return result.toString()
}

export async function renderExcerpt(markdown, length = 250) {
  const result = await unified().use(parse).use(gfm).use(strip).use(stringify).process(markdown)
  const contentText = result.toString().trim().replace(/\s+/g, ' ')
  const excerpt = contentText.slice(0, length)

  if (contentText.length > length) {
    return excerpt + '...'
  }
  return excerpt
}