import parse from 'html-react-parser'
import Image from 'next/image'

export default function renderHtml(content) {
  return parse(content, {
    replace: domNode => {
      if (
        domNode.name === 'img' &&
        !/^(https?:)?\/\//i.test(domNode.attribs.src)
      ) {
        const props = {
          layout: 'fill',
          src: domNode.attribs.src
        }
        if (domNode.attribs.src.startsWith('/images')) {
          const res = domNode.attribs.src.match(
            /_(?<width>\d+)x(?<height>\d+)\..*?$/
          )
          const width = res?.groups?.width
          const height = res?.groups?.height
          if (width && height) {
            props.width = width
            props.height = height
            props.layout = 'responsive'
          }
        }
        return <Image alt={domNode.attribs.alt} {...props} />
      }
    }
  })
}
