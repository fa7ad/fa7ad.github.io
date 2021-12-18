import Head from 'next/head'
import React from 'react'

function Metadata({ title }) {
  const pageTitle = title ? `${title} | Mildly Boring` : 'Mildly Boring'

  return (
    <Head>
      <meta charSet='UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='X-UA-Compatible' content='ie=edge' />

      <meta name='author' content='Fahad Hossain' />
      <meta name='description' content='Some mildly boring rants, mostly about programming.' />
      <meta name='keywords' content='programming,tutorial,functional,blog,rants,mildlyboring,fa7ad,fahad,hossain' />

      <title>{pageTitle}</title>

      <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png?v=1.0.0' />
      <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png?v=1.0.0' />
      <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png?v=1.0.0' />
      <link rel='manifest' href='/icons/site.webmanifest?v=1.0.0' />
      <link rel='mask-icon' href='/icons/safari-pinned-tab.svg?v=1.0.0' color='#5bbad5' />
      <link rel='shortcut icon' href='/icons/favicon.ico?v=1.0.0' />
      <meta name='apple-mobile-web-app-title' content='Mildly Boring' />
      <meta name='application-name' content='Mildly Boring' />
      <meta name='msapplication-TileColor' content='#00aba9' />
      <meta name='msapplication-config' content='/icons/browserconfig.xml?v=1.0.0' />
      <meta name='theme-color' content='#ffffff' />

      <link href='https://cdn.jsdelivr.net/npm/prismjs@1.25.0/themes/prism.css' rel='stylesheet' />
    </Head>
  )
}

export default Metadata
