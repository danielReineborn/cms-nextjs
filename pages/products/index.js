import React from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import ListItem from "../../components/products/ListItem";
import { getProductList } from "../../lib/productlist";
import styles from "../../styles/ProductList.module.css";

export default function Products({ productList }) {
  const { products } = productList;
  return (
    <Layout>
      <Head>
        <title>Produktsökning</title>
      </Head>
      <main className={styles.view}>
        <p className={styles.title}>Varor som matchar din sökning:</p>
        <section>
          {products.map((prod) => {
            return <ListItem product={prod} />;
          })}
        </section>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // 1. hämta querystring,
  // 2. söka efter produkter baserat på category / title
  const { query } = context;
  const productList = await getProductList(query);

  return {
    props: {
      productList,
    },
  };
}
