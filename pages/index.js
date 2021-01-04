import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import TextBloc from "../components/home/TextBloc";
import ProductSearch from "../components/home/ProductSearch";
import { getCategories } from "../lib/categories";

export default function Home({ data }) {
  console.log(data.categories);
  const { categories } = data;
  return (
    <Layout>
      <Head>
        <title>Flocket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.imageheader}>
        <div className={styles.largecontainer}>
          <ProductSearch categories={categories} />
        </div>
      </section>
      <div className={styles.container}>
        <TextBloc
          p1={`Flocket är en marknadsplats för nya och använda prylar. Hitta presenten eller inredningsdetaljen redan idag.`}
          title={`Marknadsplats`}
        />

        <TextBloc
          p1={`Låt dina gamla saker bli nya för någon annan.`}
          p2={`Testar att ha två stycken.`}
          title={`Produkter`}
        />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await getCategories();
  return {
    props: {
      data: categories,
    },
  };
}
