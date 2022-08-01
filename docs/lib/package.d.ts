export interface ApiPackages {
  id: number
  name: string
  kind: number
  flags: Flags
  originalName: string
  children?: IPackage[] | null
  groups?: GroupsEntityOrCategoriesEntity[] | null
}

export interface Flags {
  isExternal?: boolean | null
  isReadonly?: boolean | null
  isStatic?: boolean | null
  isOptional?: boolean | null
}
export interface GroupsEntityOrCategoriesEntity {
  title: string
  children?: number[] | null
}
export interface IPackage {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  children?: ChildrenEntity[] | null
  groups?: GroupsEntity[] | null
  sources?: SourcesEntity[] | null
}

export interface ChildrenEntity {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags1
  children?: ChildrenEntity[] | null
  groups?: GroupsEntityOrCategoriesEntity[] | null
  sources?: SourcesEntity[] | null
  type?: Type | null
  defaultValue?: string | null
  signatures?: SignaturesEntity[] | null
  extendedTypes?:
    | TypeOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntity[]
    | null
  comment?: Comment | null
}

export interface ParametersEntity {
  id: number
  name: string
  kind: number
  flags: Flags
  type: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity2
}

export interface GroupsEntity {
  title: string
  children?: number[] | null
  categories?: GroupsEntityOrCategoriesEntity[] | null
}