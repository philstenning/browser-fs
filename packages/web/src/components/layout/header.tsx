// import React from "react";
import { Link } from "react-router-dom";
//@ts-ignore
import style from "./header.module.css";
function Header() {
  return (
    <header className={style.header}>
      <nav>
        <ul className={style.mainNav}>
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
        </ul>
      </nav>
    </header>
  );
}

export default Header;
