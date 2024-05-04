import Link from 'next/link'

export default function NotFound() {
  return (
    <article id='content' className='w-full py-10 lg:prose-xl md:max-w-4xl' data-type='page'>
      <h1>Not Found</h1>
      <h2>Could not find the requested page</h2>
      <Link
        href='/'
        role='button'
        className='inline-block rounded-full bg-primary-700 px-4 py-2 font-bold text-white hover:bg-primary-800'
      >
        Go Back
      </Link>
    </article>
  )
}
