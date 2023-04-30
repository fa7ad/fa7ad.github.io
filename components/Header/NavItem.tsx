'use client'
import clsx from 'clsx'
import Link from 'next/link'

export interface NavItemProps {
  href: string
  label: string
  active?: boolean
}

export function NavItem({ href, label, active }: NavItemProps) {
  return (
    <li
      className={clsx('mx-4 my-2 md:m-0 md:mr-3', {
        'font-bold text-primary-700 hover:text-neutral-400 dark:text-primary-700':
          active
      })}
    >
      <Link
        href={href}
        className='block px-4 py-2 no-underline hover:text-primary-600 hover:underline md:inline-block'
      >
        {label}
      </Link>
    </li>
  )
}
