import Link from "next/link";
import styles from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <main className={styles.view}>
      <header className={styles.header}>
        <p className={styles.logo}>
          <Link href={`/`}>Flocket</Link>
        </p>
      </header>
      <section className={styles.children}>{children}</section>
      <footer className={styles.footer}>
        <p className={styles.footertext}>Copyright Flocket 2021</p>
      </footer>
    </main>
  );
}
