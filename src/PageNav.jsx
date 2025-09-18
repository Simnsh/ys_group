import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./PageNav.module.css";

function PageNav() {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // keep <html lang="..."> in sync for a11y/SEO
  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage || "en";
  }, [i18n.resolvedLanguage]);

  // Close menu when route changes or window resizes to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 769px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Close with ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Prevent body scroll when menu open (mobile)
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => (document.documentElement.style.overflow = "");
  }, [open]);

  const changeLang = (e) => i18n.changeLanguage(e.target.value);

  return (
    <nav className={styles.nav} aria-label="Main">
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} onClick={() => setOpen(false)}>
          <img
            className={styles.logo}
            src="/ys_rabbit_v2.svg"
            alt="YS Group logo"
          />
        </Link>

        <div className={styles.spacer} />

        {/* Desktop language selector */}
        <select
          aria-label={t("nav.language", { defaultValue: "Language" })}
          onChange={changeLang}
          value={i18n.resolvedLanguage || "en"}
          className={styles.langSelect}
        >
          <option value="en">English</option>
          <option value="ms">Bahasa Melayu</option>
          <option value="id">Bahasa Indonesia</option>
          <option value="zh">中文</option>
        </select>

        {/* Hamburger button (mobile) */}
        <button
          className={styles.hamburger}
          aria-label={
            open
              ? t("nav.closeMenu", { defaultValue: "Close menu" })
              : t("nav.openMenu", { defaultValue: "Open menu" })
          }
          aria-expanded={open}
          aria-controls="primary-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        {/* Links (desktop always visible; mobile collapsible) */}
        <ul
          id="primary-menu"
          className={`${styles.links} ${open ? styles.open : ""}`}
          onClick={() => setOpen(false)} /* tap a link -> close */
        >
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {t("nav.home")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {t("nav.products")}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {t("nav.contact")}
            </NavLink>
          </li>

          {/* Mobile language selector inside the menu (optional) */}

          <li
            className={styles.langItem}
            onClick={(e) =>
              e.stopPropagation()
            } /* don't close menu when changing language */
          >
            <label className="sr-only" htmlFor="lang-mobile">
              {t("nav.language", { defaultValue: "Language" })}
            </label>
            <select
              id="lang-mobile"
              onChange={changeLang}
              value={i18n.resolvedLanguage || "en"}
              className={styles.langSelectMobile}
            >
              <option value="en">English</option>
              <option value="ms">Bahasa Melayu</option>

              <option value="id">Bahasa Indonesia</option>
              <option value="zh">中文</option>
            </select>
          </li>
        </ul>
      </div>

      {/* Backdrop for mobile */}
      <div
        className={`${styles.backdrop} ${open ? styles.showBackdrop : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
    </nav>
  );
}

export default PageNav;
