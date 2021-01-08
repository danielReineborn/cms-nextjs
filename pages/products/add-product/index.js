import React, { useState } from "react";
import Layout from "../../../components/Layout";
import styles from "../../../styles/AddProducts.module.css";
import { createProduct, publishOne } from "../../../lib/productlist";
import axios from "axios";

export default function NewProduct({}) {
  const [prodData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    email: "",
    category: "ckjii0mps171q0a00g554vnm9",
    ownerToken: "hemligKod",
    sold: false,
    currency: "SEK",
  });
  const [image, setImage] = useState(null);

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
      const { data } = await createProduct(product);
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
            <select
              value={prodData.category}
              name="category"
              className={styles.input}
              onChange={handleChange}
            >
              <option value="">Här behövs alla kategorier</option>
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
          <button type="submit">Lägg till product</button>
        </form>
      </main>
    </Layout>
  );
}
