import dynamic from 'next/dynamic'

export const DiscussionEmbed = dynamic(
  () => import('disqus-react').then(mod => mod.DiscussionEmbed),
  {
    ssr: false,
    loading: ({ isLoading }) => (
      <p>{isLoading ? 'Loading comments...' : 'Failed to load disqus'}</p>
    )
  }
)
