import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export async function getCategories() {
  const client = new ApolloClient({
    uri:
      "https://api-eu-central-1.graphcms.com/v2/ckiyivyj84feq01xuf51he3ld/master",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getCategories {
        categories {
          id
          label
        }
      }
    `,
  });

  return data;
}
