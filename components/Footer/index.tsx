function Footer() {
  return (
    <footer className='flex flex-1 items-center justify-center bg-white py-6 text-neutral-900 shadow-inner dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-primary-900'>
      Built with
      <span role='img' aria-label='heart'>
        &nbsp;❤️&nbsp;
      </span>
      &nbsp;by&nbsp;
      <a
        rel='me noopener noreferrer'
        href='https://c.im/@fa7ad'
        target='_blank'
        aria-label='open Mastodon profile "Fahad Hossain" in a new tab'
      >
        Fahad
      </a>
      &nbsp;
      <a
        rel='me noopener noreferrer'
        href='https://github.com/fa7ad'
        target='_blank'
        aria-label='open GitHub profile "Fahad Hossain" in a new tab'
      >
        Hossain
      </a>
    </footer>
  )
}

export default Footer
