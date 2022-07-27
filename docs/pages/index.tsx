import Link  from 'next/link'
import type { NextPage,GetStaticProps} from 'next'
import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import {getDocs, AllDocs} from '../lib/apiDocs'
import Layout from '../components/layout'

export const getStaticProps:GetStaticProps = async ()=>{
  const allDocs = getDocs()
  return{
    props:{
      allDocs
    }
  }
}

type props= {allDocs:AllDocs[]}

const Home: NextPage<props> = ({allDocs}) => {
  return (
    <Layout>
    <ul>

     {allDocs.map(file=>(<li key={file.id}> 
     <Link href={`/docs/${file.id}`}>
          <a>Home</a>
        </Link>
     </li>))}
    
    </ul>

    </Layout>
  )
}

export default Home
