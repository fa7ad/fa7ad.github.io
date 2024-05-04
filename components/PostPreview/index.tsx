import Image from 'next/image'
import Link from 'next/link'

interface PostPreviewProps extends PostMetadata {
  preload: boolean
}

function PostPreview({
  description,
  slug,
  title,
  date,
  cover,
  placeholderImage,
  preload,
  coverInfo
}: PostPreviewProps) {
  return (
    <article className='my-4 block rounded bg-white p-4 pt-2 shadow dark:bg-neutral-800'>
      <Link href={`/posts/${slug}`} className='mb-1 mt-3 block text-3xl font-bold text-primary-600'>
        <h2>{title}</h2>
      </Link>
      <p className='block text-sm italic text-neutral-600 dark:text-neutral-300'>{date}</p>
      {cover ? (
        <p className='relative my-4 block h-48 w-full overflow-hidden rounded md:h-[30rem]'>
          <Image
            src={cover}
            alt=''
            role='presentation'
            placeholder={placeholderImage ? 'blur' : undefined}
            blurDataURL={placeholderImage ?? undefined}
            priority={!!preload}
            sizes='100vw'
            width={coverInfo?.width}
            height={coverInfo?.height}
            fill={!coverInfo}
            className='h-full object-cover object-center'
          />
        </p>
      ) : null}
      {description ? <p className='my-4 whitespace-pre-wrap font-mono dark:text-neutral-100'>{description}</p> : null}
      <Link
        href={`/posts/${slug}`}
        className='inline-block rounded-full bg-primary-700 px-4 py-2 font-bold text-white hover:bg-primary-800'
        role='button'
      >
        Read article
      </Link>
    </article>
  )
}

export default PostPreview
