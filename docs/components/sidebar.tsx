import { useState, useEffect } from 'react'
import { GroupsEntity, ChildrenEntity1 } from '../lib/api.d'
import Link from 'next/link'
import { SideBarData } from '../lib/layoutData'

const Sidebar = ({ packageDetails, packageNames }: SideBarData) => {
  console.log(packageDetails?.name)

  const getUncategorizedItems = (group: GroupsEntity) => {
    if (!group.children) return []
    const children = new Set(group.children)
    group.categories?.forEach((item) =>
      item.children?.forEach((c) => children.delete(c))
    )
    return Array.from(children)
  }

  return (
    <div>
      <ul>
        {packageNames.map((name) => (
          <li key={name}>
            <Link href={`/module/${name}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <ul>
          {packageDetails?.raw?.groups?.map((i) => (
            // this is the group type ie Classes,Interfaces etc
            <li key={i.title}>
              {i.title} ({i.children?.length})
              <ul>
                {/* map each category */}
                {i.categories?.map((c) => (
                  <li key={c.title}>
                    {c.title}
                    <ul>
                      {/* map each item of category */}
                      {c.children?.map((id) => (
                        <li key={id}>
                          {
                            packageDetails.raw.children?.find(
                              (i) => i.id === id
                            )?.name
                          }
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
                {/* if any item is not in a category then it goes here */}
                <Other groupeEntity={i} childrenEntity={packageDetails.raw.children} packageName={packageDetails.name}/>
                {/* <li>
                  Other
                  <ul>
                    {getUncategorizedItems(i).map((item) => (
                      <li key={item}>
                        {
                          packageDetails.raw.children?.find(
                            (i) => i.id === item
                          )?.name
                        }
                      </li>
                    ))}
                  </ul>
                </li> */}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      {/* {packageDetails && packageDetails.data.map((item,index)=>(
        <ApiSectionList key={index} sectionName ={item.name} items={item.children}/>
        ))} */}
    </div>
  )
}

const Other = ({
  groupeEntity,
  childrenEntity,
  packageName
}: {
  packageName:string,
  groupeEntity: GroupsEntity
  childrenEntity: ChildrenEntity1[] | null | undefined
}) => {
  const [items, setItems] = useState<number[]>([])
  const [name,setName] = useState('')
  const getUncategorizedItems = (group: GroupsEntity) => {
    if (!group.children) return []
    const children = new Set(group.children)
    group.categories?.forEach((item) =>
      item.children?.forEach((c) => children.delete(c))
    )
    return Array.from(children)
  }

  useEffect(() => {
    setItems(getUncategorizedItems(groupeEntity))
  }, [groupeEntity])
  if (!items.length) return null
  return (
    <li>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Link
              href={`/module/${packageName}/${
                childrenEntity?.find((i) => i.id === item)?.name
              }`}
            >
              <a>{childrenEntity?.find((i) => i.id === item)?.name}</a>
            </Link>{' '}
          </li>
        ))}
      </ul>
    </li>
  )
}

export default Sidebar
