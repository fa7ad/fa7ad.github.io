import { linkConfig } from './linkConfig'
import { LinkButton } from './LinkButton'

function LinkFarm({ urls }: { urls: Record<string, string> }) {
  const streamingLinks = Object.entries(urls)
    .filter(([name]) => linkConfig[name]?.type === 'stream')
    .sort(([keyA], [keyB]) => (linkConfig[keyA].rank ?? 0) - (linkConfig[keyB].rank ?? 0))
    .map(([key, url]) => <LinkButton key={key} url={url} label={key} src={linkConfig[key].icon.src} />)

  const buyLinks = Object.entries(urls)
    .filter(([name]) => linkConfig[name]?.type === 'buy')
    .sort(([keyA], [keyB]) => (linkConfig[keyA].rank ?? 0) - (linkConfig[keyB].rank ?? 0))
    .map(([key, url]) => <LinkButton key={key} url={url} label={key} src={linkConfig[key].icon.src} />)

  return (
    <div className='flex flex-col gap-2'>
      <section className='flex flex-col gap-2'>
        <h4>Listen</h4>
        {streamingLinks}
      </section>
      <section className='flex flex-col gap-2'>
        <h4>Buy</h4>
        {buyLinks}
      </section>
    </div>
  )
}

export default LinkFarm
