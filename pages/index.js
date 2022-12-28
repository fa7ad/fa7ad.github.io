import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextSeo } from 'next-seo'

import Content from 'lib/content'

import { setActiveNavKey } from 'store/redux/ui.slice'

import Page from 'components/Page'
import PostPreview from 'components/PostPreview'

import styles from './Home/Home.module.css'

export default function Home({ posts }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveNavKey('home'))
  }, [dispatch])

  return (
    <Page className={styles.homeContainer}>
      <NextSeo title='Boring you with code ever so mildly' titleTemplate='%s' />
      <section className={styles.postsSection} id='blog'>
        <h1>Blog Posts</h1>
        <div className={styles.postsList} id='content'>
          {posts?.map((post, index) => (
            <PostPreview
              key={post.slug + post.date}
              preload={index < 2}
              {...post}
            />
          ))}
        </div>
      </section>
    </Page>
  )
}

const contentProvider = new Content()

export async function getStaticProps() {
  const posts = await contentProvider.getAll('posts')

  return {
    props: { posts }
  }
}
