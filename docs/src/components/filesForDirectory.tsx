import {useCurrentDirectory} from '@philstenning/react-fsa-database'

function FilesForDirectory() {
    const {directoryFiles} = useCurrentDirectory()
  return (
    <main>
        <ul className='card-grid'>
            {directoryFiles.map(f=>(
               <>
               
                <li key={f.id} className='card'>{f.name}</li>
           
               </>
            ))}
        </ul>
    </main>
  )
}

export default FilesForDirectory