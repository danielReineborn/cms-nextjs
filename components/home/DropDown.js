import styles from "./ProductSearch.module.css";

export default function DropDown({ value, onChange, categories }) {
  return (
    <select
      name="category"
      value={value}
      onChange={onChange}
      className={styles.dropdown}
    >
      <option value="">Välj en kategori</option>
      {categories.map((cat) => {
        return (
          <option value={cat.label} key={cat.id}>
            {cat.label}
          </option>
        );
      })}
    </select>
  );
}
