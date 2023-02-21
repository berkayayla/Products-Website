import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import Card from "@mui/material/Card";
import { blue } from "@mui/material/colors";
import { Button, Typography, CardContent, CardMedia } from "@mui/material";

const ProductDetail = () => {
  const color = blue[50];
   
  //Bir önceki sayfaya dönme butonu için useNavigate kullandık.
  const navigate = useNavigate();

 
  //Bir önceki productId değerini bu sayfada listelemesi için useParams kullandık.
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  //Ürünlerimizin idsini alıyoruz ve idsine göre ürünümüzü gösteriyoruz.
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [productId]);
 
  //Eğer product yoksa spinner dönsün.
  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <img
          style={{ backgroundColor: "white", width: "80px" }}
          src="/loading-spinner.gif"
          alt=""
        />
      </div>
    );
  }
  return (
    <div>
      <Container
        maxWidth="lg"
        sx={{
          marginTop: "50px",
          paddingBottom: "30px",
        }}
      >
        <Card
          id="card"
          sx={{
            backgroundColor: color,
            display: "flex",
          }}
        >
          <CardMedia
            sx={{ maxHeight: "500px", objectFit: "cover" }}
            component="img"
            image={product.thumbnail}
            alt={product.title}
          />
          <CardContent>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {product.title}
            </Typography>
            <Typography mt={1}>
              <b style={{ paddingRight: "5px" }}>Kategori:</b>
              {product.category}
            </Typography>
            <Typography mt={1}>
              <b style={{ paddingRight: "5px" }}>Ürün açıklaması:</b>
              {product.description}
            </Typography>
            <Typography mt={1}>
              <b style={{ paddingRight: "5px" }}>Marka:</b>
              {product.brand}
            </Typography>
            <Typography mt={1}>
              <b style={{ paddingRight: "5px" }}>Puan:</b>
              {product.rating}
            </Typography>
            <Typography mt={1}>
              <b style={{ paddingRight: "5px" }}>Fiyat:</b>
              {product.price}$
            </Typography>
          </CardContent>
        </Card>
        
        <Button
          onClick={() => navigate(-1)}
          sx={{ marginTop: "10px" }}
          variant="contained"
        >
          GERİ DÖN
        </Button>
      </Container>
    </div>
  );
};

export default ProductDetail;
