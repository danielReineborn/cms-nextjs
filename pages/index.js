import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import TextBloc from "../components/home/TextBloc";
import ProductSearch from "../components/home/ProductSearch";
import ListItem from "../components/products/ListItem";
import { getCategories } from "../lib/categories";
import { getLandingPage } from "../lib/productlist";
import AddProduct from "../components/home/AddProduct";

export default function Home({ cat, lp }) {
  const { categories } = cat;
  const landingpage = lp.landingpages[0];

  return (
    <Layout>
      <Head>
        <title>Flocket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.imageheader}>
        <div className={styles.largecontainer}>
          <ProductSearch categories={categories} />
          <AddProduct />
        </div>
      </section>
      <div className={styles.container}>
        <TextBloc p1={landingpage.siteDescription} title={`Marknadsplats`} />

        <ListItem product={landingpage.product} />
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
  const landingPage = await getLandingPage();
  return {
    props: {
      cat: categories,
      lp: landingPage,
    },
  };
}
