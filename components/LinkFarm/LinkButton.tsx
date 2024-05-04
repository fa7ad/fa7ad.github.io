import Image from 'next/image'

export interface LinkButtonProps {
  url: string
  label: string
  src: React.ComponentProps<typeof Image>['src']
}

export function LinkButton(props: LinkButtonProps) {
  return (
    <a
      href={props.url}
      target='_blank'
      rel='noreferrer'
      role='button'
      className='inline-flex items-center gap-1 rounded-full bg-neutral-300 px-4 py-2 text-xl text-black no-underline hover:bg-neutral-500 dark:bg-neutral-700 dark:text-white'
    >
      <Image src={props.src} alt='' width={24} height={24} />
      <span className='flex-1 text-center'>{props.label}</span>
      <span role='presentation' className='w-[24px]'></span>
    </a>
  )
}
