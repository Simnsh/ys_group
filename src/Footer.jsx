import styles from "./Footer.module.css";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src="/ys_rabbit_v2.svg" alt="ScrubZy Logo" />
          <h2>Yik Seng Houseware Trading</h2>
        </div>

        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="/">{t("nav.home")}</a>
            </li>
            <li>
              <a href="/product">{t("nav.product")}</a>
            </li>
            <li>
              <a href="/contact">{t("nav.contact")}</a>
            </li>
          </ul>
        </nav>

        <div className={styles.info}>
          <p>© {new Date().getFullYear()} ScrubZy. All rights reserved.</p>
          <p>Made with ❤️ in Malaysia</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
