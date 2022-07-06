import clsx from 'clsx'
import Script from 'next/script'
import { useEffect, useRef } from 'react'
import { NextSeo } from 'next-seo'
import { useDispatch } from 'react-redux'

import renderHtml from 'lib/renderHtml'
import useOnScreen from 'lib/hooks/useOnScreen'
import { getAllMeta, getContentBySlug } from 'lib/content'

import Page from 'components/Page'
import PostCover from 'components/PostCover'
import ArticleSeriesBox from 'components/ArticleSeriesBox'
import { KATEX_CSS, DiscussionEmbed } from 'components/ThirdParty'

import { setActiveNavKey } from 'app/redux/ui.slice'
import styles from './Post.module.css'

export default function BlogPostFull({ post, ogImages }) {
  const dispatch = useDispatch()
  const comments = useRef(null)
  const commentsVisible = useOnScreen(comments, '-10px')

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
      />
      {post?.content?.includes('katex') ? <link {...KATEX_CSS} /> : null}
      <article
        id='content'
        className={clsx('prose', 'lg:prose-xl', styles.article)}
      >
        <PostCover post={post} />
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>{post.date}</p>
        <ArticleSeriesBox post={post} />
        <div id='readable_content'>{renderHtml(post.content)}</div>
        <hr />
        <section id='comments_section' className='relative' ref={comments}>
          {commentsVisible ? (
            <DiscussionEmbed
              shortname='mildly-boring'
              config={{
                url: `${process.env.NEXT_PUBLIC_URL || ''}/posts/${post.slug}`,
                identifier: post.slug,
                title: post.title
              }}
            />
          ) : null}
        </section>
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
