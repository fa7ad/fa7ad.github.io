import dynamic from 'next/dynamic'
import Script from 'next/script'

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

export const AddThis = () => {
  return (
    <Script
      strategy='afterInteractive'
      src='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-61bfe1b0843dc42e'
    />
  )
}
