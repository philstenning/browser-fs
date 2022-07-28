import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import SideBar from '../../../components/sidebar'
import { ChildrenEntity1 } from '../../../lib/api.d'
import { getPackageDetails, PackageType } from '../../../lib/api'
import {
  getAllModulesItemsPaths,
  getModuleItem,
  IParams
} from '../../../lib/items'

type props = {
  itemResult: ChildrenEntity1
  packageInfo:PackageType
}

const Item: NextPage<props> = ({ itemResult, packageInfo }) => {
  const router = useRouter()
  const { name, item } = router.query
  return (
    <Layout>
      <SideBar data={packageInfo.data}/>
      <main>
      <h2>{name}</h2> <h3>{item}</h3>
       <div>{ (itemResult?.signatures?.map(sig=> sig?.comment?.summary[0]))?.toString() }</div>
      </main>

    </Layout>
  )
}

const getStaticPaths: GetStaticPaths = () => {
  const paths = getAllModulesItemsPaths()
  return {
    paths,
    fallback: false
  }
}

const getStaticProps: GetStaticProps = (context) => {
  console.log(context)
  const { name, item } = context.params as IParams
  const itemResult = getModuleItem(item)
  const packageInfo = getPackageDetails(name)
  return {
    props: {
      itemResult,
      packageInfo
    }
  }
}
export { getStaticProps, getStaticPaths }
export default Item
