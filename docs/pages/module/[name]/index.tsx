import { GetStaticPaths, GetStaticProps } from 'next'

import Layout from '../../../components/layout'
import SideBar from '../../../components/sidebar'
import {
  IParams,
  getPackageNames,
  getPackageDetails,
  PackageType
} from '../../../lib/api'

export default function Module({
  packageDetails
}: {
  packageDetails: PackageType
}) {
  
  const {data} = packageDetails
  return (
    <Layout>
      <SideBar data={data}/>
    </Layout>
  )
}





// {/* <hr /> <span></span> { item.signatures?.map(sig=>sig.comment?.summary[0]?.text)} */}
const getStaticPaths: GetStaticPaths = () => {
  const paths = getPackageNames()
  return {
    paths,
    fallback: false
  }
}

const getStaticProps: GetStaticProps = (context) => {
  // console.log(context)
  const { name } = context.params as IParams
  const packageDetails = getPackageDetails(name)
  return {
    props: {
      packageDetails
    }
  }
}

export { getStaticPaths, getStaticProps }
