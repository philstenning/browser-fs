import { useRef } from 'react'
import styles from './leftSidebar.module.css'
function LeftSidebar() {
  const ref = useRef<HTMLDivElement>(null)

  const handleResize = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log(ref.current?.offsetWidth, e.clientX)
  }

  return (
    <div
      ref={ref}
      className={styles.container}
      // onMouseDown={handleResize}
      //  onMouseMove={e=>console.log(e.screenX)}
      // onDragStart={() => console.log('first')}
      // draggable
      // onDragEnd={e=>console.log(e.clientX)}
    >
      <p>sidebar</p>
      <p>sidebar</p>
    </div>
  )
}

export default LeftSidebar
