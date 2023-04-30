import { useState, useEffect, RefObject } from 'react'

export default function useOnScreen(
  ref: RefObject<HTMLElement>,
  rootMargin = '0px',
  oneOff = true
) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observedEl = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(wasOnScreen =>
          oneOff && wasOnScreen ? true : entry.isIntersecting
        )
      },
      {
        rootMargin
      }
    )
    if (observedEl) {
      observer.observe(observedEl)
    }
    return () => {
      if (observedEl) {
        observer.unobserve(observedEl)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return isIntersecting
}
