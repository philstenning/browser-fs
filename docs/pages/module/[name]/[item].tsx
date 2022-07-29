import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { json } from 'stream/consumers'
import Layout from '../../../components/layout'
import SideBar from '../../../components/sidebar'
import { ChildrenEntity1 } from '../../../lib/api.d'
// import { getPackageDetails, PackageType } from '../../../lib/api'
import {
  getAllModulesItemsPaths,
  getModuleItem,
  IParams
} from '../../../lib/items'
import { getLayoutData, LayoutData } from '../../../lib/layoutData'

type props = {
  itemResult: ChildrenEntity1
  layoutData: LayoutData
}

const Item: NextPage<props> = ({ itemResult, layoutData }) => {
  const router = useRouter()
  const { name, item } = router.query
  return (
    <Layout layoutData={layoutData}>
      <main>
        <h2>{name}</h2> <h3>{item}</h3>
        {/* ts-ignore */}
        <div>
          {itemResult?.signatures
            // ?.map((sig) => sig?.comment?.summary[0]?.text)
            ?.toString()}
        </div>
        <ul>
          <li>Groups: {JSON.stringify(itemResult.groups)}</li>
        </ul>
        <div> {JSON.stringify(itemResult.signatures,null,'\t')}</div>
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
  const layoutData = getLayoutData(name)
  return {
    props: {
      itemResult,
      layoutData
    }
  }
}
export { getStaticProps, getStaticPaths }
export default Item
