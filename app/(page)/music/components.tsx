/* eslint-disable jsx-a11y/heading-has-content */
import clsx from 'clsx'

import type { ComponentProps } from 'react'

export function Head3(props: ComponentProps<'h3'>) {
  return <h3 {...props} className={clsx(props?.className, '!mt-0 text-center !text-2xl')} />
}

export function SmallCenteredContainer(props: ComponentProps<'div'>) {
  return <div {...props} className={clsx(props?.className, 'mx-auto max-w-[360px]')} />
}

export function BorderedBox(props: ComponentProps<'div'>) {
  return (
    <div {...props} className={clsx(props?.className, 'mb-2 border border-dashed border-secondary-400 px-4 py-8')} />
  )
}
