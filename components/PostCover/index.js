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
        layout='responsive'
        width={post.coverInfo.width}
        height={post.coverInfo.height}
        objectPosition='top center'
      />
    </div>
  )
}

export default PostCover
