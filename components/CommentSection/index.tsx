'use client'
import React, { useEffect, useRef } from 'react'
import { DiscussionEmbed } from 'disqus-react'

import useOnScreen from 'lib/hooks/useOnScreen'
interface CommentSectionProps {
  slug: string
  title: string
}

function siteUrl(url: string) {
  return `${process.env.NEXT_PUBLIC_URL || ''}${url}`
}

function CommentSection({ slug, title }: CommentSectionProps) {
  const mut$ = useRef<MutationObserver>()
  const comments = useRef<HTMLElement>(null)
  const commentsVisible = useOnScreen(comments, '-10px')

  const disqusConfig = {
    url: siteUrl(`/posts/${slug}`),
    identifier: slug,
    title: title
  } as const

  useEffect(() => {
    if (!mut$.current) {
      mut$.current = new MutationObserver(() => {
        setTimeout(() => {
          const disq = window.DISQUS as { reset(config: any): void }
          disq?.reset({
            reload: true
          })
        }, 500)
      })
    }

    const observer = mut$.current

    observer.observe(document.documentElement, {
      attributes: true,
      subtree: false
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      id='comments_section'
      className='relative rounded-sm md:border-2 md:border-dashed md:border-neutral-300 md:p-4 md:dark:border-neutral-800'
      ref={comments}
    >
      {commentsVisible ? (
        <DiscussionEmbed shortname='mildly-boring' config={disqusConfig} />
      ) : (
        <div className='text-center'>Loading...</div>
      )}
    </section>
  )
}

export default CommentSection
