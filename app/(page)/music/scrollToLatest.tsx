'use client'

import { useEffect } from 'react'

export default function RunSideEffect() {
  useEffect(() => {
    if (history.length < 3 && !location.hash) {
      document.querySelector('#latest')?.scrollIntoView({
        behavior: 'smooth',
        block: window.innerWidth < 480 ? 'nearest' : 'center'
      })
    }
  }, [])

  return null
}
