import styles from "./Product.module.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function Product() {
  const { t } = useTranslation("product");

  // core product list (language-neutral metadata)
  const products = [
    { id: "round-net", images: [{ src: "/brown_small_net.jpeg" }] },
    {
      id: "sponge-net",
      images: [
        { src: "/blue_sponge_net.jpeg" },
        { src: "/yellow_sponge_net.jpeg" },
        { src: "/yellow_sponge_in_packg.jpeg" },
      ],
    },
    {
      id: "square-net",
      images: [
        { src: "https://picsum.photos/id/12/200/300" },
        { src: "https://picsum.photos/id/13/200/300" },
        { src: "https://picsum.photos/id/14/200/300" },
      ],
    },
  ];

  // track current image index per product
  const [currImage, setCurrImage] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 0;
      return acc;
    }, {})
  );

  const goToNext = (productId, total) =>
    setCurrImage((s) => ({
      ...s,
      [productId]: Math.min(s[productId] + 1, total - 1),
    }));

  const goToPrevious = (productId) =>
    setCurrImage((s) => ({ ...s, [productId]: Math.max(s[productId] - 1, 0) }));

  const goToImage = (productId, index) =>
    setCurrImage((s) => ({ ...s, [productId]: index }));

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header Section (translated) */}
        <div className={styles.header}>
          <h1 className={styles.title}>{t("header.title")}</h1>
          <p className={styles.subtitle}>{t("header.subtitle")}</p>
        </div>

        <ul className={styles.productGrid}>
          {products.map((product) => {
            const currentIndex = currImage[product.id];
            const images = product.images;
            // fetch per-product translations from product.json
            const title = t(`products.${product.id}.title`);
            const description = t(`products.${product.id}.description`);
            const overlayText = t(`products.${product.id}.overlayText`);
            const features = t(`products.${product.id}.features`, {
              returnObjects: true,
            }); // array
            const imageAlts = t(`products.${product.id}.images`, {
              returnObjects: true,
            }); // array of alt strings

            return (
              <li key={product.id} className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <img
                    src={images[currentIndex].src}
                    alt={imageAlts?.[currentIndex] ?? title}
                    className={styles.productImage}
                  />

                  {images.length > 1 && (
                    <>
                      <button
                        className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
                        onClick={() => goToPrevious(product.id)}
                        aria-label={t("carousel.prev")}
                      >
                        &#8249;
                      </button>
                      <button
                        className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
                        onClick={() => goToNext(product.id, images.length)}
                        aria-label={t("carousel.next")}
                      >
                        &#8250;
                      </button>
                    </>
                  )}

                  {images.length > 1 && (
                    <div className={styles.carouselIndicators}>
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`${styles.carouselDot} ${
                            index === currentIndex
                              ? styles.carouselDotActive
                              : ""
                          }`}
                          onClick={() => goToImage(product.id, index)}
                          aria-label={t("carousel.goTo", { n: index + 1 })}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.productTitle}>{title}</h3>
                  <p className={styles.productDescription}>{description}</p>
                  <ul className={styles.productFeatures}>
                    {features.map((f, i) => (
                      <li key={i} className={styles.feature}>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Sizes - localized */}
        <div className={styles.sizesSection}>
          <h2 className={styles.sizesTitle}>{t("sizes.title")}</h2>
          <div className={styles.sizesGrid}>
            {t("sizes.items", { returnObjects: true }).map((size, idx) => (
              <div className={styles.sizeCard} key={idx}>
                <h3 className={styles.sizeType}>{size.name}</h3>
                <p className={styles.sizeDimensions}>{size.dimensions}</p>
                <p className={styles.sizeNote}>{size.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;
