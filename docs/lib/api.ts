import { ParsedUrlQuery } from 'querystring'
import { ApiPackages, ChildrenEntity1 } from './api.d'
import api from '../generated/json/api.json'

export interface IParams extends ParsedUrlQuery {
  name: string
}

/**
 * filter the api.json and return just the names of the packages
 */
function getPackageNames() {
  if (!api)
    throw new Error(
      `Json file has not been generated, "run pnpm td:json" in the root directory`
    )
  const modules = api.children
    .filter((item) => item.kindString === 'Module')
    .map((i) => ({ params: { name: i.name } }))
  //   console.log(modules)
  return modules
}

export type PackageType = {
  name: string
  data: PackageEntities[]
}

export type PackageEntities = {
  name: string
  children: ChildrenEntity1[]
}

function getPackageDetails(name: string): PackageType {
  const data = api.children.find((item) => item.name === name)

  const functions: PackageEntities = { children: [], name: 'Functions' }
  const interfaces: PackageEntities = { children: [], name: 'Interface' }
  const types: PackageEntities = { children: [], name: 'Type' }
  data?.children.forEach((child) => {
    if (child.kindString === 'Function') functions.children.push(child)
    else if (child.kindString === 'Interface') interfaces.children.push(child)
    else if (child.kindString === 'Type alias') types.children.push(child)
  })
  return {
    name,
    data: [interfaces, types, functions]
  }
}

export { getPackageNames, getPackageDetails }
