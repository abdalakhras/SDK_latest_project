import React from "react";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";


function Cart(){

    const {cart} = useContext(CartContext)
    console.log(cart)

    return(
        <>
        <h1>welcome to cart page</h1>
        <div>
        {cart?.items?.map((item)=>{
            return(
            <ul key={item._id}>
                <li>{item.productId.name}</li>
                {/* something wrong with the category  */}
                <li>{item.productId.category}</li> 
                 <li>{item.productId.price}</li>
                   <li>{item.quantity}</li>

            </ul>
            )
        })}
        </div>
        </>
    )

}

export default Cart