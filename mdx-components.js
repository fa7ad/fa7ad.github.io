import Image from 'next/image'

// This file is required to use @next/mdx in the `app` directory.
export function useMDXComponents(components) {
  return {
    img: props => {
      if (!/^(https?:)?\/\//i.test(props.src) && !props.src.includes('.gif')) {
        const nxProps = {
          src: props.src,
          fill: true,
          alt: props.alt,
          sizes: '100vw'
        }

        if (props.src.startsWith('/images')) {
          const res = props.src.match(/_(?<width>\d+)x(?<height>\d+)\..*?$/)
          const width = res?.groups?.width
          const height = res?.groups?.height
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
        return <Image {...nxProps} />
      }
      // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
      return <img {...props} />
    },
    ...components
  }
}
