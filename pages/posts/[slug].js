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
import { NextSeo } from 'next-seo'

export default function BlogPostFull({ post }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveNavKey('home'))
    setTimeout(() => {
      import('highlight.js').then(mod => mod.default.highlightAll())
    }, 50)
  }, [dispatch])

  return (
    <Page>
      <NextSeo
        title={post.title}
        description={post.excerpt}
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
      <article className={clsx('prose', 'lg:prose-xl', styles.article)}>
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
        <div className={styles.content}>{parse(post.content)}</div>
        <hr />
        <section id='idc_comments' className='relative'>
          <script
            type='text/javascript'
            dangerouslySetInnerHTML={{
              __html: `window.idcomments_acct = 'e1fd06a976e503ac92ce810aa47b1b50';window.idcomments_post_id = undefined;window.idcomments_post_url = undefined`
            }}
          />
          <span id='IDCommentsPostTitle' style={{ display: 'none' }} />
          {
            // eslint-disable-next-line @next/next/no-sync-scripts
            <script type='text/javascript' src='https://www.intensedebate.com/js/genericCommentWrapperV2.js' />
          }
        </section>
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
