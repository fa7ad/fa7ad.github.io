import Script from 'next/script'

import Header from './_header'
import Footer from './_footer'
import styles from './Page.module.css'

import Metadata from 'components/Metadata'
import clsx from 'clsx'

const Page = ({ children, title, className }) => {
  return (
    <>
      <Metadata title={title} />

      <Header />
      <main className={clsx(styles.main, className)}>{children}</main>
      <Footer />

      <Script
        strategy='afterInteractive'
        src='https://cdn.jsdelivr.net/npm/prismjs@1.25.0/components/prism-core.min.js'
      />
      <Script
        strategy='afterInteractive'
        src='https://cdn.jsdelivr.net/npm/prismjs@1.25.0/plugins/autoloader/prism-autoloader.min.js'
      />
    </>
  )
}

export default Page
