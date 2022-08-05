import api from '../generated/json/api.json'
import {
  GroupsEntity,
  GroupsEntityOrCategoriesEntity,
  ChildrenEntity1
} from './api.d'

export type SidebarModule = {
  id: number
  name: string // myModule
  entities: SidebarEntity[]
}

type SidebarEntity = {
  title: string // Function, Interface
  categories: SidebarEntityCategory[]
}
type SidebarEntityCategory = {
  title: string // Hooks, Context Provider etc
  sidebarChildEntity: SidebarChildEntity[]
}
type SidebarChildEntity = {
  id: number
  name: string // myFunctionName, interface Name
}

export function getSidebarPackageDetails(
  moduleName: string
): SidebarModule | null {
  const foundModule = api.children.find((m) => m.name === moduleName)
  if (!foundModule) return null

  // create the return object without the entities added.
  const sidebarModule: SidebarModule = {
    name: foundModule.name,
    id: foundModule.id,
    entities: []
  }

  for (const sidebarEntity of foundModule.groups as GroupsEntity[]) {
    const sidebarEntityItem: SidebarEntity = {
      title: sidebarEntity.title,
      categories: []
    }

    // we look for categories first
    // and create our SidebarEntityCategory items from them
    if (sidebarEntity.categories) {
      for (const category of sidebarEntity.categories) {
        // add category to entity
        sidebarEntityItem.categories.push(
          createCategories(category, foundModule.children)
        )
      }
    }
    // add 'Others' category for any items without a category added in the jsdoc.
    const Others = createOtherCategory(sidebarEntity, foundModule.children)
    if (Others.sidebarChildEntity.length > 0) {
      sidebarEntityItem.categories.push(Others)
    }

    // now finally add entities to the module
    sidebarModule.entities.push(sidebarEntityItem)
  }
  return sidebarModule
}

/**
 * Creates an SidebarEntityCategory
 */
function createCategories(
  category: GroupsEntityOrCategoriesEntity,
  moduleChildren: ChildrenEntity1[]
) {
  const sidebarEntityCategory: SidebarEntityCategory = {
    title: category.title,
    sidebarChildEntity: []
  }
  if (category.children) {
    for (const id of category.children) {
      const name = moduleChildren.find((i) => i.id === id)?.name ?? 'Not Found'
      sidebarEntityCategory.sidebarChildEntity.push({
        id,
        name
      })
    }
  }
  return sidebarEntityCategory
}

/**
 *  This creates  a SidebarEntityCategory titled 'Other', item entities not in a category
 *  are put in it and returned. 
 */
function createOtherCategory(
  sidebarEntity: GroupsEntity,
  moduleChildren: ChildrenEntity1[]
) {
  const children = new Set(sidebarEntity.children)

  // create the return object with out children
  const sidebarEntityCategory: SidebarEntityCategory = {
    title: 'Other',
    sidebarChildEntity: []
  }

  // iterate over all the children of children and remove them
  // from the Set.
  sidebarEntity.categories?.forEach((i) =>
    i.children?.forEach((c) => children.delete(c))
  )

  // create category entity for all remaining items.
  // and add them to the already created sidebarEntityCategory
  children.forEach((child) => {
    const name = moduleChildren.find((i) => i.id === child)?.name ?? 'Not Found'
    sidebarEntityCategory.sidebarChildEntity.push({
      id: child,
      name
    })
  })
  return sidebarEntityCategory
}