import styles from './Page.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      Built with
      <span role='img' aria-label='heart'>
        &nbsp;❤️&nbsp;
      </span>
      &nbsp;by&nbsp;
      <a href='https://github.com/fa7ad' target='_blank' rel='noopener noreferrer'>
        Fahad Hossain
      </a>
      <link href='https://cdn.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.min.css' rel='stylesheet' />
    </footer>
  )
}

export default Footer
