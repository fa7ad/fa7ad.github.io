/* eslint-disable @typescript-eslint/no-var-requires */
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypePrism from 'rehype-prism-plus'
import rehypeMathJax from 'rehype-mathjax/chtml'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import configureNextMdx from '@next/mdx'

const fontURL = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
const withMdx = configureNextMdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter, remarkMath],
    rehypePlugins: [
      [rehypeMathJax, { chtml: { fontURL } }],
      [rehypePrism, { showLineNumbers: true, ignoreMissing: true }]
    ],
    reactPlugins: []
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true
}

export default withMdx(nextConfig)
