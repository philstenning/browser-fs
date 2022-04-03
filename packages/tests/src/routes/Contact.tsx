import React from 'react'
import {useRootDirectoryContext} from 'react-fsa-browser'


export default function Contact() {
  const {rootDirectories} = useRootDirectoryContext()
console.log(' render contact')

  return (
    <div>
      <ul>
        {rootDirectories.map(dir=>(
          <li key={dir.id}>{dir.name}</li>
        ))}
      </ul>
    </div>
  )
}
