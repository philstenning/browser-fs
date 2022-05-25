import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout/Layout'
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
     <Layout>
       <div>ok</div>
     </Layout>
    </div>
  )
}

export default Home
