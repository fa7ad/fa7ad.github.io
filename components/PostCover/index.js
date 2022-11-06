import Image from 'next/image'
import styles from './PostCover.module.css'

const PostCover = ({ post }) => {
  if (!post.cover) {
    return null
  }

  return (
    <div className={styles.coverImage}>
      <Image
        src={post.cover}
        priority
        placeholder='blur'
        blurDataURL={post.placeholderImage}
        alt=''
        width={post.coverInfo.width}
        height={post.coverInfo.height}
        sizes='100vw'
        className={styles.coverImageInner}
      />
    </div>
  )
}

export default PostCover
