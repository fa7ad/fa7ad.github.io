const footerStyles = {
  boxShadow: `0 -1px 2px 0 var(--color-neutral-200)`
}

function Footer() {
  return (
    <footer
      className='flex flex-1 items-center justify-center bg-white py-6 text-neutral-900'
      style={footerStyles}
    >
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
