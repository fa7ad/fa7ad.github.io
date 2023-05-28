import blurHashes from './blurhashes.mjs'

const metadata = {
  posts: [
    {
      title: 'Hello Blog',
      date: '2020-02-08T15:50:17.000Z',
      file: '00_hello-blog.md',
      slug: 'hello-blog',
      cover: '/featured/hello-blog-again.webp',
      coverHash: blurHashes['featured/hello-blog-again.webp']
    },
    {
      title: 'The Introduction. Functional JS Series (Part 1)',
      date: '2020-04-10T18:57:22.000Z',
      file: '01_fp-the-introduction.md',
      slug: 'fp-the-introduction',
      cover: '/featured/intro-functional-js.webp',
      coverHash: blurHashes['featured/intro-functional-js.webp'],
      series: 'fp-js'
    },
    {
      title: 'Functions. Functional JS Series (Part 2)',
      date: '2020-04-25T17:34:39.000Z',
      file: '02_fp-functions.md',
      slug: 'fp-functions',
      cover: '/featured/functions-functional-js.webp',
      coverHash: blurHashes['featured/functions-functional-js.webp'],
      series: 'fp-js'
    },
    {
      title: 'Some Higher-Order Functions. Functional JS Series (Part 3)',
      date: '2020-06-12T16:41:10.000Z',
      file: '03_fp-higher-order-functions.md',
      slug: 'fp-higher-order-functions',
      cover: '/featured/higher-order-functions-functional-js.webp',
      coverHash: blurHashes['featured/higher-order-functions-functional-js.webp'],
      series: 'fp-js'
    },
    {
      title: 'The Trials and Tribulations. Functional JS Series (Part 4)',
      date: '2020-08-16T17:38:30.000Z',
      file: '04_fp-trials-tribulations.md',
      slug: 'fp-trial-tribulations',
      cover: '/featured/trials-tribulations-functional-js.webp',
      coverHash: blurHashes['featured/trials-tribulations-functional-js.webp'],
      series: 'fp-js'
    }
  ],
  pages: [
    {
      title: 'About',
      file: 'about.md',
      slug: 'about'
    },
    {
      title: 'Contact',
      file: 'contact.md',
      slug: 'contact'
    }
  ],
  series: {
    'fp-js': {
      title: "A Fool's Guide To Writing Functional JS",
      posts: [
        {
          title: 'Part 1: The Introduction',
          slug: 'fp-the-introduction'
        },
        {
          title: 'Part 2: Functions',
          slug: 'fp-functions'
        },
        {
          title: 'Part 3: Some Higher-Order Functions',
          slug: 'fp-higher-order-functions'
        },
        {
          title: 'Part 4: The Trials and Tribulations',
          slug: 'fp-trial-tribulations'
        }
      ]
    }
  }
}

export default metadata
