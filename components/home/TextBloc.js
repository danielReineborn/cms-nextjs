import styles from "./TextBloc.module.css";

export default function TextBloc({ p1 = null, p2 = null, title = null }) {
  return (
    <div className={styles.bloc}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.paragraph}>{p1}</p>
      <p className={styles.paragraph}>{p2}</p>
    </div>
  );
}
