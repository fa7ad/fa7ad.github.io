import styles from './Page.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      Built with
      <span role='img' aria-label='heart'>
        &nbsp;❤️&nbsp;
      </span>
      &nbsp;by&nbsp;
      <a
        href='https://github.com/fa7ad'
        target='_blank'
        rel='noopener noreferrer'
        aria-label='Fahad Hossain | GitHub - new tab'
      >
        Fahad Hossain
      </a>
    </footer>
  )
}

export default Footer
