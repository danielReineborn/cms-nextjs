import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import styles from "../../../styles/AddProducts.module.css";
import { createProduct, publishOne } from "../../../lib/productlist";
import { getCategories } from "../../../lib/categories";
import axios from "axios";

export default function NewProduct({ cat }) {
  const { categories } = cat;
  const [prodData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    email: "",
    category: "",
    ownerToken: "",
    sold: false,
    currency: "SEK",
  });
  const [image, setImage] = useState(null);

  /*   const router = useRouter();

  useEffect(() => {}, [router.query]); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      ...prodData,
    };

    try {
      if (image) {
        const formData = new FormData();
        formData.append("fileUpload", image);
        const res = await axios.post(
          "https://api-eu-central-1.graphcms.com/v2/ckiyivyj84feq01xuf51he3ld/master/upload",
          formData
        );
        product.imageId = res.data.id;
        const imageRes = await publishOne("Asset", product.imageId);
      }
      console.log("efter bild");
      const { data } = await createProduct(product);
      console.log("efter createProduct");

      const id = data.createProduct.id;
      const publish = await publishOne("Product", id);
    } catch (err) {
      console.error({ error: err });
    }
  };

  const handleChange = (e) => {
    setProductData((prodData) => ({
      ...prodData,
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value,
    }));
    console.log(prodData);
  };

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <Layout>
      <main className={styles.view}>
        <div>
          <h3>Lägg till produkt:</h3>
          <p>
            Skriv in information om den vara du vill sälja nedan, fyll i fälten
            nedan.
          </p>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.text}>
            Titel:
            <br />
            <input
              value={prodData.title}
              className={styles.input}
              type="text"
              name="title"
              onChange={handleChange}
            />
          </label>
          <label className={styles.text}>
            Beskrivning av varan:
            <br />
            <textarea
              value={prodData.description}
              className={styles.textarea}
              name="description"
              cols="70"
              rows="10"
              onChange={handleChange}
            />
          </label>
          <label className={styles.text}>
            Pris:
            <br />
            <input
              value={prodData.price}
              className={styles.input}
              type="number"
              name="price"
              onChange={handleChange}
            />
          </label>
          <label className={styles.text}>
            Lägg till en bild:
            <br />
            <input className={styles.input} onChange={handleFile} type="file" />
          </label>
          <label className={styles.text}>
            Välj en kategori för din produkt:
            <br />
            <select
              value={prodData.category}
              name="category"
              className={styles.input}
              onChange={handleChange}
            >
              <option value="">Välj en kategori</option>
              {categories.map((cat) => {
                return (
                  <option value={cat.id} key={cat.id}>
                    {cat.label}
                  </option>
                );
              })}
            </select>
          </label>
          <label className={styles.text}>
            Ort där varan finns:
            <br />
            <input
              value={prodData.location}
              className={styles.input}
              type="text"
              name="location"
              onChange={handleChange}
            />
          </label>
          <label className={styles.text}>
            Säljarens mailadress:
            <br />
            <input
              value={prodData.email}
              className={styles.input}
              type="email"
              name="email"
              onChange={handleChange}
            />
          </label>
          <label className={styles.text}>
            Lösenord för att kunna ändra/ta bort din annons:
            <br />
            <input
              value={prodData.ownerToken}
              className={styles.input}
              type="password"
              name="ownerToken"
              onChange={handleChange}
            />
          </label>
          <button type="submit">Lägg till produkt</button>
        </form>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await getCategories();
  return {
    props: {
      cat: categories,
    },
  };
}
