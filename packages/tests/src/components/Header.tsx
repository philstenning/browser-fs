// import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="main-nav">
          <li className="main-nav__item">
            <Link className="main-nav__link" to="/">
              Home
            </Link>
          </li>
          <li className="main-nav__item">
            <Link className="main-nav__link" to="/about">
              About
            </Link>
          </li>
          <li className="main-nav__item">
            <Link className="main-nav__link" to="/contact">
              Contact
            </Link>
          </li>
          <li className="main-nav__item">
            <Link className="main-nav__link" to="/db">
              Database
            </Link>
          </li>
          <li className="main-nav__item">
            <Link className="main-nav__link" to="/provider">
              DbProvider
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
