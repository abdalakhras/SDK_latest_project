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
       console.log(data.products)
      setProducts(data.products)
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
      <Button onClick={showProducts}>show products</Button>
      <h2>PRODUCTS : </h2>
      {Object.keys(products).map((categoryName)=>(
        <div key={categoryName}>
          <h3>{categoryName}</h3>
        <ul>
          {products[categoryName].map((item)=>(
            <li key={item._id}>{item.name} {item.price}</li>
          ))}      
        </ul>
        </div>     
      ))}
    </>
  );
}
export default Home;
