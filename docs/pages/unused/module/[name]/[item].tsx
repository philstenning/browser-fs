import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
// import Layout from '../../../components/layout'
// import { ChildrenEntity1 } from '../../../lib/api.d'
// import ApiFunction from '../../../components/apiTypes/apiFunction'
// import {
//   getAllModulesItemsPaths,
//   getModuleItem,
//   // getModuleItemHtml,
//   IParams
// } from '../../../lib/items'
// import { getLayoutData, LayoutData } from '../../../lib/layoutData'

// type props = {
//   itemResult: ChildrenEntity1
//   layoutData: LayoutData
//   // html: string
// }

// const Item: NextPage<props> = ({ itemResult, layoutData }) => {
//   const router = useRouter()
//   const { name, item } = router.query
//   // console.log('html', html)

//   return (
//     <Layout layoutData={layoutData}>
//       {itemResult.kindString==='Function' && <ApiFunction itemResult={itemResult}/>}
     

//     </Layout>
//   )
// }

// const getStaticPaths: GetStaticPaths = () => {
//   const paths = getAllModulesItemsPaths()
//   return {
//     paths,
//     fallback: false
//   }
// }

// const getStaticProps: GetStaticProps = async (context) => {
//   const { name, item } = context.params as IParams
//   const itemResult = getModuleItem(item)
//   // const html = await getModuleItemHtml(item)
//   const layoutData = getLayoutData(name)
//   return {
//     props: {
//       itemResult,
//       layoutData,
//       // html
//     }
//   }
// }
// export { getStaticProps, getStaticPaths }
// export default Item
