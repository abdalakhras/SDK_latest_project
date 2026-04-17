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
import Navbar from "../navbar/Navbar";
import { useContext } from "react";
import { CartContext } from "../Context/cartContext";


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

export default function ProductsCard() {

const {addToCart,cart} = useContext(CartContext)

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/getproducts");
      console.log(res.data);
      setProducts(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
    <Navbar/>
    <br />
    <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {products?.map((product) => (
            <Grid size={{ xs: 6, md: 3 }} key={product._id}>
              <Item>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={product.img}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {product.discription}
                    </Typography>
                    {/* <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {product.category}
                    </Typography> */}
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" 
                    onClick={()=>{
                      // addToCart(product._id)
                      console.log(product._id)
                    }}
                    >addToCart</Button>
                    {/* <Button size="small">Learn More</Button> */}
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
