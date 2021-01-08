import Link from "next/link";
import styles from "./ListItem.module.css";
import { shortText, dateIsoToYearMonthDate } from "../../utils/index";

export default function ListItem({ product }) {
  return (
    <section className={styles.listitem}>
      <div className={styles.imgcontainer}>
        <img
          className={styles.listimg}
          src={product.image[0].url}
          alt={`Nice product`}
        />
      </div>
      <div className={styles.infocontainer}>
        <div className={styles.divider}>
          <p className={styles.title}>
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </p>
          <p className={styles.text}>{shortText(product.description, 150)}</p>
        </div>
        <div className={styles.smallcontainer}>
          <p className={styles.text}>{product.email}</p>
          <p className={styles.text}>
            {dateIsoToYearMonthDate(product.createdAt)}
          </p>
        </div>
      </div>
    </section>
  );
}
