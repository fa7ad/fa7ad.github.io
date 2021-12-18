import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import parse from 'html-react-parser'
import Image from 'next/image'

import Page from 'components/Page'
import { setActiveNavKey } from 'app/redux/ui.slice'
import { getAllMeta, getContentBySlug } from 'lib/content'

import styles from './Post.module.css'
import clsx from 'clsx'

export default function BlogPostFull({ post }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveNavKey('home'))
  }, [dispatch])

  return (
    <Page title={post.title}>
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
        <div className={styles.content}>{parse(post.content)}</div>
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
