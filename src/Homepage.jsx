import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Homepage.module.css";
import { Helmet } from "react-helmet-async";

function Homepage() {
  const { t } = useTranslation("home");

  const featuredProducts = [
    { id: "yellow-net", src: "/beauty_yellow_net.jpg" },
    { id: "green-net", src: "/beauty_green_net.jpg" },
  ];

  const [currImg, setCurrImg] = useState(0);
  const slideCount = featuredProducts.length;

  const goToNext = () => setCurrImg((i) => (i + 1) % slideCount);
  const goToPrev = () => setCurrImg((i) => (i - 1 + slideCount) % slideCount);
  const goToIndex = (i) => setCurrImg(i);

  useEffect(() => {
    const tId = setInterval(goToNext, 5000);
    return () => clearInterval(tId);
  }, []);

  const touchStartX = useRef(null);
  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchMove = (e) => {
    if (touchStartX.current == null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 60) {
      dx < 0 ? goToNext() : goToPrev();
      touchStartX.current = null;
    }
  };

  // localized list items
  const whyItems = t("why.items", { returnObjects: true });

  return (
    <>
      <Helmet>
        <title>{t("seo.title")}</title>
        <meta name="description" content={t("seo.description")} />
        <link rel="canonical" href="https://yiksenghousewaretrading.com/" />
      </Helmet>

      <main>
        {/* Section 1 */}
        <section className={styles.section}>
          <div className={`${styles.band} ${styles.heroBand}`}>
            <div className={styles.container}>
              <h1 className={styles.title}>{t("hero.h1")}</h1>
              <h2 className={styles.subtitle}>{t("hero.sub")}</h2>
              <p className={styles.copy}>{t("hero.copy")}</p>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className={styles.section}>
          <div className={`${styles.band} ${styles.whyBand}`}>
            <div className={styles.container}>
              <h3 className={styles.heading}>{t("why.heading")}</h3>
              <ul className={styles.list}>
                {whyItems.map((txt, i) => (
                  <li key={i}>{txt}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3 – Featured Products (Carousel) */}
        <section className={styles.section}>
          <div className={`${styles.band} ${styles.featureBand}`}>
            <div className={styles.container}>
              <h3 className={styles.heading}>{t("featured.heading")}</h3>

              <div
                className={styles.carousel}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") goToPrev();
                  if (e.key === "ArrowRight") goToNext();
                }}
                aria-roledescription="carousel"
                aria-label={t("featured.aria.carousel")}
              >
                <div
                  className={styles.track}
                  style={{ transform: `translateX(-${currImg * 100}%)` }}
                >
                  {featuredProducts.map((p) => (
                    <div
                      className={styles.slide}
                      key={p.id}
                      role="group"
                      aria-roledescription="slide"
                    >
                      <img
                        className={styles.slideImg}
                        src={p.src}
                        alt={t(`featured.items.${p.id}.alt`)}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>

                <button
                  className={`${styles.arrow} ${styles.left}`}
                  onClick={goToPrev}
                  aria-label={t("carousel.prev")}
                >
                  ‹
                </button>
                <button
                  className={`${styles.arrow} ${styles.right}`}
                  onClick={goToNext}
                  aria-label={t("carousel.next")}
                >
                  ›
                </button>

                <div
                  className={styles.dots}
                  role="tablist"
                  aria-label={t("carousel.pagination")}
                >
                  {featuredProducts.map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${
                        i === currImg ? styles.activeDot : ""
                      }`}
                      onClick={() => goToIndex(i)}
                      aria-label={t("carousel.goTo", { n: i + 1 })}
                      aria-selected={i === currImg}
                      role="tab"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Homepage;
