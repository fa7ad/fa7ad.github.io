import Page from 'components/Page'
import { NextSeo } from 'next-seo'

import renderHtml from 'lib/renderHtml'
import useNavKey from 'lib/hooks/useNavKey'
import { getAllMeta, getContentBySlug } from 'lib/content'

import styles from './pages/Pages.module.css'

export default function ContentPage({ page }) {
  useNavKey(page.slug)

  return (
    <Page>
      <NextSeo title={page.title} description={page.excerpt} />
      <article id='content' className={styles.pageContent}>
        {renderHtml(page.content)}
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
