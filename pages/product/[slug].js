import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "../../lib/query";
import { useRouter } from "next/router";
import {
  DetailsStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "../../styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { useEffect } from "react";
//Import Global State
import { useStateContext } from "../../lib/context";

export default function ProductDetails() {
  //Global State
  const { qty, increaseQty, decreaseQty, onAdd, setQty } = useStateContext();
  //Reset Quantity
  useEffect(() => {
    setQty(1);
  }, []);
  //Fetch Slug
  const { query } = useRouter();
  //Fetch graphQL data
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  //Check for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no ....{error.message}</p>;
  const products = data.products.data;
  //Extract data
  const { title, description, image } = data.products.data[0].attributes;
  //Create a toast
  const notify = () => {
    toast.success(`${title} added to the Basket`, {
      duration: 1500,
    });
  };
  return (
    <DetailsStyle>
      <img src={image.data.attributes.formats.small.url} alt={title} />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>

        <Quantity>
          <span>Quantity</span>
          <button>
            <AiFillMinusCircle onClick={decreaseQty} />
          </button>
          <p>{qty}</p>
          <button>
            <AiFillPlusCircle onClick={increaseQty} />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            notify();
            onAdd(data.products.data[0].attributes, qty);
          }}
        >
          Add to Cart
        </Buy>
      </ProductInfo>
    </DetailsStyle>
  );
}
