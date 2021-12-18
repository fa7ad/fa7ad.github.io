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
 * placeHolderImage?: String,
 * }} props
 */
function PostPreview({ excerpt, slug, title, date, cover, placeholderImage }) {
  return (
    <article className={styles.root}>
      <Link passHref href={`/posts/${slug}`}>
        <a href='#hack' className={styles.title}>
          <h3>{title}</h3>
        </a>
      </Link>
      <p className={styles.subtitle}>{date}</p>
      {cover ? (
        <p className={styles.coverImage}>
          <Image src={cover} alt='' layout='fill' placeholder='blur' blurDataURL={placeholderImage} />
        </p>
      ) : null}
      {excerpt ? <p className={styles.excerpt}>{excerpt}</p> : null}
      <Link passHref={!'fuck you, eslint'} href={`/posts/${slug}`}>
        <button className={styles.button}>Read more</button>
      </Link>
    </article>
  )
}

export default PostPreview
