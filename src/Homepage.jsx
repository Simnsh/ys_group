import styles from "./Homepage.module.css";

function Homepage() {
  return (
    <main>
      {/* Section 1 */}
      <section className={styles.section}>
        <div className={`${styles.band} ${styles.heroBand}`}>
          <div className={styles.container}>
            <h1 className={styles.title}>YS_Group</h1>
            <h2 className={styles.subtitle}>WHO WE ARE</h2>
            <p className={styles.copy}>
              We have focused on providing the best cleaning net for your daily
              use in Malaysia for over 20 years.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className={styles.section}>
        <div className={`${styles.band} ${styles.whyBand}`}>
          <div className={styles.container}>
            <h3 className={styles.heading}>WHY USE Yik Seng's CLEANING NET?</h3>
            <ul className={styles.list}>
              <li>Malaysia Best Selling cleansing net</li>
              <li>Removes up to 99% of grease and food residue*</li>
              <li>Helps clean grills, greasy stains, and air fryers</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Homepage;
