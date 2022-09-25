import Head from "next/head";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "../lib/query";
import Product from "../components/Product";
import { Gallery } from "../styles/Gallery";

export default function Home() {
  //Fetch products from strapi backend server
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;
  //Check for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no ....{error.message}</p>;
  const products = data.products.data;
  return (
    <div>
      <Head>
        <title>Styled.</title>
        <meta name="description" content="by Suciu Marius" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Gallery>
          {products.map((product) => (
            <Product
              key={Math.random() * Math.random() + 2}
              product={product}
            />
          ))}
        </Gallery>
      </main>

      <footer></footer>
    </div>
  );
}
