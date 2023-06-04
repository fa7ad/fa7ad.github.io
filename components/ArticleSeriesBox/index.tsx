import clsx from 'clsx'
import Link from 'next/link'

type ArticleSeriesBoxProps = SeriesMap[string] & {
  activeSlug: string
}

function ArticleSeriesBox({ activeSlug, title, posts }: ArticleSeriesBoxProps) {
  const getSeriesItemClassName = (slug: string) =>
    clsx(
      'text-base text-center py-6 my-0 cursor-pointer relative',
      'hover:bg-white hover:dark:bg-black',
      slug === activeSlug && 'bg-white dark:bg-black'
    )

  return (
    <div className='not-prose mx-auto flex max-w-sm flex-col md:float-right md:my-4 md:ml-6 md:rounded-md md:border-2 md:border-dashed md:border-neutral-300 md:p-4 md:dark:border-neutral-800'>
      <h2 className='mt-0 text-center text-sm font-bold'>This article is part of a series</h2>
      <h2 className='mb-2 text-sm'>
        <b className='text-bold'>Series Title</b>: {title}
      </h2>
      <ul className='list-none divide-y-[1px] divide-neutral-300 overflow-hidden rounded bg-neutral-200 p-0 shadow dark:divide-neutral-600 dark:bg-neutral-700 dark:shadow-neutral-800'>
        {posts.map(({ slug, title }) => (
          <li key={slug} className={getSeriesItemClassName(slug)}>
            <Link href={`/posts/${slug}`} className='absolute inset-0 inline-grid place-content-center no-underline'>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ArticleSeriesBox
