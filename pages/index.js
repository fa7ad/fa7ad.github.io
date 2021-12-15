import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Metadata from 'components/Metadata'
import { setActiveNavKey, setTheme } from 'app/redux/ui.slice'

import styles from './Home/Home.module.css'
import Page from 'components/Page'

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    const browserPref = window.matchMedia('(prefers-color-scheme: dark)')
    const darkMode = localStorage.getItem('darkMode') ?? browserPref.matches.toString()
    dispatch(setTheme(darkMode === 'true' ? 'dark' : 'light'))
    dispatch(setActiveNavKey('home'))
  }, [dispatch])

  return (
    <>
      <Metadata />
      <Page>
        <h1 className={styles.title}>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href='https://nextjs.org/docs' className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href='https://nextjs.org/learn' className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href='https://github.com/vercel/next.js/tree/master/examples' className={styles.card}>
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </Page>
    </>
  )
}
