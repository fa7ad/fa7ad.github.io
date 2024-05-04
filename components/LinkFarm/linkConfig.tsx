import amazonIcon from 'components/icons/amzn.svg'
import appleIcon from 'components/icons/apple.svg'
import qubozIcon from 'components/icons/qub.svg'
import soundcloudIcon from 'components/icons/soundcloud.svg'
import spotifyIcon from 'components/icons/spotify.svg'
import tidalIcon from 'components/icons/tidal.svg'
import youtubeIcon from 'components/icons/yt.svg'
import ytMusicIcon from 'components/icons/ytm.svg'
import qqMusicIcon from 'components/icons/qqm.svg'
import type Image from 'next/image'
import type { ComponentProps } from 'react'

type LinkType = 'stream' | 'buy'
export type LinkConfig = {
  icon: ComponentProps<typeof Image>
  type: LinkType
  rank: number
}

export const linkConfig: Record<string, LinkConfig> = {
  SPOTIFY: { icon: spotifyIcon, type: 'stream', rank: 1 },
  'YOUTUBE MUSIC': { icon: ytMusicIcon, type: 'stream', rank: 2 },
  'APPLE MUSIC': { icon: appleIcon, type: 'stream', rank: 3 },
  SOUNDCLOUD: { icon: soundcloudIcon, type: 'stream', rank: 4 },
  YOUTUBE: { icon: youtubeIcon, type: 'stream', rank: 5 },
  TIDAL: { icon: tidalIcon, type: 'stream', rank: 6 },
  'AMAZON MUSIC': { icon: amazonIcon, type: 'stream', rank: 7 },
  QQMUSIC: { icon: qqMusicIcon, type: 'stream', rank: 8 },
  QOBUZ: { icon: qubozIcon, type: 'stream', rank: 9 },
  ITUNES: { icon: appleIcon, type: 'buy', rank: 1 },
  AMAZON: { type: 'buy', icon: amazonIcon, rank: 2 }
}
