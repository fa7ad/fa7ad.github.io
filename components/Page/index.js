import clsx from 'clsx'

import Header from './_header'
import Footer from './_footer'
import styles from './Page.module.css'

import Metadata from 'components/Metadata'

const Page = ({ children, className }) => {
  return (
    <>
      <Metadata />
      <a className={styles.skipToContent} href='#content' tabIndex={0}>
        Skip to content
      </a>
      <Header />
      <main className={clsx(styles.main, className)}>{children}</main>
      <Footer />
    </>
  )
}

export default Page
