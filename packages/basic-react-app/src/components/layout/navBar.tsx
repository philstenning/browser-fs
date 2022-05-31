import styles from './navBar.module.css'
function NavBar() {
  return (
    <nav className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.listItem}>Files</li>
        <li className={styles.listItem}>Collection</li>
      </ul>
    </nav>
  )
}
export default NavBar
