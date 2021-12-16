import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import parse from 'html-react-parser'

import Page from 'components/Page'
import { setActiveNavKey } from 'app/redux/ui.slice'
import getAllPageMeta, { getPageBySlug } from 'lib/pages'

export default function ContentPage({ page }) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setActiveNavKey(page.slug))
  }, [dispatch, page.slug])
  return (
    <Page>
      <article className='prose lg:prose-xl'>{parse(page.content)}</article>
    </Page>
  )
}

export async function getStaticProps({ params }) {
  const page = await getPageBySlug(params.slug)
  return {
    props: { page }
  }
}

export async function getStaticPaths() {
  const pages = await getAllPageMeta()
  const paths = pages.map(page => ({ params: { slug: page.slug } }))
  return {
    paths,
    fallback: false
  }
}
