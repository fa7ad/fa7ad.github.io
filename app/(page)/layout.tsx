import type { PropsWithChildren } from 'react'

export default function PageLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <article id='content' data-type='page' className='prose w-full lg:prose-xl md:max-w-4xl'>
      {children}
    </article>
  )
}
