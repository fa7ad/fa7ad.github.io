import clsx from 'clsx'
import Link from 'next/link'
import styles from './ArticleSeriesBox.module.css'

const ArticleSeriesBox = ({ post }) => {
  if (!post.series) {
    return null
  }

  const getSeriesItemClassName = slug =>
    clsx(styles.seriesItem, {
      [styles.activeSeriesItem]: slug === post.slug
    })

  return (
    <div className={styles.seriesListing}>
      <h2>This article is part of a series</h2>
      <h2>Series Title: {post.series.title}</h2>
      <ul className={styles.seriesBox}>
        {post.series.posts.map(({ slug, title }) => (
          <Link
            key={slug}
            href={`/posts/${slug}`}
            passHref={!'i dont like this hack'}
          >
            <li className={getSeriesItemClassName(slug)}>{title}</li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default ArticleSeriesBox
