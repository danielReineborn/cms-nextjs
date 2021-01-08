import React from "react";
import StandardButton from "./StandardButton";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";

export default function AddProduct({}) {
  const router = useRouter();
  const route = () => {
    router.push("/products/add-product");
  };
  return (
    <div className={styles.imageheadersmallcontainer}>
      <p className={styles.text}>Har du något att sälja?</p>
      <StandardButton
        action={route}
        classname={styles.addproduct}
        text="Lägg till vara"
      />
    </div>
  );
}
