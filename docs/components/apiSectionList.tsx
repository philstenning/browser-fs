import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChildrenEntity1 } from '../lib/api.d'

type ApiSectionListProps={
  sectionName:string,
  items:ChildrenEntity1[]
}

function ApiSectionList({ sectionName, items }: ApiSectionListProps) {
  const router = useRouter()
  const { name } = router.query
  if (!items.length) return <></>
  return (
    <>
      <h3>{sectionName}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/module/${name}/${item.name}`}
            //   as={`/module/${name}/${item.name}`}
            >
              <a> {item.name} </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ApiSectionList
