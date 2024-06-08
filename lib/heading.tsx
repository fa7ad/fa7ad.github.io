import type { ComponentProps } from 'react'

export function makeHeadingLinky<T extends 'h1' | 'h2' | 'h3' | 'h4' | 'h5'>(level: T): React.FC<ComponentProps<T>> {
  const Comp: string = level
  return function HeadingX({ children, ...props }) {
    const id = props.id || children?.toString().toLowerCase().replace(/\W/g, ' ').trim().replaceAll(' ', '-')
    const render = <Comp {...props}>{children}</Comp>
    return (
      <a id={id} href={`#${id}`} className='no-underline'>
        {render}
      </a>
    )
  }
}
