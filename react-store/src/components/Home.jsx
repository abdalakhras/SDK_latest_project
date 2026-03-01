import React from "react";
import { ThemeContext } from "./Context/ThemeContext.jsx";
import { useContext } from "react";
import api from "../services/api.js";
import { useState,useEffect } from "react";
import Button from "@mui/material/Button";



function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [products,setProducts] = useState({})

  const showProducts = async ()=>{

    try {
      const {data} = await api.get('/products/getproductsbycategory')
      console.log(data)
      setProducts(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <h1 className={theme}>welcome to TRADER home page</h1>

      <p>this a home page</p>
      <button className={theme} onClick={toggleTheme}>
        change to {theme === "dark" ? "light" : "dark"} mode
      </button>
      <Button>show products</Button>
    </>
  );
}
export default Home;
