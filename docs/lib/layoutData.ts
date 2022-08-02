import { getPackageNames } from './api'
import { getSidebarPackageDetails, SidebarModule } from './sidebar'
export type LayoutData = {
  packageNames: string[]
  sidebarData: SideBarData
}

export type SideBarData = {
  packageNames: string[]
  packageDetails: SidebarModule
}

function getLayoutData(packageName?: string): LayoutData | null {
  const packageNames = getPackageNames()
  const packageDetails = getSidebarPackageDetails(packageName ?? '')
  if (!packageDetails) return null
  return {
    packageNames,
    sidebarData: {
      packageDetails,
      packageNames
    }
  }
}

export { getLayoutData }
