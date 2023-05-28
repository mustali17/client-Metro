import React, { useEffect } from "react";
import { useState, createContext } from "react";

const UserContext = createContext();

function UserContextProvider(props) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAdd = async (product) => {
    try {
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }

      setCart(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDel = async (product) => {
    try {
      const updatedCart = [...cart];
      const existingItemIndex = updatedCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        if (updatedCart[existingItemIndex].quantity > 1) {
          updatedCart[existingItemIndex].quantity -= 1;
        } else {
          updatedCart.splice(existingItemIndex, 1);
        }
      }

      setCart(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const updatedCart = cart.map((item) => {
        if (item._id === productId) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });

      setCart(updatedCart);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        cart,
        handleAdd,
        handleDel,
        handleQuantityChange,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
