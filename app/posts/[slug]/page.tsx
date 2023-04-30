import { Metadata } from 'next'

import PostCover from 'components/PostCover'
import ArticleSeriesBox from 'components/ArticleSeriesBox'
import CommentSection from 'components/CommentSection'

import Content from 'lib/content'
import renderHtml from 'lib/renderHtml'
import { Article, WithContext } from 'schema-dts'

interface BlogPageProps {
  params: { slug: string }
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = params
  const post = await contentProvider.getBySlug('posts', slug)
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

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostCover post={post} />
      <h1 className='mb-2 mt-8 text-center'>{post.title}</h1>
      <p className='text-center text-sm text-neutral-600 dark:text-neutral-400'>
        {post.date}
      </p>
      <ArticleSeriesBox post={post} />
      <div id='readable_content'>{renderHtml(post.content)}</div>
      <hr />
      <CommentSection post={post} />
    </>
  )
}

const contentProvider = new Content()

export async function generateMetadata({
  params
}: BlogPageProps): Promise<Metadata> {
  const post = await contentProvider.getBySlug('posts', params.slug)
  let ogImages = undefined
  if (post?.ogCover) {
    ogImages = [
      {
        url: post?.ogCover,
        width: 1200,
        height: 630,
        type: 'image/jpeg'
      }
    ]
  }
  return {
    title: post?.title,
    description: post?.longExcerpt,
    openGraph: {
      type: 'article',
      images: ogImages,
      authors: ['Fahad Hossain <fahad at mildlyboring dot com>'],
      publishedTime: post?.published ?? undefined
    },
    alternates: { canonical: `https://mildlyboring.com/posts/${params.slug}` }
  }
}

export async function generateStaticParams() {
  const paths = await contentProvider.getAllSlugs('posts')
  return paths.map(slug => ({ slug }))
}
