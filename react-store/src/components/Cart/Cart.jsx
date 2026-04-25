import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import Navbar from "../navbar/Navbar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

function Cart() {

  const navigate = useNavigate()


  const { cart, increaseItem, cleareCart, decreaseItem, clearItem } =
    useContext(CartContext);
  console.log(cart);

  return (
    <>
      <h1>welcome to cart page</h1>
      <Navbar />
      <br />
      <br />
      <Button
        onClick={() => {
          cleareCart();
        }}
      >
        clear Cart
      </Button>
      <Button onClick={()=>navigate('/products')}>back to products</Button>

      {cart?.items?.length === 0 && <Typography>your cart is empty</Typography>}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cart?.items?.map((itm) => (
            <Grid size={{ xs: 6, md: 3 }} key={itm._id}>
              <Item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={itm.productId.img}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {itm.productId.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {itm.productId.discription}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      quantity : {itm.quantity}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      price : {itm.productId.price}$
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        console.log(itm.productId._id);
                        increaseItem(itm.productId._id);
                      }}
                    >
                      <AddIcon></AddIcon>
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        decreaseItem(itm.productId._id);
                      }}
                    >
                      <RemoveIcon></RemoveIcon>
                    </Button>
                    <Button
                      size="small"
                      onClick={() => {
                        clearItem(itm.productId._id);
                      }}
                    >
                      <DeleteForeverIcon></DeleteForeverIcon>
                    </Button>
                  </CardActions>
                </Card>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Cart;
