'use client'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(true)
  const [hideDarkModeTooltip, setHideDarkModeTooltip] = useState(true)

  const toggleTheme = () => {
    setHideDarkModeTooltip(true)
    setDarkMode(isDark => !isDark)
    document.documentElement.classList.toggle('dark', !darkMode)
    localStorage.setItem('darkMode', String(!darkMode))
  }

  useEffect(() => {
    const darkModePrefs = localStorage.getItem('darkMode')
    const isDarkModeActive = darkModePrefs !== 'false'
    if (!darkModePrefs && window.innerWidth >= 640) {
      setHideDarkModeTooltip(false)
      setTimeout(() => {
        setHideDarkModeTooltip(true)
      }, 3e3)
    }
    setDarkMode(isDarkModeActive)
    document.documentElement.classList.toggle('dark', isDarkModeActive)
  }, [])

  return (
    <button title='Toggle Dark Mode' onClick={toggleTheme} className='relative mx-2 cursor-pointer'>
      {darkMode ? '🌙' : '🌞'}
      <span className={clsx('darkModeTooltip', hideDarkModeTooltip && 'hidden')} role='tooltip'>
        Toggle Dark Mode
      </span>
    </button>
  )
}
