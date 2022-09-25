import { useRouter } from "next/router";
// Specify Stripe secret api key here
const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    // access the user session
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntents.data } };
  },
});

export default function Profile({ user, orders }) {
  const route = useRouter();

  return (
    user && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <div>
          {orders.map((order) => (
            <Order key={order.id}>
              <div>
                <h1>Order Number: {order.id}</h1>
                <h2>Amount: {formatMoney(order.amount)}</h2>
              </div>
              <div>
                <h1>Receipt Email: {user.email}</h1>
              </div>
            </Order>
          ))}
        </div>
        <Button onClick={() => route.push("/api/auth/logout")}>Log out</Button>
      </div>
    )
  );
}

const Order = styled.div`
  background: white;
  margin: 2rem 0rem;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  h1 {
    font-size: 1rem;
    color: var(--primary);
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 1rem;
    color: var(--secondary);
  }
`;

const Button = styled.div`
  font-size: 1.5rem;
  text-shadow: 1px 1px 2px black;
  letter-spacing: 4px;
  line-height: 1.6;
  color: #fff;
  cursor: pointer;
`;
