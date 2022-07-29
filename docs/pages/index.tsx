import Link  from 'next/link'
import type { NextPage,GetStaticProps} from 'next'
import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import {getMarkdownFile} from '../lib/readmeFiles'
import Layout from '../components/layout'

import {getLayoutData, LayoutData} from '../lib/layoutData'

export const getStaticProps:GetStaticProps = async ()=>{
  const data =await getMarkdownFile('../../../../readme.md')
  const layoutData = getLayoutData()
  return{
    props:{
      data,
      layoutData:layoutData
    }
  }
}

type props= {data:{contentHtml:string}
layoutData:LayoutData
}

//  Route /index.html
const Home: NextPage<props> = ({data,layoutData}) => {
  return (
    <Layout layoutData={layoutData}>
      <div dangerouslySetInnerHTML={{ __html:data.contentHtml}}/>
    </Layout>
  )
}

export default Home
