import styles from './dragBar.module.css'

const DragBar = () => {

  // const style = {"--left-sidebar:15vw"} as React.CSSProperties
  return (
    // @ts-ignore
    <div
      // style={{ '--left-sidebar': '12vw' } as React.CSSProperties}
      className={styles.bar}
      // onDragStart={(e)=>console.log(e.clientX)}
      // onDrag={(e) => console.log('dr', e.clientX)}
      draggable
      onDragEnd={(e) => console.log('end', e.clientX)}
      // onMouseDown={(e)=>console.log([e.clientX])}
    >
      {' '}
    </div>
  )
}

export default DragBar
