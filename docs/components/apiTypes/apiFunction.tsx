import React from 'react'
import Link from 'next/link'
import {
  ChildrenEntity1,
  ParametersEntity5 as ParamsType
} from '../../lib/api.d'
type props = {
  itemResult: ChildrenEntity1
}

function ApiFunction({ itemResult }: props) {
  const params = () => {
    const result =
      itemResult.signatures
        ?.filter((i) => i.kindString === 'Call signature')
        .filter((k) => k.kindString === 'Parameter') ?? []

    return result
  }
  console.log('params', JSON.stringify({ params }))
  return (
    <div>
      <h2> {itemResult.name}</h2>
      <ul>
        <li>id: {itemResult.id}</li>
        <li>Type: {itemResult.kindString}</li>
      </ul>

      {/* <div>
        <p>Call signature</p>
        {itemResult.signatures
          ?.find((c) => c.kindString === 'Call signature')
          ?.parameters?.map((p) => p.name)}
      </div> */}
      {/* {itemResult.signatures?.find(f=>f.kindString==='')?.parameters?.map(i=>{
  <p> <Params params={i}/></p> 
 })} */}
      <div>
        {itemResult.signatures
          ?.find((c) => c.kindString === 'Call signature')
          ?.parameters?.map((p) => (
            // <p key={p.id}>{p.name} {p.type.type}</p>
            <Params key={p.id} params={p} />
          ))}
      </div>
    </div>
  )
}

function Params({ params }: { params?: ParamsType }) {
  return (
    <li>
      {params?.name}:{' '}
      {/*   type: {params?.type.type} */}
      {/* Union Type */}
      {params?.type.type === 'union' &&
        params.type.types?.map((m, i) => (
          <span key={i}>
            {i > 0 ? '|' : ''} {m.name}{' '}
          </span>
        ))}
      {/* intrinsic Type */}
      {params?.type.type === 'intrinsic' && (
        <IntrinsicType name={params.type.name} />
      )}
      {/* Reference Type */}
      {params?.type.type === 'reference' && (
        <span>: {`<${params.type.name}>`}</span>
      )}
    </li>
  )
}

const IntrinsicType = ({ name }: { name: string | null | undefined }) => {
  return <span>{name}</span>
}
const ReferenceType = ({ name }: { name: string | null | undefined }) => {
    return (<Link href={`module/`}>
    <a>{name}</a>
    </Link> 
    )
}

export default ApiFunction
