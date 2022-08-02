import { GetStaticPaths, GetStaticProps } from 'next'
// import Layout from '../../components/layout'
// import { getDocIds, getDocData, IParams, IDocData } from '../../lib/apiDocs'

// import React from 'react'

// function Document({ docData }: { docData: IDocData }) {
//   return (
//     <Layout>
//       <div dangerouslySetInnerHTML={{ __html: docData.contentHtml }} />
//     </Layout>
//   )
// }

// export default Document

// const getStaticPaths: GetStaticPaths = async () => {
//   const paths = getDocIds()
//   return {
//     paths,
//     fallback: false
//   }
// }


// const getStaticProps: GetStaticProps = async (context) => {
//   const { id } = context.params as IParams
//   const docData =await getDocData(id)
//   return {
//     props: {
//       docData
//     }
//   }
// }

// export { getStaticPaths, getStaticProps }
