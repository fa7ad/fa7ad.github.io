import Image from 'next/image'
import parse from 'html-react-parser'

import type { ComponentProps } from 'react'
import type { Element } from 'html-react-parser'

export default function renderHtml(content: string) {
  return parse(content, {
    replace: _domNode => {
      const domNode = _domNode as Element
      if (
        domNode.name === 'img' &&
        !/^(https?:)?\/\//i.test(domNode.attribs.src)
      ) {
        const props: ComponentProps<typeof Image> = {
          src: domNode.attribs.src,
          fill: true,
          alt: domNode.attribs.alt,
          sizes: '100vw'
        }
        if (domNode.attribs.src.startsWith('/images')) {
          const res = domNode.attribs.src.match(
            /_(?<width>\d+)x(?<height>\d+)\..*?$/
          )
          const width = res?.groups?.width as number | undefined
          const height = res?.groups?.height as number | undefined
          if (width && height) {
            props.width = width
            props.height = height
            props.style = {
              maxWidth: '100%',
              height: 'auto'
            }
            props.fill = false
          }
        }

        // eslint-disable-next-line jsx-a11y/alt-text
        return <Image {...props} />
      }
    }
  })
}
