import React from 'react'
import {fetchDatabase} from 'fsa-database'
import { Link } from 'react-router-dom'
//@ts-ignore
import style from './header.module.css'
function Header() {
  return (
    <header className={style.header}>
      <nav className={ style.nav}>
        <ul className={style.mainList}>
          <li className={style.mainNav__link}>
            <Link
              className={style.mainNav__link}
              to="/"
              data-test-cy="HomePageLink"
            >
              Home
            </Link>
          </li>
          <li className={style.mainNav__link}>
            <Link
              className={style.mainNav__link}
              to="/provider"
              data-test-cy="TestPageLink"
            >
              Test View
            </Link>
          </li>
          <li className={style.mainNav__link}>
            <Link
              className={style.mainNav__link}
              to="/settings"
              data-test-cy="settingsPageLink"
            >
              Settings
            </Link>
          </li>
          <li className={style.mainNav__link}>
            <Link
              className={style.mainNav__link}
              to="/dnd"
              data-test-cy="dndPageLink"
            >
              DragNDrop
            </Link>
          </li>
        </ul>
        <button className={style.btn} id="request_btn" onClick={()=>fetchDatabase()}>
        Reset Data
        </button>
      </nav>
    </header>
  )
}

export default Header
