import Head from "next/head";
import Layout from "../../components/Layout";
import { getProductIds, getOneProduct } from "../../lib/productlist";
import styles from "../../styles/ProductDetail.module.css";
import { dateIsoToYearMonthDate } from "../../utils/index";

export default function Product({ data }) {
  const { product } = data;
  return (
    <Layout>
      <Head>
        <title>{product.title}</title>{" "}
      </Head>
      <main className={styles.view}>
        <div>
          <h3 className={styles.title}>{product.title}</h3>
          <p className={styles.text}>Kategori: {product.category.label}</p>
        </div>
        <div>
          <p className={styles.text}>
            Pris: {product.price}
            {product.currency}
          </p>
        </div>
        <div className={styles.container}>
          <div className={styles.divider}>
            <img
              className={styles.image}
              src={
                product.image.length > 0
                  ? product.image[0].url
                  : "/images/default.jpg"
              }
              alt="Produktbild"
            />
          </div>
          <div className={styles.divider}>
            <div className={styles.smallcontainer}>
              <p className={styles.smalltext}>Säljare: {product.email}</p>
              <p className={styles.smalltext}>Ort: {product.location}</p>
            </div>
            <div className={styles.flex}>
              <p className={styles.text}>{product.description}</p>
            </div>
            <div>
              <p className={styles.smalltext}>
                {dateIsoToYearMonthDate(product.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { products } = await getProductIds();
  const paths = products.map((prod) => {
    return {
      params: {
        id: prod.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const productData = await getOneProduct(params.id);
  return {
    props: {
      data: productData,
    },
  };
}
