import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import { ChildrenEntity1 } from '../../../lib/api.d'
// import { getPackageDetails, PackageType } from '../../../lib/api'
import {
  getAllModulesItemsPaths,
  getModuleItem,
  getModuleItemHtml,
  IParams
} from '../../../lib/items'
import { getLayoutData, LayoutData } from '../../../lib/layoutData'

type props = {
  itemResult: ChildrenEntity1
  layoutData: LayoutData
  html: string
}

const Item: NextPage<props> = ({ itemResult, layoutData, html }) => {
  const router = useRouter()
  const { name, item } = router.query
  console.log('html', html)
  return (
    <Layout layoutData={layoutData}>
      <div>
        <ul>
          <li>id: {itemResult.id}</li>
          <li>name: {itemResult.name}</li>
          <li>Type: {itemResult.kindString}</li>
          {/* <li>comment:{itemResult.comment?.summary}</li> */}

          <li>Type: {itemResult.sources && itemResult.sources[0].url}</li>

          <li>
            summery
            <ul>
              {itemResult?.signatures
                ?.find((f) => f.kindString === 'Call signature')
                ?.comment?.summary?.map((i) => (
                  <li key={i?.text}>{i?.text}</li>
                ))}
            </ul>
          </li>
          <li>
            {itemResult?.signatures
              ?.find((f) => f.kindString === 'Call signature')
              ?.comment?.blockTags?.map((i) => i.tag)}
            {': '}
            {itemResult?.signatures
              ?.find((f) => f.kindString === 'Call signature')
              ?.comment?.blockTags?.map((i) => i.content?.map((f) => f?.text))}
          </li>
          <li>
            Params
            <ul>
              {itemResult.signatures
                ?.find((f) => f.kindString === 'Call signature')
                ?.parameters?.map((m) => (
                  <li key={m.id}> {m.name}</li>
                  // TODO! split up into components
                ))}
            </ul>
          </li>
        </ul>
        <hr />
        <div dangerouslySetInnerHTML={{ __html: html }} />

        {/* <div>{html}</div> */}
        <div>{JSON.stringify(itemResult, null, 6)}</div>
      </div>

      {/* <main>
        <h2>{name}</h2> <h3>{item}</h3>
     
        <div>
          {itemResult?.signatures
            // ?.map((sig) => sig?.comment?.summary[0]?.text)
            ?.toString()}
        </div>
        <ul>
          <li>Groups: {JSON.stringify(itemResult.groups)}</li>
        </ul>
        <div> {JSON.stringify(itemResult.signatures,null,'\t')}</div>
      </main> */}
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

const getStaticProps: GetStaticProps = async (context) => {
  const { name, item } = context.params as IParams
  const itemResult = getModuleItem(item)
  const html = await getModuleItemHtml(item)
  const layoutData = getLayoutData(name)
  return {
    props: {
      itemResult,
      layoutData,
      html
    }
  }
}
export { getStaticProps, getStaticPaths }
export default Item
