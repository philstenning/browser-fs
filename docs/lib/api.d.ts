export interface ApiPackages {
  id: number
  name: string
  kind: number
  flags: Flags
  originalName: string
  children?: IPackage[] | null
  groups?: GroupsEntityOrCategoriesEntity[] | null
}
export interface Flags {}

export interface IPackage {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  children?: ChildrenEntity1[] | null
  groups?: GroupsEntity[] | null
  sources?: SourcesEntity[] | null
}
export interface ChildrenEntity1 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags1
  children?: ChildrenEntity2[] | null
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
export interface Flags1 {
  isConst?: boolean | null
}
export interface ChildrenEntity2 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags2
  sources?: SourcesEntity1[] | null
  type?: Type1 | null
  signatures?: SignaturesEntity1[] | null
  overwrites?: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity | null
  inheritedFrom?: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity1 | null
  comment?: Comment1 | null
}
export interface Flags2 {
  isExternal?: boolean | null
  isReadonly?: boolean | null
  isStatic?: boolean | null
  isOptional?: boolean | null
}
export interface SourcesEntity1 {
  fileName: string
  line: number
  character: number
  url?: string | null
}
export interface Type1 {
  type: string
  declaration?: Declaration | null
  name?: string | null
  qualifiedName?: string | null
  package?: string | null
  id?: number | null
  elementType?: ElementType | null
  types?: TypesEntity[] | null
}
export interface Declaration {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  children?: ChildrenEntity3[] | null
  groups?: GroupsEntityOrCategoriesEntity[] | null
  sources?: SourcesEntity2[] | null
  indexSignature?: IndexSignature | null
  signatures?: SignaturesEntity2[] | null
}
export interface ChildrenEntity3 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags3
  sources?: SourcesEntity2[] | null
  type: ElementTypeOrTypeOrTypeArgumentsEntity
}
export interface Flags3 {
  isExternal: boolean
}
export interface SourcesEntity2 {
  fileName: string
  line: number
  character: number
}
export interface ElementTypeOrTypeOrTypeArgumentsEntity {
  type: string
  id: number
  name: string
}
export interface GroupsEntityOrCategoriesEntity {
  title: string
  children?: number[] | null
}
export interface IndexSignature {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  parameters?: ParametersEntity[] | null
  type: ElementTypeOrTypeOrTypeArgumentsEntity
}
export interface ParametersEntity {
  id: number
  name: string
  kind: number
  flags: Flags
  type: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity2
}
export interface TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity2 {
  type: string
  name: string
}
export interface SignaturesEntity2 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  parameters?: ParametersEntity1[] | null
  type: TypeOrTypeArgumentsEntity
}
export interface ParametersEntity1 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags4
  type: Type2
}
export interface Flags4 {
  isOptional?: boolean | null
}
export interface Type2 {
  type: string
  typeArguments?:
    | TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity2[]
    | null
  name?: string | null
  qualifiedName?: string | null
  package?: string | null
  types?: TypesEntity1[] | null
}
export interface TypesEntity1 {
  type: string
  value?: null
  id?: number | null
  name?: string | null
}
export interface TypeOrTypeArgumentsEntity {
  type: string
  id?: number | null
  name: string
  qualifiedName?: string | null
  package?: string | null
}
export interface ElementType {
  type: string
  id?: number | null
  name?: string | null
  declaration?: Declaration1 | null
}
export interface Declaration1 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  sources?: SourcesEntity2[] | null
  signatures?: SignaturesEntity3[] | null
}
export interface SignaturesEntity3 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  parameters?: ParametersEntity2[] | null
  type: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity2
}
export interface ParametersEntity2 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  type: TypesEntityOrTypeOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntity
}
export interface TypesEntityOrTypeOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntity {
  type: string
  name: string
  qualifiedName: string
  package: string
}
export interface TypesEntity {
  type: string
  name?: string | null
  elementType?: TypeOrElementType | null
  value?: string | null
  qualifiedName?: string | null
  package?: string | null
}
export interface TypeOrElementType {
  type: string
  elementType: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity2
}
export interface SignaturesEntity1 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags5
  type: Type3
  overwrites?: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity3 | null
  inheritedFrom?: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity4 | null
  parameters?: ParametersEntity3[] | null
  typeParameter?: TypeParameterEntity[] | null
}
export interface Flags5 {
  isExternal?: boolean | null
}
export interface Type3 {
  type: string
  id?: number | null
  name: string
  qualifiedName?: string | null
  package?: string | null
  typeArguments?: TypeOrTypeArgumentsEntity[] | null
}
export interface TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity3 {
  type: string
  name: string
}
export interface TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity4 {
  type: string
  name: string
}
export interface ParametersEntity3 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags6
  type: Type4
}
export interface Flags6 {
  isExternal: boolean
  isOptional?: boolean | null
}
export interface Type4 {
  type: string
  id?: number | null
  name?: string | null
  qualifiedName?: string | null
  package?: string | null
  declaration?: Declaration2 | null
  elementType?: TypeOrElementType1 | null
  typeArguments?: TypeArgumentsEntity[] | null
  types?: TypesEntity2[] | null
}
export interface Declaration2 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags3
  sources?: SourcesEntity2[] | null
  signatures?: SignaturesEntity4[] | null
  children?: ChildrenEntity4[] | null
  groups?: GroupsEntityOrCategoriesEntity[] | null
}
export interface SignaturesEntity4 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags3
  parameters?: ParametersEntity4[] | null
  type: Type5
}
export interface ParametersEntity4 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags3
  type: TypeOrElementType2
}
export interface TypeOrElementType2 {
  type: string
  id?: number | null
  name: string
}
export interface Type5 {
  type: string
  types?: TypesEntity3[] | null
  id?: number | null
  name?: string | null
  qualifiedName?: string | null
  package?: string | null
}
export interface TypesEntity3 {
  type: string
  id?: number | null
  name: string
  qualifiedName?: string | null
  package?: string | null
  typeArguments?: TypeArgumentsEntityOrType[] | null
}
export interface TypeArgumentsEntityOrType {
  type: string
  id: number
  name: string
  qualifiedName: string
  package: string
}
export interface ChildrenEntity4 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags3
  sources?: SourcesEntity2[] | null
  type: TypeOrTypesEntity
}
export interface TypeOrTypesEntity {
  type: string
  name?: string | null
  value?: string | null
}
export interface TypeOrElementType1 {
  type: string
  id?: number | null
  name: string
}
export interface TypeArgumentsEntity {
  type: string
  declaration?: Declaration3 | null
  name?: string | null
  qualifiedName?: string | null
  package?: string | null
  elementType?: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity5 | null
  id?: number | null
}
export interface Declaration3 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags3
  children?: ChildrenEntity5[] | null
  groups?: GroupsEntityOrCategoriesEntity[] | null
  sources?: SourcesEntity2[] | null
}
export interface ChildrenEntity5 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags3
  sources?: SourcesEntity2[] | null
  type: TypesEntityOrType
}
export interface TypesEntityOrType {
  type: string
  value: string
}
export interface TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity5 {
  type: string
  name: string
}
export interface TypesEntity2 {
  type: string
  id?: number | null
  name: string
  qualifiedName: string
  package: string
  typeArguments?: TypeArgumentsEntityOrType[] | null
}
export interface TypeParameterEntity {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags3
  default?: TypeOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntity1 | null
}
export interface TypeOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntity1 {
  type: string
  name: string
  qualifiedName?: string | null
  package?: string | null
}
export interface TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity {
  type: string
  name: string
}
export interface TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity1 {
  type: string
  name: string
}
export interface Comment1 {
  summary?: (SummaryEntityOrContentEntity | null)[] | null
  blockTags?: BlockTagsEntity[] | null
}
export interface SummaryEntityOrContentEntity {
  kind: string
  text: string
}
export interface BlockTagsEntity {
  tag: string
  content?: SummaryEntityOrContentEntity1[] | null
}
export interface SummaryEntityOrContentEntity1 {
  kind: string
  text: string
}
export interface SourcesEntity {
  fileName: string
  line: number
  character: number
  url: string
}
export interface Type {
  type: string
  declaration?: Declaration4 | null
  id?: number | null
  name?: string | null
  types?: TypesEntityOrType[] | null
  elementType?: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity6 | null
}
export interface Declaration4 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  children?: ChildrenEntity6[] | null
  groups?: GroupsEntityOrCategoriesEntity[] | null
  sources?: SourcesEntity[] | null
}
export interface ChildrenEntity6 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags4
  sources?: SourcesEntity[] | null
  type: Type6
  comment?: Comment2 | null
}
export interface Type6 {
  type: string
  name?: string | null
  types?: TypesEntityOrType[] | null
  elementType?: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity7 | null
  id?: number | null
  declaration?: Declaration5 | null
}
export interface TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity7 {
  type: string
  name: string
}
export interface Declaration5 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  sources?: SourcesEntity[] | null
  signatures?: SignaturesEntity5[] | null
}
export interface SignaturesEntity5 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  parameters?: ParametersEntityOrSignaturesEntity[] | null
  type: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity2
}
export interface ParametersEntityOrSignaturesEntity {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  type: TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity2
}
export interface Comment2 {
  summary?: SummaryEntityOrContentEntity1[] | null
  blockTags?: BlockTagsEntity[] | null
}
export interface TypeOrElementTypeOrOverwritesOrInheritedFromOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntityOrTypesEntity6 {
  type: string
  name: string
}
export interface SignaturesEntity {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  comment?: Comment3 | null
  type: Type7
  parameters?: ParametersEntity5[] | null
}
export interface Comment3 {
  summary?: (SummaryEntityOrContentEntity2 | null)[] | null
  blockTags?: BlockTagsEntity1[] | null
}
export interface SummaryEntityOrContentEntity2 {
  kind: string
  text: string
}
export interface BlockTagsEntity1 {
  tag: string
  content?: (SummaryEntityOrContentEntity3 | null)[] | null
}
export interface SummaryEntityOrContentEntity3 {
  kind: string
  text: string
}
export interface Type7 {
  type: string
  declaration?: Declaration6 | null
  id?: number | null
  name?: string | null
  elementType?: TypeOrElementType3 | null
  qualifiedName?: string | null
  package?: string | null
  types?: TypesEntity1[] | null
}
export interface Declaration6 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  children?: ChildrenEntity7[] | null
  groups?: GroupsEntity[] | null
  sources?: SourcesEntity[] | null
}
export interface ChildrenEntity7 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  sources?: SourcesEntity[] | null
  type: Type8
  defaultValue?: string | null
}
export interface Type8 {
  type: string
  declaration?: Declaration7 | null
  elementType?: ElementTypeOrTypeOrTypeArgumentsEntity1 | null
  types?: TypeOrTypesEntity1[] | null
  id?: number | null
  name?: string | null
}
export interface Declaration7 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  sources?: SourcesEntity[] | null
  signatures?: SignaturesEntity6[] | null
}
export interface SignaturesEntity6 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags
  comment?: Comment4 | null
  parameters?: ParametersEntity6[] | null
  type: TypeOrElementType2
}
export interface Comment4 {
  summary?: (SummaryEntityOrContentEntity2 | null)[] | null
  blockTags?: BlockTagsEntity1[] | null
}
export interface ParametersEntity6 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags4
  type: Type9
  defaultValue?: string | null
}
export interface Type9 {
  type: string
  name?: string | null
  types?: TypeOrTypesEntity[] | null
  id?: number | null
  elementType?: TypeOrElementType4 | null
}
export interface TypeOrElementType4 {
  type: string
  id?: number | null
  name: string
}
export interface ElementTypeOrTypeOrTypeArgumentsEntity1 {
  type: string
  id: number
  name: string
}
export interface TypeOrTypesEntity1 {
  type: string
  name?: string | null
  elementType?: ElementTypeOrTypeOrTypeArgumentsEntity2 | null
}
export interface ElementTypeOrTypeOrTypeArgumentsEntity2 {
  type: string
  id: number
  name: string
}
export interface GroupsEntity {
  title: string
  children?: number[] | null
  categories?: GroupsEntityOrCategoriesEntity[] | null
}
export interface TypeOrElementType3 {
  type: string
  id?: number | null
  name: string
}
export interface ParametersEntity5 {
  id: number
  name: string
  kind: number
  kindString: string
  flags: Flags4
  type: Type10
  defaultValue?: string | null
  comment?: Comment5 | null
}
export interface Type10 {
  type: string
  types?: TypesEntity4[] | null
  name?: string | null
  qualifiedName?: string | null
  package?: string | null
  id?: number | null
  elementType?: TypeOrElementType5 | null
  typeArguments?: ElementTypeOrTypeOrTypeArgumentsEntity[] | null
}
export interface TypesEntity4 {
  type: string
  name?: string | null
  qualifiedName?: string | null
  package?: string | null
  value?: string | null
}
export interface TypeOrElementType5 {
  type: string
  id?: number | null
  name: string
}
export interface Comment5 {
  summary?: SummaryEntityOrContentEntity1[] | null
}
export interface TypeOrTypeArgumentsEntityOrDefaultOrExtendedTypesEntity {
  type: string
  name: string
  qualifiedName?: string | null
  package?: string | null
}
export interface Comment {
  summary?: SummaryEntityOrContentEntity1[] | null
}
