import PostCover from 'components/PostCover'
import ArticleSeriesBox from 'components/ArticleSeriesBox'
import CommentSection from 'components/CommentSection'

import type { Article, WithContext } from 'schema-dts'

import { generateMeta } from './generateMeta'

interface WrappedPost {
  metadata: PostMetadata
  (): JSX.Element
}

const wrapPost = (meta: RawMetadata, rawMdx: string, Component: React.ElementType = 'div'): WrappedPost => {
  const post = generateMeta(meta, rawMdx)

  function Post() {
    const jsonLd: WithContext<Article> = {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: post.title,
      image: post.cover ? [post.cover] : [],
      datePublished: post.published ?? undefined,
      dateModified: post.published ?? undefined,
      author: [
        {
          '@type': 'Person',
          name: 'Fahad Hossain',
          url: 'https://mildlyboring.com/about'
        }
      ]
    }

    const seriesBox = post.series ? (
      <ArticleSeriesBox title={post.series.title} posts={post.series.posts} activeSlug={post.slug} />
    ) : null

    const coverImage = post.cover ? (
      <PostCover
        src={post.cover}
        title={post.title}
        coverInfo={post.coverInfo}
        placeholderImage={post.placeholderImage}
      />
    ) : null

    return (
      <>
        <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {coverImage}
        <h1 className='mb-2 mt-8 text-center'>{post.title}</h1>
        <p className='text-center text-sm text-neutral-600 dark:text-neutral-400'>{post.date}</p>
        {seriesBox}
        <div id='readable_content'>
          <Component />
        </div>
        <CommentSection slug={post.slug} title={post.title} />
      </>
    )
  }

  Post.metadata = post

  return Post
}

export { readContentMdx } from './readContentMdx'

export default wrapPost
