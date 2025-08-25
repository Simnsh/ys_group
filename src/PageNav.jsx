import { NavLink, Link } from "react-router-dom";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <img className={styles.logo} src="/logo.svg" alt="WorldWise logo" />
        </Link>

        <div className={styles.spacer} />
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PageNav;
