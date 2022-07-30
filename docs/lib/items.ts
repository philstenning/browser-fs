import { ParsedUrlQuery } from 'querystring'
import { ApiPackages, ChildrenEntity1 } from './api.d'
import { remark } from 'remark'
import html from 'remark-html'
import api from '../generated/json/api.json'

export interface IParams extends ParsedUrlQuery {
  name: string
  item: string
}

function getAllModulesItemsPaths() {
  const items: { params: { name: string; item: string } }[] = []
  api.children.forEach((module) =>
    module.children.forEach((i) =>
      items.push({ params: { name: module.name, item: i.name } })
    )
  )

  return items
}

async function getModuleItemHtml(name: string) {
  console.log(name)
  const selectedModule = getModuleItem(name)
  const processedContent = await remark()
    .use(html)
    // .process(`# fff`)
  .process(` \`\`\`json 
  ${JSON.stringify(selectedModule)}
  \`\`\``)
  const contentHtml = processedContent.value.toString()
  console.log(contentHtml)
  return contentHtml
  
}

function getModuleItem(name: string): ChildrenEntity1 {
  let moduleItem: ChildrenEntity1 = {
    id: 1,
    name: 'error_not_found',
    kind: 1,
    kindString: 'none',
    flags: {}
  }
  api.children.forEach((mod) =>
    mod.children.forEach((item) => {
      if (item.name === name) moduleItem = item
    })
  )

  return moduleItem
}
export { getAllModulesItemsPaths, getModuleItem, getModuleItemHtml }
