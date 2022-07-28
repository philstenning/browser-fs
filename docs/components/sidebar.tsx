import ApiSectionList from './apiSectionList'

import type {PackageEntities} from '../lib/api'

type props={
    data:PackageEntities[]
}

const Sidebar = ({data}:props) => {
  return (
     <div>
        {data.map((item,index)=>(
        <ApiSectionList key={index} sectionName ={item.name} items={item.children}/>
        ))}
      </div>
  )
}

export default Sidebar