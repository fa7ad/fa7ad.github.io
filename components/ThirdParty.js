import dynamic from 'next/dynamic'

export const KATEX_CSS = {
  rel: 'stylesheet',
  href: 'https://cdn.jsdelivr.net/npm/katex@0.15.1/dist/katex.min.css'
}

export const DiscussionEmbed = dynamic(
  () => import('disqus-react').then(mod => mod.DiscussionEmbed),
  {
    ssr: false,
    loading: ({ isLoading }) => (
      <p>{isLoading ? 'Loading comments...' : 'Failed to load disqus'}</p>
    )
  }
)
