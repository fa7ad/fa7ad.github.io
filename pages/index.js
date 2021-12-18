import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { compose, map, reverse, sortBy } from 'ramda'

import { getAllMeta } from 'lib/content'

import { setActiveNavKey } from 'app/redux/ui.slice'

import Page from 'components/Page'
import PostPreview from 'components/PostPreview'

import styles from './Home/Home.module.css'

export default function Home({ posts }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveNavKey('home'))
  }, [dispatch])

  return (
    <>
      <Page title='Home' className={styles.homeContainer}>
        <section className={styles.heroSection}>
          <h1>Welcome to Mildly Boring!</h1>
          <p>This is a collection of some mildly boring rants, mostly about programming.</p>
        </section>
        <section className={styles.postsSection} id='blog'>
          <h2>Blog Posts</h2>
          <div className={styles.postsList}>
            {posts?.map(post => (
              <PostPreview key={post.slug + post.date} {...post} />
            ))}
          </div>
        </section>
      </Page>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = await getAllMeta('posts', true)
  const posts = compose(
    map(post => ({ ...post, date: dayjs(post.date).format('dddd, MMMM D, YYYY HH:mm') })),
    reverse,
    sortBy(post => dayjs(post.date).unix())
  )(allPosts)
  return {
    props: { posts }
  }
}
