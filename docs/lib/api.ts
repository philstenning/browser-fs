import { ParsedUrlQuery } from 'querystring'
import { ApiPackages, ChildrenEntity1, IPackage } from './api.d'
import api from '../generated/json/api.json'

export interface IParams extends ParsedUrlQuery {
  name: string
}

/**
 * filter the api.json and return just the names of the packages
 */
function getPackageNamesWithParams() {
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


function getPackageNames(){
  if (!api)
    throw new Error(
      `Json file has not been generated, "run pnpm td:json" in the root directory`
    )


  const modules = api.children
    .filter((item) => item.kindString === 'Module')
    .map((i) => (i.name))
    
  return modules
}

export type PackageDetails = {
  name: string
  data: PackageEntities[] 
  raw: IPackage
}

export type PackageEntities = {
  name: string
  children: ChildrenEntity1[]
 
}

function getPackageDetails(name: string): PackageDetails {
  const data = getPackage(name) 

  const functions: PackageEntities = { children: [], name: 'Functions' }
  const interfaces: PackageEntities = { children: [], name: 'Interface' }
  const types: PackageEntities = { children: [], name: 'Type' }
  data?.children.forEach((child) => {
    if (child.kindString === 'Function') functions.children.push(child)
    else if (child.kindString === 'Interface') interfaces.children.push(child)
    else if (child.kindString === 'Type alias') types.children.push(child)
  })
  // const raw  = api.
  return {
    name,
    data: [interfaces, types, functions],
    raw:data as IPackage
  }
}

export { getPackageNames, getPackageDetails , getPackageNamesWithParams}


function getPackage(name:string){
  return api.children.find(i=>i.name === name)
}