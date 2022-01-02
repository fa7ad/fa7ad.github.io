import { useState, useEffect } from 'react'

export default function useOnScreen(ref, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observedEl = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting)
      },
      {
        rootMargin
      }
    )
    if (observedEl) {
      observer.observe(observedEl)
    }
    return () => {
      observer.unobserve(observedEl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return isIntersecting
}
