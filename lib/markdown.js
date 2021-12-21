import { unified } from 'unified'
import strip from 'strip-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import stringify from 'remark-stringify'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import { sanitize } from './markdown.config'
import rehypeKatex from 'rehype-katex'

export default async function renderMarkdown(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex, { displayMode: false })
    .use(rehypeRaw)
    .use(rehypeHighlight, { ignoreMissing: true, prefix: 'hljs' })
    .use(rehypeSanitize, sanitize)
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}

export async function renderExcerpt(markdown, length) {
  const result = await unified().use(remarkParse).use(remarkGfm).use(strip).use(stringify).process(markdown)
  const contentText = result.toString().trim().replace(/\s+/g, ' ')
  const excerpt = contentText.slice(0, length)

  if (contentText.length > length) {
    return excerpt + '...'
  }
  return excerpt
}
