import { Suspense, type PropsWithChildren } from 'react'
import PrismScript from 'components/Prism/PrismScript'

export default function PostsLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Suspense>
      <article id='content' className='prose w-full lg:prose-xl dark:text-white md:max-w-4xl'>
        {children}
        <PrismScript />
      </article>
    </Suspense>
  )
}
