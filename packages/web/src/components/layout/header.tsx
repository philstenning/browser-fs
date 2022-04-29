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
          {/* <li className={style.mainNav__item}>
            <Link className={style.mainNav__link} to="/about">
              About
            </Link>
          </li> */}
          {/* <li className={style.mainNav__link}>
            <Link className={style.mainNav__link} to="/contact">
              Contact
            </Link>
          </li> */}
          {/* <li className={style.mainNav__link}>
            <Link className={style.mainNav__link} to="/db">
              Database
            </Link>
          </li> */}
          <li className={style.mainNav__link}>
            <Link
              className={style.mainNav__link}
              to="/provider"
              data-test-cy="TestPageLink"
            >
              Test View
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
