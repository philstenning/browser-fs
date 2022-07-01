import {useState} from 'react'
import styles from './dragBar.module.css'

const DragBar = () => {
  const [isDragging,setIsDragging ] = useState(false)
  const [clientX,setClientX] = useState(200)

  const sidePanel = (e: React.MouseEvent<HTMLDivElement>) => {
    // if(e.clientX>0){
    //   document.documentElement.style.setProperty('--left-sidebar', `${e.clientX}px`)
    // }
    // console.log('end')
    if (e.clientX > 0) {
      console.log(e.clientX)
      document.documentElement.style.setProperty('--left-sidebar', `${e.clientX}px`)
      // console.log(e.clientX)
      // document.documentElement.style.setProperty('--left-sidebar', `${e.clientX}px`)
      // setClientX(e.movementX)
      // setClientX(e.movementX)
      // console.log(e.movementX, e.clientX)
    }
  }

  return (
    // @ts-ignore
    <div
      // style={{ '--left-sidebar': '12vw' } as React.CSSProperties}
      className={styles.bar}
      // style={{transform:`translateX(${clientX}px)`}}
      onDrag={(e) => sidePanel(e)}
      onDragStart={e=>e.dataTransfer.setData('data','')}
      // // onDrag={(e) => console.log('dr', e.clientX)}
      draggable
      onDragEnd={(e) => sidePanel(e)}
      // onMouseDown={(e) => setIsDragging(true)}
      // onMouseUp={(e) => setIsDragging(false)}
      // onMouseMove={sidePanel}
      // onMouseLeave={()=> setIsDragging(false)}
    >
      {isDragging.toString()}
    </div>
  )
}

export default DragBar
