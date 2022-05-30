import { useState, CSSProperties, useRef, useEffect } from 'react'

import styles from './grid.module.css'

type ResizableGrid = {
  children: React.ReactNode[]
  minWidth?: number
  collapseLeft?: boolean
  collapseRight?: boolean
}

function Grid({
  children,
  collapseLeft = true,
  collapseRight = true,
  minWidth = 200,
}: ResizableGrid) {
  const [panelWidths, setPanelWidths] = useState([200, collapseRight ? 0 : 200])
  const [currentPanel, setCurrentPanel] = useState(0)
  const [isResizing, setIsResizing] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const handleResize = (isResizing: boolean, currentPanel: number) => {
    // console.log(isResizing, currentPanel)
    setCurrentPanel(currentPanel)
    setIsResizing(isResizing)
  }

  useEffect(() => {
    if (collapseRight) {
      setPanelWidths((current) => [current[0], 0])
    } else {
      setPanelWidths((current) => [current[0], minWidth])
    }
  }, [collapseRight])

  useEffect(() => {
    if (collapseLeft) {
      setPanelWidths((current) => [0, current[1]])
    } else {
      setPanelWidths((current) => [minWidth, current[1]])
    }
  }, [collapseLeft])

  const resize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    if (isResizing) {
      // setLeftPanel(e.clientX)
      const gridWidth = gridRef.current?.clientWidth ?? 0
      const leftOffset = gridRef.current?.offsetLeft ?? 0
      const mousePosition = e.clientX
      const maxRight = gridWidth + leftOffset

      if (currentPanel === 0) {
        let newVal = mousePosition - leftOffset
        if (collapseLeft) newVal = 0
        if (
          mousePosition >= leftOffset + minWidth &&
          mousePosition <= maxRight - (minWidth + panelWidths[1])
        ) {
          setPanelWidths((current) => [newVal, current[1]])
        }
      } else {
        // right hand panel
        let newVal = gridWidth - (mousePosition - leftOffset)
        if (newVal < minWidth) newVal = minWidth
        if (collapseRight) newVal = 0
        setPanelWidths((current) => [current[0], newVal])
      }
      // console.log(
      //   { gridWidth },
      //   { leftOffset },
      //   { mousePosition },
      //   { maxRight }
      // )
    }
  }

  const resizeFinish = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    if (isResizing) {
      // setLeftPanel(e.clientX)
      setIsResizing(false)
    }
  }

  const handleLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const gridWidth = gridRef.current?.clientWidth ?? 0
    const offset = gridRef.current?.offsetLeft ?? 0
    const mousePosition = e.clientX
    const zero = offset - mousePosition

    if (mousePosition === zero || mousePosition >= gridWidth + offset) {
      setIsResizing(false)
    }
  }

  return (
    <div
      ref={gridRef}
      className={styles.container}
      style={
        {
          gridTemplateColumns: `${panelWidths[0]}px ${
            collapseLeft ? '0' : 'calc(0.5rem + 5px)'
          } 1fr ${collapseRight ? '0' : 'calc(0.5rem + 5px)'} ${
            panelWidths[1]
          }px`,
        } as CSSProperties
      }
      // style={
      //   {
      //     '--left-panel': `${panelWidths[0]}px`,
      //     '--right-panel': `${panelWidths[1]}px`,
      //   } as CSSProperties
      // }
      onMouseMove={resize}
      onMouseUp={resizeFinish}
      onMouseLeave={handleLeave}
    >
      {children[0]}
      <Divider handleResize={handleResize} id={0} isCollapsed={collapseLeft} />
      {children.length >= 2 && children[1]}

      {children.length >= 3 && (
        <Divider
          handleResize={handleResize}
          isCollapsed={collapseRight}
          id={1}
        />
      )}
      {children.length >= 3 && children[2]}
      {/* {children.map((child, index) => (
        <>
          {child}
          {children.length - index > 1 && (
            <Divider handleResize={handleResize} id={index} />
          )}
        </>
      ))} */}
    </div>
  )
}

export default Grid

type Props = {
  id: number
  isCollapsed: boolean
  handleResize: (isResizing: boolean, currentPanel: number) => void
}

const Divider = ({ handleResize, id, isCollapsed }: Props) => {
  const handleMouseEvent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    handleResize(true, id)
  }
  return (
    <div
      onMouseDown={handleMouseEvent}
      className={isCollapsed ? '' : styles.divider}
    ></div>
  )
}
