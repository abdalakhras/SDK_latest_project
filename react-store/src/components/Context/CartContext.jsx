import { useContext, createContext, useState, useEffect } from "react";
import api from "../../services/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await api.get("/cart/getcart");
    setCart(res.data.cart);
  };
  const addToCart = async (productsId) => {
    try {
      const res = await api.post("/cart/addtocart", productsId);
      setCart(res.data.cart);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <CartContext.Provider value={{ cart, setCart, addToCart }}>
        {children}
      </CartContext.Provider>
    </>
  );
};
