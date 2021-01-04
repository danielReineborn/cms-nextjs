import styles from "./ListItem.module.css";

export default function ListItem({ product }) {
  return (
    <section className={styles.listitem}>
      <div className={styles.imgcontainer}>
        <img
          className={styles.listimg}
          src={product.img}
          alt={`Nice product`}
        />
      </div>
      <div className={styles.infocontainer}>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.text}>{product.description}</p>
        <div className={styles.smallcontainer}>
          <p className={styles.text}></p>
        </div>
      </div>
    </section>
  );
}
