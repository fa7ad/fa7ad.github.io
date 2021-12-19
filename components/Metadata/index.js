import Head from 'next/head'
import { DefaultSeo } from 'next-seo'

function Metadata() {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='X-UA-Compatible' content='ie=edge' />

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
      </Head>
      <DefaultSeo
        defaultTitle='Mildly Boring'
        titleTemplate='%s | Mildly Boring'
        description='Some mildly boring rants, mostly about programming.'
        additionalMetaTags={[
          {
            name: 'author',
            content: 'Fahad Hossain'
          },
          {
            name: 'keywords',
            content: 'programming,tutorial,functional,blog,rants,mildlyboring,fa7ad,fahad,hossain'
          }
        ]}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          site_name: 'Mildly Boring',
          profile: {
            firstName: 'Fahad',
            lastName: 'Hossain',
            username: 'fa7ad',
            gender: 'male'
          },
          defaultImageHeight: 630,
          defaultImageWidth: 1200,
          images: [
            {
              url: '/og/featured/default_cover.jpg',
              alt: 'Mildly Boring',
              width: 1200,
              height: 630,
              type: 'image/jpeg'
            }
          ]
        }}
      />
    </>
  )
}

export default Metadata
