import Head from "next/head";
import Layout from "../../components/Layout";
import { getProductIds, getOneProduct } from "../../lib/productlist";

export default function Product({ data }) {
  const { product } = data;
  return (
    <Layout>
      <Head>
        <title>{product.title}</title>{" "}
        {/* add product name for this product. */}
      </Head>
      <p>{product.description}</p>
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
  console.log("prod: ", products, "paths: ", paths);
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
