import Image from 'next/image'

import type { MDXComponents } from 'mdx/types'
import type { ComponentProps } from 'react'

import { makeHeadingLinky } from 'lib/heading'

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: props => {
      const src = props.src || ''
      if (!/^(https?:)?\/\//i.test(src) && !src?.includes('.gif')) {
        const nxProps: ComponentProps<typeof Image> = {
          src: src,
          fill: true,
          alt: props.alt || '',
          sizes: '100vw'
        }

        if (src.startsWith('/images')) {
          const res = src.match(/_(?<width>\d+)x(?<height>\d+)\..*?$/)
          const width = res?.groups?.width
          const height = res?.groups?.height
          if (width && height) {
            nxProps.width = Number(width)
            nxProps.height = Number(height)
            nxProps.style = {
              maxWidth: '100%',
              height: 'auto'
            }
            nxProps.fill = false
          }
          if (src.includes('/prio+')) {
            nxProps.priority = true
          }
        }
        // eslint-disable-next-line jsx-a11y/alt-text
        return <Image {...nxProps} />
      }
      // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
      return <img {...props} />
    },
    style: props => <style {...props} suppressHydrationWarning />,
    h1: makeHeadingLinky('h1'),
    h2: makeHeadingLinky('h2'),
    h3: makeHeadingLinky('h3')
  }
}
