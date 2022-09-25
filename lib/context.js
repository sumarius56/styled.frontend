import React, { createContext, useContext, useState } from "react";

//Global state

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  //Add our state
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //Increase product qty
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  //Decrease product qty
  const decreaseQty = () => {
    if (qty >= 2) {
      setQty((prevQty) => prevQty - 1);
    }
  };

  //Add product to cart
  const onAdd = (product, quantity) => {
    //Total Price
    setTotalPrice((prevTotal) => prevTotal + product.price * quantity);
    //Increase total quantity
    setTotalQuantities((prevQuantity) => prevQuantity + quantity);
    //Check if Product is already in the cart
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };

  //Remove Product
  const onRemove = (product) => {
    //Total Price
    setTotalPrice((prevTotal) => prevTotal - product.price);
    //Decrease total quantity
    setTotalQuantities((prevQuantity) => prevQuantity - 1);
    //Check if product exists
    const exist = cartItems.find((item) => item.slug === product.slug);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.slug !== product.slug));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalQuantities,
        totalPrice,
        setQty,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);