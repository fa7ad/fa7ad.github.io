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
        rel='me noopener noreferrer'
        href='https://c.im/@fa7ad'
        target='_blank'
        aria-label='Fahad Hossain | Mastodon - new tab'
      >
        Fahad
      </a>
      &nbsp;
      <a
        rel='me noopener noreferrer'
        href='https://github.com/fa7ad'
        target='_blank'
        aria-label='Fahad Hossain | GitHub - new tab'
      >
        Hossain
      </a>
    </footer>
  )
}

export default Footer
