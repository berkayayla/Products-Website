import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Button } from "@mui/material";
import Container from "@mui/material/Container";
import { blue } from "@mui/material/colors";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";
import _ from "lodash";

const ProductList = () => {
  const color = blue[50];
  //Productsları usestate ile çekiyoruz ve buna useState içinde array değer verdik.
  const [products, setProducts] = useState([]);
  //Pagesleri usestate ile hallediyoruz içine 1 değerini verdik 1.sayfadan başlaması için.
  const [page, setPage] = useState(1);
  //Her sayfada 15 adet ürün listelenmesi için pageSize değerine 15 verdik.
  const pageSize = 15;

  //Verilerimizin bulunduğu linke url değeri verdik. 
  const URL = "https://dummyjson.com/products";
  
  //Burada yukarıda belirttiğimiz urldeki ürünlerimizi çektik.
  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => { console.log(data.products)
        setProducts(data.products);
      });
  }, []);
  //Sayfanın en yukarıdan başlaması için scrollTo kullandık.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  //Burada her sayfada ürünlerimizin listelenmesini sağladık.
  const paginatedProducts = _.chunk(products, pageSize)[page - 1] || [];

  const handleChange = (event, value) => {
    setPage(value);
  };
  
  //Burada paginatedProductsın içindeki productsları producta çevirip ürünlerin tek tek listelenmesini sağladık.
  //React-Router Dom'ın "link" özelliği ile ürünlerin id'sine göre detay sayfasına gitmesini sağladık.

  return ( 
    <div style={{ width: "100%", paddingTop: "20px", paddingBottom: "20px" }}>
      <Typography sx={{ textAlign: "center" }} variant="h4">
        ÜRÜNLER
      </Typography>
      <Container
        sx={{
          display: "flex",
          margin: "0 auto",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      > 
        {paginatedProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              width: 350,
              borderRadius: "5px",
              margin: "15px",
              border: "1px solid",
              borderColor: color,
              backgroundColor: color,
            }}
          >
            <Link to={`/products/${product.id}`}>
              <CardMedia
                component="img"
                sx={{
                  width: "100",
                  height: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                }}
                image={product.thumbnail}
                alt={product.title}
              />
            </Link>
            <CardContent>
              <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                {product.title}
              </Typography>
              <Typography>Marka: {product.brand}</Typography>
              <Typography sx={{ paddingBottom: "8px" }}>
                Fiyat: {product.price}$
              </Typography>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                  borderRadius: "5px",
                }}
                to={`/products/${product.id}`}
              >
                <Button variant="contained">İncele</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </Container>
      <div
        style={{
          width: "170px",
          display: "flex",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <Pagination
          style={{
            textAlign: "center",
          }}
          count={2}
          page={page}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ProductList;
