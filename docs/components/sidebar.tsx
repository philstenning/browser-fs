import Link from 'next/link'
import { SideBarData } from '../lib/layoutData'

const Sidebar = ({ packageDetails, packageNames }: SideBarData) => {
  return (
    <div>
      <Packages packageNames={packageNames} />
      <ul>
        {packageDetails.entities.map((entry) => (
          <li key={entry.title}>
            {entry.title}
            <ul>
              {entry.categories.map((item) => (
                <li key={item.title}>
                  {item.title === 'Other' ? '' : item.title}
                  <ul>
                    {item.sidebarChildEntity.map((i) => (
                      <li key={i.id}>
                        <Link href={`/module/${packageDetails.name}/${i.name}`}>
                        <a >
                        {i.name}
                        </a>
                        </Link>
                        </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

const Packages = ({ packageNames }: { packageNames: string[] }) => {
  return (
    <ul>
      {packageNames.map((item) => (
        <li key={item}>
          <Link href={`/module/${item}`}>
            <a>{item}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Sidebar
