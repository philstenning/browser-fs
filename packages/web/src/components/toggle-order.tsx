import {useRootDirectoryContext} from 'react-fsa-browser'
export default function ToggleOrder(){
    const {orderByDate,rootDirectoryOrder} = useRootDirectoryContext()
    const handleClick=()=>{
        rootDirectoryOrder==='asc'?orderByDate('desc'):orderByDate('asc')
    }
    return(
        <button onClick={handleClick}>Toggle Order</button>
    )
}