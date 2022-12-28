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
 * preload?: Boolean,
 * }} props
 */
function PostPreview({
  excerpt,
  slug,
  title,
  date,
  cover,
  placeholderImage,
  preload
}) {
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
            placeholder='blur'
            blurDataURL={placeholderImage}
            priority={preload}
            fill
            sizes='100vw'
            className={styles.coverImageInner}
          />
        </p>
      ) : null}
      {excerpt ? <p className={styles.excerpt}>{excerpt}</p> : null}
      <Link href={`/posts/${slug}`} className={styles.button} role='button'>
        Read more
      </Link>
    </article>
  )
}

export default PostPreview
