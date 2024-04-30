'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { NavItem } from './NavItem'
import { DarkModeToggle } from './DarkModeToggle'
import useWindowSize from 'lib/hooks/useWindowSize'

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

const Header = () => {
  const [navContent, setNavContent] = useState(false)
  const [headerActive, setHeaderActive] = useState(false)
  const [scrollPosition, setScrollPosition] = useState('0%')
  const [windowWidth] = useWindowSize()

  const pathname = usePathname()

  const currentPath = pathname.split('/').filter(Boolean)?.[0] ?? 'home'

  const updateNavScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    const scrollpos = window.scrollY
    const scroll = (scrollTop / (scrollHeight - document.documentElement.clientHeight)) * 100

    setScrollPosition(`${Math.round(scroll * 1000) / 1000}%`)
    setHeaderActive(scrollpos > 10 || window.innerWidth < 1024)
  }, [])

  const handleNavigation = useCallback((evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (evt.currentTarget.querySelector('a')) {
      Promise.resolve().then(() => setNavContent(false))
    }
  }, [])

  const handleKeyboardNavigation = useCallback((evt: React.KeyboardEvent<HTMLDivElement>) => {
    if (evt.key === 'Enter' && evt.currentTarget.querySelector('a')) {
      Promise.resolve().then(() => setNavContent(false))
    }
  }, [])

  useEffect(() => {
    document.addEventListener('scroll', updateNavScroll)
    return () => document.removeEventListener('scroll', updateNavScroll)
  }, [updateNavScroll])

  const toggleNavContent = () => {
    setNavContent(n => !n)
  }

  const showNavMenu = windowWidth >= 1024 || navContent
  const showNavBackground = windowWidth < 1024 || headerActive

  return (
    <>
      <a
        tabIndex={0}
        href='#content'
        className='absolute left-0 top-0 bg-white p-2 text-black opacity-0 transition-opacity duration-300 ease-in-out focus:z-50 focus:opacity-100'
      >
        Skip to content
      </a>
      <nav
        id='header'
        className={clsx(
          'fixed top-0 z-10 w-full',
          showNavBackground &&
            'bg-white text-neutral-800 shadow dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-primary-950'
        )}
      >
        <style>{`
          #header {
            --scroll: ${scrollPosition};
          }
        `}</style>
        <div
          id='progress'
          className='top-0 z-20 h-1 bg-gradient-to-r from-[var(--color-primary-500)_var(--scroll)] to-0% transition-all'
        />
        <div className='mx-auto mt-0 flex w-full flex-wrap items-center justify-between py-3 md:max-w-4xl'>
          <div className='pl-4'>
            <Link href='/' className='text-xl font-extrabold text-inherit no-underline hover:no-underline'>
              Mildly Boring
            </Link>
            <DarkModeToggle />
          </div>

          <div className='block pr-4 lg:hidden'>
            <button
              id='nav-toggle'
              className='flex appearance-none items-center rounded border border-primary-600 px-3 py-2 text-primary-600 outline-primary-100 focus:outline-dotted focus:outline-1'
              onClick={toggleNavContent}
            >
              <svg className='h-3 w-3 fill-current' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <title>Menu</title>
                <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
              </svg>
            </button>
          </div>

          <div
            className={clsx('z-20 mt-2 w-full flex-grow bg-transparent lg:mt-0 lg:flex lg:w-auto lg:items-center', {
              hidden: !showNavMenu
            })}
            role='none'
            id='nav-content'
            onClickCapture={handleNavigation}
            onKeyDownCapture={handleKeyboardNavigation}
          >
            <ul className='flex-1 list-none items-center justify-end p-0 lg:flex' role='menu'>
              {defaultNavItems.map(item => (
                <NavItem {...item} key={item.key} active={item.key === currentPath} />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
