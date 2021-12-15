import Header from './_header'
import styles from './Page.module.css'

const Page = ({ children }) => {
  return (
    <>
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
    </>
  )
}

export default Page
