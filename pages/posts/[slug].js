import { NextSeo } from 'next-seo'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import parse from 'html-react-parser'
import Image from 'next/image'
import clsx from 'clsx'
import 'highlight.js/styles/a11y-dark.css'

import Page from 'components/Page'
import { setActiveNavKey } from 'app/redux/ui.slice'
import { getAllMeta, getContentBySlug } from 'lib/content'

import styles from './Post.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Script from 'next/script'

const DiscussionEmbed = dynamic(() => import('disqus-react').then(mod => mod.DiscussionEmbed), {
  ssr: false,
  loading: ({ isLoading }) => <p>{isLoading ? 'Loading comments...' : 'Failed to load disqus'}</p>
})

export default function BlogPostFull({ post }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveNavKey('home'))
    setTimeout(() => {
      import('highlight.js').then(mod => {
        const hljs = mod.default
        hljs.configure({ ignoreUnescapedHTML: true })
        hljs.highlightAll()
      })
    }, 50)
  }, [dispatch])

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
          images: [
            post.cover
              ? {
                  url: `${process.env.NEXT_PUBLIC_URL || ''}/og${post.cover}`,
                  width: 1200,
                  height: 630,
                  type: 'image/jpeg'
                }
              : undefined
          ]
        }}
      />
      <article id='content' className={clsx('prose', 'lg:prose-xl', styles.article)}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>{post.date}</p>

        {post.cover ? (
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
        ) : null}
        {post.series ? (
          <div className={styles.seriesListing}>
            <h2>This article is part of a series</h2>
            <h2>Series Title: {post.series.title}</h2>
            <ul className={styles.seriesBox}>
              {post.series.posts.map(({ slug, title }) => (
                <Link passHref={!'i dont like this hack'} href={`/posts/${slug}`} key={slug}>
                  <li className={clsx(styles.seriesItem, { [styles.activeSeriesItem]: slug === post.slug })}>
                    {title}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ) : null}
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
        <Script strategy='afterInteractive' src='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-61bfe1b0843dc42e' />
      </article>
    </Page>
  )
}

export async function getStaticProps({ params }) {
  const post = await getContentBySlug('posts', params.slug)
  return {
    props: { post }
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
