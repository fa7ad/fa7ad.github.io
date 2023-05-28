import Image from 'next/image'

interface PostCoverProps {
  src: string
  title: string
  placeholderImage: string | null
  coverInfo?: { width: number; height: number } | null
}

function PostCover({ src, title, coverInfo, placeholderImage }: PostCoverProps) {
  return (
    <div className='relative block overflow-hidden rounded'>
      <Image
        src={src}
        priority
        placeholder='blur'
        blurDataURL={placeholderImage ?? undefined}
        alt={`Cover image for "${title}"`}
        width={coverInfo?.width}
        height={coverInfo?.height}
        sizes='100vw'
        className='h-auto w-full object-cover object-center'
      />
    </div>
  )
}

export default PostCover
