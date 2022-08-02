import { GetStaticPaths, GetStaticProps } from 'next'

// import Layout from '../../../components/layout'

// import {
//   IParams,
//   getPackageNamesWithParams,
//   getPackageDetails,
//   PackageDetails
// } from '../../../lib/api'

// import {getLayoutData, LayoutData} from '../../../lib/layoutData'



// type Props ={
//   layoutData:LayoutData
// }

// // Route /module/fsa-module-name
// export default function Module({
//   layoutData
// }: Props) {
  
  
//   return (
//     <Layout layoutData={layoutData} >
//       <h1>content here</h1>
//     </Layout>
//   )
// }





// {/* <hr /> <span></span> { item.signatures?.map(sig=>sig.comment?.summary[0]?.text)} */}
// const getStaticPaths: GetStaticPaths = () => {
//   const paths = getPackageNamesWithParams()
//   return {
//     paths,
//     fallback: false
//   }
// }

// const getStaticProps: GetStaticProps = (context) => {
//   // console.log(context)
//   const { name } = context.params as IParams

//   const layoutData = getLayoutData(name)
//   return {
//     props: {
//       layoutData
//     }
//   }
// }

// export { getStaticPaths, getStaticProps }
