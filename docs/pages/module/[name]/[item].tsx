import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../../components/layout'
import { ChildrenEntity1 } from '../../../lib/api.d'
import ApiFunction from '../../../components/apiTypes/apiFunction'
import {
  getAllModulesItemsPaths,
  getModuleItem,
  // getModuleItemHtml,
  IParams
} from '../../../lib/items'
import { getLayoutData, LayoutData } from '../../../lib/layoutData'

type props = {
  itemResult: ChildrenEntity1
  layoutData: LayoutData
  // html: string
}

const Item: NextPage<props> = ({ itemResult, layoutData }) => {
  const router = useRouter()
  const { name, item } = router.query
  // console.log('html', html)

  return (
    <Layout layoutData={layoutData}>
      {itemResult.kindString==='Function' && <ApiFunction itemResult={itemResult}/>}
      {/* <div>
        <ul>
          <li>id: {itemResult.id}</li>
          <li>name: {itemResult.name}</li>
          <li>Type: {itemResult.kindString}</li>
      

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

        <div>{JSON.stringify(itemResult, null, 6)}</div>
      </div> */}

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
  // const html = await getModuleItemHtml(item)
  const layoutData = getLayoutData(name)
  return {
    props: {
      itemResult,
      layoutData,
      // html
    }
  }
}
export { getStaticProps, getStaticPaths }
export default Item
