import { useState, useRef } from 'react'
import styles from './resizableVerticalGrid.module.css'
type ResizableGrid = {
  children: React.ReactNode[]
  minHeight?: number
  collapseTop?: boolean
  collapseBottom?: boolean
}

function ResizableVerticalGrid({ children, minHeight = 100 }: ResizableGrid) {
  const [panelHeight, setPanelHight] = useState([minHeight, minHeight])
  const [isResizing, setIsResizing] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  /** Called on this grid for resizing */
  const resizeMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    //  console.log(e.clientY)
    resize(e.clientY)
  }

  const resize = (mouseY: number) => {
    if (!isResizing) return
    const gridHeight = gridRef.current?.clientHeight ?? 0
    const topOffset = gridRef.current?.offsetTop ?? 0
    const minTop = topOffset + minHeight
    const minBottom = gridHeight - minHeight

    
    let newPosition = mouseY - topOffset
    if (newPosition < minHeight) newPosition = minHeight
    if (newPosition > minBottom){
console.log('first')
        newPosition = minBottom
    } 

    console.log({minTop} , {minBottom}, gridHeight,{mouseY}, newPosition, {topOffset})
    // console.log(topOffset, gridHeight, newPosition)
    setPanelHight([newPosition, newPosition])
  }

  const resizeFinish = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    if (isResizing) {
      setIsResizing(false)
    }
  }

  const handleLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const gridHeight = gridRef.current?.clientHeight ?? 0
    const topOffset = gridRef.current?.offsetHeight ?? 0
    const mouseY = e.clientY
    const gridTop = topOffset - mouseY
    if (mouseY <= gridTop || mouseY >= gridHeight + topOffset) {
      setIsResizing(false)
    }
  }

  return (
    <div
      ref={gridRef}
      className={styles.container}
      style={{ gridTemplateRows: `${panelHeight[0]}px 5px 1fr` }}
      onMouseMove={resizeMouse}
      onMouseUp={resizeFinish}
      onMouseLeave={handleLeave}
    >
        <div className={styles.content}>

      {children.length > 0 && children[0]}
        </div>
      <Divider setIsResizing={setIsResizing} />
      <div  className={styles.content}>

      {children.length > 1 && children[1]}
      </div>
    </div>
  )
}

type DividerProps = {
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>
  isCollapsed?: boolean
}

function Divider({ setIsResizing, isCollapsed = false }: DividerProps) {
  const handleMouseEvent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    setIsResizing(true)
  }

  return (
    <div
      className={isCollapsed ? '' : styles.divider}
      onMouseDown={handleMouseEvent}
    ></div>
  )
}

export default ResizableVerticalGrid
