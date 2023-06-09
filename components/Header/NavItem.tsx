'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export interface NavItemProps {
  href: string
  label: string
  active?: boolean
}

export function NavItem({ href, label, active }: NavItemProps) {
  const router = useRouter()

  const handleKeyboardNavigation = (evt: React.KeyboardEvent<HTMLLIElement>) => {
    if (evt.key === 'Enter' || evt.key === ' ') {
      router.push(href)
    }
  }

  return (
    <li
      className={clsx('mx-4 my-2 focus:bg-neutral-200 focus:outline-none lg:m-0 lg:mr-3', {
        'font-bold text-primary-700 dark:text-primary-700': active
      })}
      role='menuitem'
      tabIndex={0}
      onKeyDown={handleKeyboardNavigation}
    >
      <Link
        href={href}
        className='block px-4 py-2 no-underline hover:text-primary-600 hover:underline focus:text-primary-600 focus:underline lg:inline-block'
        passHref
      >
        {label}
      </Link>
    </li>
  )
}
