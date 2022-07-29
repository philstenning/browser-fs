import { PropsWithChildren } from 'react'
import Footer from './footer'
import Header from './header'

import styles from './layout.module.css'
import {LayoutData } from '../lib/layoutData'
import SideBar from './sidebar'
type Props ={
  layoutData: LayoutData
}

const Layout = ({ children,layoutData }: PropsWithChildren<Props>) => {
  return (
  <div>

    <Header/>
    <main className={styles.main}>
     <SideBar packageDetails={layoutData.sidebarData.packageDetails} packageNames={layoutData.sidebarData.packageNames} />
    {children}
    </main>
    {/* <Footer/> */}
    </div>
    
    )
}
export default Layout