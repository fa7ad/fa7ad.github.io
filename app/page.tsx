import PostPreview from 'components/PostPreview'
import Content from 'lib/content'
import type { Metadata } from 'next'

const contentProvider = new Content()

export default async function Home() {
  const posts = (await contentProvider.getAll('posts')) as ProcessedPost[]

  return (
    <section className='flex w-full flex-1 flex-col items-stretch' id='blog'>
      <h1 className='mb-4 mt-6 text-center text-4xl font-bold'>Blog Posts</h1>
      <div className='block' id='content'>
        {posts?.map((post, index) => (
          <PostPreview
            {...post}
            key={post.slug + post.date}
            preload={index < 2}
          />
        ))}
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Boring you with code and stuff, ever so mildly.'
}
