import React from 'react'
import NavBar from './navBar'
import styles from './layout.module.css'
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Layout
