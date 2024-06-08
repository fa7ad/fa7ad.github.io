/* eslint-disable jsx-a11y/heading-has-content */
import clsx from 'clsx'
import { makeHeadingLinky } from 'lib/heading'

import type { ComponentProps } from 'react'

export function Head3(props: ComponentProps<'h3'>) {
  const H3 = makeHeadingLinky('h3')
  return <H3 {...props} className={clsx(props?.className, '!mb-0 text-center !text-2xl')} />
}

export function SmallCenteredContainer(props: ComponentProps<'div'>) {
  return <div {...props} className={clsx(props?.className, 'mx-auto max-w-[360px]')} />
}

export function BorderedBox(props: ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={clsx(props?.className, 'mb-2 border border-dashed border-secondary-400 px-4 pb-16 pt-4')}
    />
  )
}
