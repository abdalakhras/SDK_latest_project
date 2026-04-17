import { useContext, createContext, useState, useEffect } from "react";
import api from "../../services/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await api.get("/cart/getcart");
    setCart(res.data.cart);
  };
  const addToCart = async (productId) => {
    try {
      const res = await api.post("/cart/addtocart", { productId });
      setCart(res.data.cart);
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
