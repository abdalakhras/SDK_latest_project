import { useContext, createContext, useState, useEffect } from "react";
import api from "../../services/api";
import toast from "react-hot-toast"


export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    const res = await api.get("/cart/getcart");
    setCart(res.data.cart);
    console.log(res.data);
  };
  const addToCart = async (productsId) => {
    try {
      const res = await api.post("/cart/addtocart", { productsId });
      setCart(res.data.cart);
      console.log(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const increaseItem = async (productsId) => {
    try {
      const res = await api.put("/cart/increasequantity", { productsId });
      console.log(res.data)
      setCart(res.data.updatedCart);
      fetchCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  const cleareCart = async () => {
    
    try {
      const res = await api.delete('/cart/deletCart')
      console.log(res.data)
      setCart(res.data.deletedCart)
      fetchCart()
      toast.success("cart has been emptied")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <CartContext.Provider value={{ cart, setCart, addToCart, increaseItem,cleareCart }}>
        {children}
      </CartContext.Provider>
    </>
  );
}
