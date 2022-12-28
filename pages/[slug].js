import Page from 'components/Page'
import { NextSeo } from 'next-seo'

import Content from 'lib/content'
import renderHtml from 'lib/renderHtml'
import useNavKey from 'lib/hooks/useNavKey'

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

const contentProvider = new Content()

export async function getStaticProps({ params }) {
  const page = await contentProvider.getBySlug('pages', params.slug)
  return {
    props: { page }
  }
}

export async function getStaticPaths() {
  const paths = await contentProvider.getAllPaths('pages')
  return {
    paths,
    fallback: false
  }
}
