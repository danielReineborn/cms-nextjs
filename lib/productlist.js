import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.URL,
  cache: new InMemoryCache(),
});

export async function getProductIds() {
  const { data } = await client.query({
    query: gql`
      query getProducts {
        products {
          id
        }
      }
    `,
  });
  return data;
}

export async function getOneProduct(id) {
  const { data } = await client.query({
    query: gql`
      query getOneProduct {
        product(where: { id: "${id}" }) {
          id
          title
          createdAt
          email
          description
    			location
    			price
    			currency
          image {
            url
          }
    			category {
            label
          }
        }
      }
    `,
  });
  return data;
}

export async function getLandingPage() {
  const { data } = await client.query({
    query: gql`
      query getLandingPage {
        landingpages {
          id
          siteDescription
          product {
            id
            title
            createdAt
            email
            description
            image {
              url
            }
          }
        }
      }
    `,
  });
  return data;
}

export async function createProduct(data) {
  const res = await client.mutate({
    mutation: gql`
    mutation createProduct {
      createProduct(data: {title: "${data.title}", email: "${data.email}", sold: ${data.sold} ownerToken: "${data.ownerToken}",image: {connect: {id: "${data.imageId}"}}, location: "${data.location}", category: {connect: {id: "${data.category}"}}, description: "${data.description}", price: ${data.price}}) {
        id
        title
        sold
      }
    }
    `,
  });
  return res;
}

export async function publishOne(type, id) {
  const res = await client.mutate({
    mutation: gql`
    mutation publishOne {
      publish${type}(where: {id: "${id}"}, to: PUBLISHED) {
        id
      }
    }
  `,
  });

  return res;
}
