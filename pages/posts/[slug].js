import clsx from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { useEffect } from 'react'
import { NextSeo } from 'next-seo'
import parse from 'html-react-parser'
import { useDispatch } from 'react-redux'

import Page from 'components/Page'
import { setActiveNavKey } from 'app/redux/ui.slice'
import { getAllMeta, getContentBySlug } from 'lib/content'
import { KATEX_CSS, DiscussionEmbed, AddThis } from 'components/ThirdParty'

import styles from './Post.module.css'

const PostCover = ({ post }) => {
  if (!post.cover) {
    return null
  }

  return (
    <div className={styles.coverImage}>
      <Image
        src={post.cover}
        priority
        placeholder='blur'
        blurDataURL={post.placeholderImage}
        alt=''
        layout='fill'
      />
    </div>
  )
}

const ArticleSeriesBox = ({ post }) => {
  if (!post.series) {
    return null
  }

  const getSeriesItemClassName = slug =>
    clsx(styles.seriesItem, {
      [styles.activeSeriesItem]: slug === post.slug
    })

  return (
    <div className={styles.seriesListing}>
      <h2>This article is part of a series</h2>
      <h2>Series Title: {post.series.title}</h2>
      <ul className={styles.seriesBox}>
        {post.series.posts.map(({ slug, title }) => (
          <Link
            key={slug}
            href={`/posts/${slug}`}
            passHref={!'i dont like this hack'}
          >
            <li className={getSeriesItemClassName(slug)}>{title}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default function BlogPostFull({ post, ogImages }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveNavKey('home'))
    window.Prism = { manual: true, plugins: ['line-numbers'] }
  }, [dispatch])

  const activatePrismJs = () => {
    if (window.Prism && window.Prism.highlightAll) {
      window.Prism.highlightAll()
    }
  }

  return (
    <Page>
      <NextSeo
        title={post.title}
        description={post.excerpt}
        canonical={`https://mildlyboring.com/posts/${post.slug}`}
        openGraph={{
          article: {
            publishedTime: post.published,
            authors: ['Fahad Hossain']
          },
          images: ogImages
        }}
        additionalLinkTags={post?.content?.includes('katex') ? [KATEX_CSS] : []}
      />
      <article
        id='content'
        className={clsx('prose', 'lg:prose-xl', styles.article)}
      >
        <PostCover post={post} />
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>{post.date}</p>
        <ArticleSeriesBox post={post} />
        <div id='readable_content'>{parse(post.content)}</div>
        <hr />
        <section id='comments_section' className='relative'>
          <DiscussionEmbed
            shortname='mildly-boring'
            config={{
              url: `${process.env.NEXT_PUBLIC_URL || ''}/posts/${post.slug}`,
              identifier: post.slug,
              title: post.title
            }}
          />
        </section>
        <AddThis />
        <Script
          src='/prism.min.js'
          strategy='afterInteractive'
          onLoad={activatePrismJs}
        />
      </article>
    </Page>
  )
}

export async function getStaticProps({ params }) {
  const post = await getContentBySlug('posts', params.slug)
  let ogImages = undefined
  if (post.ogCover) {
    ogImages = [
      {
        url: post.ogCover,
        width: 1200,
        height: 630,
        type: 'image/jpeg'
      }
    ]
  }
  return {
    props: { post, ogImages }
  }
}

export async function getStaticPaths() {
  const posts = await getAllMeta('posts')
  const paths = posts.map(post => ({ params: { slug: post.slug } }))
  return {
    paths,
    fallback: false
  }
}
