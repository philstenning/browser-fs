import { IPackage, ChildrenEntity1, TypesEntity4 } from '../api.d'

export type FunctionKind = {
  id: number
  name: string
  gitUrl: string
  comments: { type: 'text' | 'code'; text: string }[]
  params: ParameterType[]
}

// interface Param { id: number; text: string; type: ParamType }

interface ParameterType {
  type: 'array' | 'intrinsic' | 'reference' | 'union'
  id: number
  name: string
  link: string
  module: string
  params: ParameterType[]
}

function createParameter() {}

function getApiFunctionJson(
  entity: ChildrenEntity1,
  parent: IPackage
): FunctionKind {
  const { id, name } = entity

  const callSignatures = entity.signatures?.find(
    (i) => i.kindString === 'Call signature'
  )
  const params: ParameterType[] = []
  if (callSignatures) {
    callSignatures.parameters
      ?.filter((i) => i.kindString === 'Parameter')
      .forEach((i) => {
        const text = i.type.types?.map((m) => `${m.name}`).join(' | ') ?? ''
        params.push({ id: i.id, text, type: i.type.type })
      })
  }
  //  const , = entity.signatures?.find(
  //    (i) => i.kindString === 'Call signature'
  //  )

  return {
    id,
    name,
    gitUrl: '',
    comments: [],
    params
  }
}

export { getApiFunctionJson }
