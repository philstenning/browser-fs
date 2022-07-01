import React from 'react'
import {Outlet} from 'react-router-dom'

// components
import Header from './header'

export default function Layout() {

 
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
