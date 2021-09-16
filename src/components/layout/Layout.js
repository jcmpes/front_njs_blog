import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Navbar from './Navbar'


const Layout = ({ children, title = 'This is the default title' }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet='utf-8' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
    <header>
      <Navbar />
    </header>
    {children}
    <footer>
      <hr />
      <span>{"JCM @copyright 2021"}</span>
    </footer>
  </div>
)

export default Layout