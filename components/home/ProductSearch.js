import styles from "./ProductSearch.module.css";
import DropDown from "./DropDown";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ProductSearch({ categories }) {
  const [search, setSearch] = useState({ category: "", product: "" });
  const router = useRouter();
  const handleChange = (e) => {
    setSearch((search) => ({
      ...search,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(
      `/products?category=${search.category}&title=${search.product}`
    );
  };
  return (
    <div className={styles.view}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <div className={styles.divider}>
            <label className={styles.text}>
              Sök:
              <input
                name="product"
                value={search.product}
                onChange={handleChange}
                className={styles.input}
                type="text"
                placeholder="Sök produkt"
              />
            </label>
          </div>
          <div className={styles.divider}>
            <p className={styles.text}>Kategori:</p>
            <DropDown
              value={search.category}
              onChange={handleChange}
              categories={categories}
            />
          </div>
        </div>
        <button className={styles.submit} type="submit">
          Hitta varor
        </button>
      </form>
    </div>
  );
}
