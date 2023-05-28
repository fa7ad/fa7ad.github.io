import { notFound } from 'next/navigation'

import Content from 'lib/content'
import renderHtml from 'lib/renderHtml'

type PageProps = {
  params: {
    slug: string
  }
}
const contentProvider = new Content()

export default async function StaticPage({ params }: PageProps) {
  const { slug } = params
  const page = await contentProvider.getBySlug('pages', slug)

  if (!page) {
    notFound()
  }

  return (
    <article id='content' data-type='page' className='prose w-full lg:prose-xl md:max-w-4xl'>
      {renderHtml(page?.content ?? '')}
    </article>
  )
}

export async function generateStaticParams() {
  const slugs = await contentProvider.getAllSlugs('pages')
  return slugs.map(slug => ({ slug }))
}
