import clsx from 'clsx'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

import styles from './Page.module.css'
import { setTheme } from 'app/redux/ui.slice'

export const defaultNavItems = [
  {
    key: 'home',
    href: '/#',
    label: 'Home'
  },
  {
    key: 'about',
    href: '/about',
    label: 'About'
  },
  {
    key: 'contact',
    href: '/contact',
    label: 'Contact'
  }
]
const NavItem = ({ href, label, active }) => (
  <li className={clsx(styles.navItem, { [styles.navItemActive]: active })}>
    <Link href={href} className={styles.navItemLink}>
      {label}
    </Link>
  </li>
)

const Header = () => {
  const progress = useRef(null)
  const dispatch = useDispatch()
  const [navContent, setNavContent] = useState(true)
  const [headerActive, setHeaderActive] = useState(false)
  const [hideDarkModeTooltip, setHideDarkModeTooltip] = useState(true)
  const theme = useSelector(state => state.ui.theme)
  const activeNavKey = useSelector(state => state.ui.activeNavKey)

  const updateNavScroll = function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    const scrollpos = window.scrollY
    const scroll = (scrollTop / (scrollHeight - document.documentElement.clientHeight)) * 100
    if (progress.current) {
      progress.current.style.setProperty('--scroll', scroll + '%')
    }

    setHeaderActive(scrollpos > 10 || window.innerWidth < 1024)
  }

  useEffect(() => {
    document.addEventListener('scroll', updateNavScroll)
    return () => {
      document.removeEventListener('scroll', updateNavScroll)
    }
  }, [])

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setNavContent(false)
      setHeaderActive(true)
    }
  }, [])

  useEffect(() => {
    const darkModePrefs = localStorage.getItem('darkMode')
    if (!darkModePrefs && window.innerWidth >= 640) {
      setHideDarkModeTooltip(false)
      setTimeout(() => {
        setHideDarkModeTooltip(true)
      }, 3e3)
    }
    const darkMode = darkModePrefs ?? 'false'
    dispatch(setTheme(darkMode === 'true' ? 'dark' : 'light'))
  }, [dispatch])

  const toggleNavContent = () => {
    setNavContent(n => !n)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setHideDarkModeTooltip(true)
    dispatch(setTheme(newTheme))
  }

  return (
    <nav id='header' className={clsx(styles.header, { [styles.headerActive]: headerActive })}>
      <div id='progress' className={styles.progress} ref={progress} />
      <div className={styles.navContainer}>
        <div className={styles.navBrand}>
          <Link href='/'>Mildly Boring</Link>
          <button className='mx-2 cursor-pointer relative' title='Toggle Dark Mode' onClick={toggleTheme}>
            {theme === 'dark' ? '🌙' : '🌞'}
            <span className={clsx({ hidden: hideDarkModeTooltip }, styles.darkModeTooltip)} role='tooltip'>
              Toggle Dark Mode
            </span>
          </button>
        </div>

        <div className='block lg:hidden pr-4'>
          <button id='nav-toggle' className={styles.navToggle} onClick={toggleNavContent}>
            <svg className='fill-current h-3 w-3' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <title>Menu</title>
              <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
            </svg>
          </button>
        </div>

        <div className={clsx(styles.navContent, { hidden: !navContent })} id='nav-content'>
          <ul className={styles.navMenu}>
            {defaultNavItems.map(item => (
              <NavItem key={item.key} {...item} active={item.key === activeNavKey} />
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
