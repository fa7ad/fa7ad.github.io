import Image from 'next/image'

interface PostCoverProps {
  post: ProcessedPost
}

const PostCover = ({ post }: PostCoverProps) => {
  if (!post.cover) {
    return null
  }

  return (
    <div className='relative block w-full overflow-hidden rounded object-cover object-center'>
      <Image
        src={post.cover}
        priority
        placeholder='blur'
        blurDataURL={post.placeholderImage ?? undefined}
        alt={`Cover image for "${post.title}"`}
        width={post.coverInfo?.width}
        height={post.coverInfo?.height}
        sizes='100vw'
        className='h-auto w-full object-top'
      />
    </div>
  )
}

export default PostCover
