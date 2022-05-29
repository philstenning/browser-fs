import { useState, CSSProperties } from 'react'

import styles from './grid.module.css'
function Grid() {
  const [leftPanel, setLeftPanel] = useState(250)
  const [isResizing, setIsResizing] = useState(false)

  const resize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isResizing) {
      setLeftPanel(e.clientX)
      //   console.log(e.clientX)
    }
  }
  const resizeFinish = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isResizing) {
      setLeftPanel(e.clientX)
      setIsResizing(false)
    }
  }

  return (
    <div
      className={styles.container}
      style={{ '--left-panel': `${leftPanel}px` } as CSSProperties}
      //   onMouseDown={() => setIsResizing(true)}
      onMouseMove={resize}
      onMouseUp={resizeFinish}
      onDragEnd={resizeFinish}
      // onMouseMove={e=>console.log(e.clientX)}
    >
      <div>one</div>
      <Divider setIsResizing={setIsResizing} />
      <div>one</div>
      {/* <Divider setIsResizing={setIsResizing} /> */}
      <div>one</div>
    </div>
  )
}

export default Grid

type Props = {
  setIsResizing: React.Dispatch<React.SetStateAction<boolean>>
}

const Divider = ({ setIsResizing }: Props) => {
  const [isSelected, setIsSelected] = useState(false)
  const handleMouseEvent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation()
    setIsResizing(true)
  }
  return (
    <div
      onMouseDown={handleMouseEvent}
      className={styles.divider}
    ></div>
  )
}
