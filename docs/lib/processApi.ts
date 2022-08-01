import api from '../generated/json/api.json'
import { IPackage, ChildrenEntity1 } from './api.d'



function getApiInterfaceJson(entity: ChildrenEntity1) {
  throw new Error('Not yet implemented Error')
}
function getApiClassJson(entity: ChildrenEntity1) {
  throw new Error('Not yet implemented Error')
}
function getApiTypeAliasJson(entity: ChildrenEntity1) {
  throw new Error('Not yet implemented Error')
}

function getModuleItem(moduleName: string, itemName: string) {
  const moduleItem = api.children.find(
    (item) => item.name === moduleName
  ) as IPackage
  if (!moduleItem) {
    throw new Error('Requested module does not exist.')
  }
  const entity = moduleItem.children?.find((item) => item.name === itemName)
  if (!entity) {
    throw new Error('Requested module does not exist.')
  }
  if (entity?.kindString === 'Function') {
    // return getApiFunctionJson(entity, moduleItem)
  } else if (entity?.kindString === 'Class') {
    return getApiClassJson(entity)
  } else if (entity?.kindString === 'Interface') {
    return getApiInterfaceJson(entity)
  } else if (entity?.kindString === 'Type alias') {
    return getApiTypeAliasJson(entity)
  }
}

export { getModuleItem }
