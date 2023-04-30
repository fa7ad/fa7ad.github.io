'use client'
import Script from 'next/script'
import { useEffect } from 'react'

function PrismScript() {
  useEffect(() => {
    if (!window.Prism) {
      window.Prism = { manual: true, plugins: ['line-numbers'] } as any
    }
  }, [])

  const activatePrismJs = () => {
    if (window.Prism && window.Prism.highlightAll) {
      window.Prism.highlightAll()
    }
  }

  return (
    <Script
      src='/prism.min.js'
      strategy='afterInteractive'
      onLoad={activatePrismJs}
    />
  )
}

export default PrismScript
