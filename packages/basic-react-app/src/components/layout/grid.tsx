import { useState, CSSProperties } from 'react'

import styles from './grid.module.css'

type ResizableGrid = {
  children: React.ReactNode[]
}

function Grid({ children }: ResizableGrid) {
  const [leftPanel, setLeftPanel] = useState(250)
  const [rightPanel, setRightPanel] = useState(250)
  const [currentPanel, setCurrentPanel] = useState(0)
  const [isResizing, setIsResizing] = useState(false)

  const handleResize = (isResizing: boolean, currentPanel: number) => {
    setCurrentPanel(currentPanel)
    setIsResizing(isResizing)
  }

  const resize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    if (isResizing) {
      setLeftPanel(e.clientX)
    }
  }

  const resizeFinish = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    if (isResizing) {
      setLeftPanel(e.clientX)
      setIsResizing(false)
    }
  }

  return (
    <div
      className={styles.container}
      style={
        {
          '--left-panel': `${leftPanel}px`,
          '--right-panel': `${rightPanel}px`,
        } as CSSProperties
      }
      onMouseMove={resize}
      onMouseUp={resizeFinish}
    >
      {children.map((child, index) => (
        <>
          {child}
          {children.length - index > 1 && (
            <Divider setIsResizing={setIsResizing} id={1} />
          )}
        </>
      ))}
    </div>
  )
}

export default Grid

type Props = {
  id: number
  // setIsResizing: React.Dispatch<React.SetStateAction<boolean>>
  handleResize:()=>void
}

const Divider = ({ setIsResizing, id }: Props) => {
  const handleMouseEvent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    setIsResizing(true)
  }
  return (
    <div onMouseDown={handleMouseEvent} className={styles.divider}>
      {id.toString()}
    </div>
  )
}
