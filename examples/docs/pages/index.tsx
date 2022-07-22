import React from 'react'
import type { NextPage } from 'next'
import {
  ResizableHorizontalGrid,
  ResizableVerticalGrid
} from 'react-resizable-collapsible-grid'

// import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import Layout from '../components/layout/layout'

import 'react-resizable-collapsible-grid/dist/index.css'
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <ResizableHorizontalGrid>
        <div>ok</div>
        <div>ok</div>
        <div>ok</div>
      </ResizableHorizontalGrid>
    </div>
  )
}

export default Home
