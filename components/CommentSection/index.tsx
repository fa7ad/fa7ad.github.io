'use client'
import React, { useRef } from 'react'
import { DiscussionEmbed } from 'disqus-react'

import useOnScreen from 'lib/hooks/useOnScreen'
interface CommentSectionProps {
  post: ProcessedPost
}

function CommentSection({ post }: CommentSectionProps) {
  const comments = useRef<HTMLElement>(null)
  const commentsVisible = useOnScreen(comments, '-10px')

  return (
    <section
      id='comments_section'
      className='relative rounded-sm bg-neutral-700 p-5'
      ref={comments}
    >
      {commentsVisible ? (
        <DiscussionEmbed
          shortname='mildly-boring'
          config={{
            url: `${process.env.NEXT_PUBLIC_URL || ''}/posts/${post.slug}`,
            identifier: post.slug,
            title: post.title
          }}
        />
      ) : null}
    </section>
  )
}

export default CommentSection
