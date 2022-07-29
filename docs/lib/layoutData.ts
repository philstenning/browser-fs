import { getPackageNames, getPackageDetails, PackageDetails } from './api'

export type LayoutData = {
  packageNames: string[]
  sidebarData: SideBarData
}

export type SideBarData = {
    
    packageNames: string[]
    packageDetails: PackageDetails | null
  
}

function getLayoutData(packageName?: string): LayoutData {
  const packageNames = getPackageNames()
  const packageDetails = packageName ? getPackageDetails(packageName) : null
  return {
    packageNames,
    sidebarData:{
        packageDetails,
        packageNames
    }
  }
}

export { getLayoutData }
