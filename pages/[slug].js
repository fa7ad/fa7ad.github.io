import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import parse from 'html-react-parser'

import Page from 'components/Page'
import { setActiveNavKey } from 'app/redux/ui.slice'
import { getAllMeta, getContentBySlug } from 'lib/content'
import { NextSeo } from 'next-seo'

export default function ContentPage({ page }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveNavKey(page.slug))
  }, [dispatch, page.slug])

  return (
    <Page>
      <NextSeo title={page.title} description={page.excerpt} />
      <article className='prose lg:prose-xl w-full md:max-w-4xl px-4' id='content'>
        {parse(page.content)}
      </article>
    </Page>
  )
}

export async function getStaticProps({ params }) {
  const page = await getContentBySlug('pages', params.slug)
  return {
    props: { page }
  }
}

export async function getStaticPaths() {
  const pages = await getAllMeta('pages')
  const paths = pages.map(page => ({ params: { slug: page.slug } }))
  return {
    paths,
    fallback: false
  }
}
