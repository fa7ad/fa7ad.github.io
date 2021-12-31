import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  html = React.createRef()

  componentDidMount() {
    const darkMode = localStorage.getItem('darkMode')
    this.html.classList.toggle('dark', darkMode === 'true')
  }

  render() {
    return (
      <Html lang='en' ref={this.html}>
        <Head />
        <body className='line-numbers'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
