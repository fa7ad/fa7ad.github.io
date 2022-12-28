import { unified } from 'unified'
import strip from 'strip-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import stringify from 'remark-stringify'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism-plus'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeMathJax from 'rehype-mathjax/chtml'

import { sanitize } from './markdown.config'

export default async function renderMarkdown(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, sanitize)
    .use(rehypeMathJax, {
      chtml: {
        fontURL:
          'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
      }
    })
    .use(rehypePrism, { showLineNumbers: '0', ignoreMissing: true })
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}

export async function renderExcerpt(markdown, length) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(strip)
    .use(stringify)
    .process(markdown)
  const contentText = result.toString().trim().replace(/\s+/g, ' ')
  const excerpt = contentText.slice(0, length)

  if (contentText.length > length) {
    return excerpt + '...'
  }
  return excerpt
}
