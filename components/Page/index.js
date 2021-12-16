import Script from 'next/script'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Header from './_header'
import styles from './Page.module.css'
import { setTheme } from 'app/redux/ui.slice'
import Metadata from 'components/Metadata'

const Page = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const browserPref = window.matchMedia('(prefers-color-scheme: dark)')
    const darkMode = localStorage.getItem('darkMode') ?? browserPref.matches.toString()
    dispatch(setTheme(darkMode === 'true' ? 'dark' : 'light'))
  })

  return (
    <>
      <Metadata />

      <Header />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        Built with
        <span role='img' aria-label='heart'>
          &nbsp;❤️&nbsp;
        </span>
        &nbsp;by&nbsp;
        <a href='https://github.com/fa7ad' target='_blank' rel='noopener noreferrer'>
          Fahad Hossain
        </a>
      </footer>
      <Script
        src='https://cdn.jsdelivr.net/npm/prismjs@1.25.0/components/prism-core.min.js'
        strategy='afterInteractive'
      />
      <Script
        src='https://cdn.jsdelivr.net/npm/prismjs@1.25.0/plugins/autoloader/prism-autoloader.min.js'
        strategy='afterInteractive'
      />
    </>
  )
}

export default Page
