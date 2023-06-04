import { useState, useEffect } from 'react'

export default function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const setWindowDimensions = () => {
      setWindowWidth(window.innerWidth)
      setWindowHeight(window.innerHeight)
    }
    setWindowDimensions()
    window.addEventListener('resize', setWindowDimensions)
    return () => window.removeEventListener('resize', setWindowDimensions)
  }, [])

  return [windowWidth, windowHeight]
}
