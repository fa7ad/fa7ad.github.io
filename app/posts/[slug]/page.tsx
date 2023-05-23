import PostCover from 'components/PostCover'
import ArticleSeriesBox from 'components/ArticleSeriesBox'
import CommentSection from 'components/CommentSection'

import Content from 'lib/content'
import renderHtml from 'lib/renderHtml'

import type { Metadata } from 'next'
import type { Article, WithContext } from 'schema-dts'

interface BlogPageProps {
  params: { slug: string }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = params
  const _untypedpost = await contentProvider.getBySlug('posts', slug)
  const post = _untypedpost as ProcessedPost | undefined
  if (!post) {
    return null
  }

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
    <ArticleSeriesBox
      title={post.series.title}
      posts={post.series.posts}
      activeSlug={post.slug}
    />
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
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {coverImage}
      <h1 className='mb-2 mt-8 text-center'>{post.title}</h1>
      <p className='text-center text-sm text-neutral-600 dark:text-neutral-400'>
        {post.date}
      </p>
      {seriesBox}
      <div id='readable_content'>{renderHtml(post.content)}</div>
      <CommentSection slug={post.slug} title={post.title} />
    </>
  )
}

const contentProvider = new Content()

export async function generateMetadata({
  params
}: BlogPageProps): Promise<Metadata> {
  const _untypedpost = await contentProvider.getBySlug('posts', params.slug)
  const post = _untypedpost as ProcessedPost
  const ogImages = post?.ogCover
    ? [
        {
          url: post?.ogCover,
          width: 1200,
          height: 630,
          type: 'image/jpeg'
        }
      ]
    : undefined

  return {
    title: post.title,
    description: post.longExcerpt,
    openGraph: {
      type: 'article',
      images: ogImages,
      authors: ['Fahad Hossain <fahad at mildlyboring dot com>'],
      publishedTime: post.published
    },
    alternates: { canonical: `https://mildlyboring.com/posts/${params.slug}` }
  }
}

export async function generateStaticParams() {
  const paths = await contentProvider.getAllSlugs('posts')
  return paths.map(slug => ({ slug }))
}
