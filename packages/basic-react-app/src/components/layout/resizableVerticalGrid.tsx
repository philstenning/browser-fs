import { useState, useRef } from 'react'
import styles from './resizableVerticalGrid.module.css'
type ResizableGrid = {
  children: React.ReactNode[]
  minHeight?: number
  collapseTop?: boolean
  collapseBottom?: boolean
  initialHeight?: string
}

function ResizableVerticalGrid({
  children,
  minHeight = 100,
  initialHeight = '1fr',
  collapseTop=false,
  collapseBottom=false,
}: ResizableGrid) {
  const [panelHeight, setPanelHight] = useState([-1, 0])
  const [isResizing, setIsResizing] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  /** Called on this grid for resizing */
  const resizeMouse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // e.stopPropagation()
    // e.preventDefault()
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
    if (newPosition > minBottom) {
      console.log('first')
      newPosition = minBottom
    }

    // console.log({minTop} , {minBottom}, gridHeight,{mouseY}, newPosition, {topOffset})
    // console.log(topOffset, gridHeight, newPosition)
    setPanelHight([newPosition, newPosition])
  }

  const resizeFinish = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // e.stopPropagation()
    // e.preventDefault()
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

  const gridStyle = () => {
    if (panelHeight[0] === -1) {
      return {
        gridTemplateRows: `${45}% 5px 1fr`,
      }
    }

    if(collapseTop|| collapseBottom){
        return { gridTemplateRows: `1fr` }
    }
    return { gridTemplateRows:`${panelHeight[0]}px 5px 1fr`}
  }

  return (
    <div
      ref={gridRef}
      className={styles.container}
      style={gridStyle()}
      onMouseMove={resizeMouse}
      onMouseUp={resizeFinish}
      onMouseLeave={handleLeave}
    >
      {children.length > 0 && !collapseTop && children[0]}
      {!collapseTop &&
        (!collapseBottom && <Divider setIsResizing={setIsResizing}  resize={resize}/>)}
      {!collapseBottom && children.length > 1 && children[1]}
    </div>
  )
}

type DividerProps = {
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>
  isCollapsed?: boolean
  resize: (mouseY: number) => void
}

function Divider({ setIsResizing, isCollapsed = false,resize }: DividerProps) {

  return (
    <div
      className={isCollapsed ? '' : styles.divider}
      onMouseDown={() => setIsResizing(true)}
      onTouchStart={() => setIsResizing(true)}
      onTouchEnd={() => setIsResizing(false)}
      onTouchMove={(e) => resize(e.nativeEvent.touches[0].clientY)}
    ></div>
  )
}

export default ResizableVerticalGrid
