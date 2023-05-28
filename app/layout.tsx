import Footer from 'components/Footer'
import Header from 'components/Header'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import './globals.css'

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang='en'>
      <body className='line-numbers'>
        <Header />
        <main className='main'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

const siteTitle = 'Mildly Boring'
const siteTitleTemplate = '%s | Mildly Boring'
const siteDescription =
  'Some mildly boring rants, mostly about programming; all from the mind of a bored geek (also known as Fahad/@fa7ad).'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? 'https://mildlyboring.com'),
  viewport: 'width=device-width, initial-scale=1',
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/icons/apple-touch-icon.png?v=2.0.0'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/icons/favicon-32x32.png?v=2.0.0'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/icons/favicon-16x16.png?v=2.0.0'
    },
    {
      rel: 'manifest',
      url: '/icons/site.webmanifest?v=2.0.0'
    },
    {
      rel: 'shortcut icon',
      url: '/icons/favicon.ico?v=2.0.0'
    }
  ],
  manifest: '/icons/site.webmanifest?v=2.0.0',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: siteTitle
  },
  applicationName: siteTitle,
  themeColor: '#ffffff',
  other: {
    'msapplication-config': '/icons/browserconfig.xml?v=2.0.0',
    'msapplication-TileColor': '#00aba9',
    'apple-mobile-web-app-title': siteTitle
  },
  title: {
    absolute: siteTitle,
    template: siteTitleTemplate
  },
  description: siteDescription,
  keywords: ['programming', 'tutorial', 'functional', 'blog', 'rants', 'mildlyboring', 'fa7ad', 'fahad', 'hossain'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: {
      absolute: siteTitle,
      template: siteTitleTemplate
    },
    description: siteDescription,
    emails: 'fahad@mildlyboring.com',
    siteName: siteTitle,
    images: [
      {
        url: '/og/featured/default_cover.webp',
        alt: siteTitle,
        width: 1200,
        height: 630,
        type: 'image/jpeg'
      }
    ],
    url: 'https://mildlyboring.com',
    countryName: 'Germany'
  }
}
