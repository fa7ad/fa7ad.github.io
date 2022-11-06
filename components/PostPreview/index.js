import Image from 'next/image'
import Link from 'next/link'
import styles from './PostPreview.module.css'

/**
 * @param {{
 * slug: String,
 * title: String,
 * date: String,
 * excerpt?: String,
 * cover?: String,
 * coverAlt?: String,
 * placeHolderImage?: String,
 * }} props
 */
function PostPreview({ excerpt, slug, title, date, cover, placeholderImage }) {
  return (
    <article className={styles.root}>
      <Link href={`/posts/${slug}`} className={styles.title}>
        <h2>{title}</h2>
      </Link>
      <p className={styles.subtitle}>{date}</p>
      {cover ? (
        <p className={styles.coverImage}>
          <Image
            src={cover}
            alt=''
            role='presentation'
            layout='fill'
            placeholder='blur'
            blurDataURL={placeholderImage}
            objectFit='cover'
            objectPosition='center'
          />
        </p>
      ) : null}
      {excerpt ? <p className={styles.excerpt}>{excerpt}</p> : null}
      <Link
        passHref={!'fuck you, eslint'}
        href={`/posts/${slug}`}
        legacyBehavior
      >
        <button className={styles.button}>Read more</button>
      </Link>
    </article>
  )
}

export default PostPreview
