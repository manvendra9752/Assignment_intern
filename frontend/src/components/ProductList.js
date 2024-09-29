import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";

const ProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const productState = useSelector((state) => state.product);
  const { loading, products, error } = productState;
  const total = products.length;

  const { page = 1, search = "" } = queryString.parse(location.search);
  const currentPage = Number(page);

  // Set the product limit to 10 per page
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  useEffect(() => {
    if (currentPage < 1) {
      navigate(`?page=1`);
    }
  }, [currentPage, navigate]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      const params = {
        ...queryString.parse(location.search),
        page: newPage,
      };
      navigate(`?${queryString.stringify(params)}`);
    }
  };

  // Define colors for card backgrounds
  const cardColors = [
    "#f0f4ff", // Light blue
    "#f3e5f5", // Light violet
    "#ffe0e0", // Light red
    "#e0f7fa", // Light teal
    "#f1f8e9", // Light green
    "#fff3e0", // Light orange
    "#e0e0e0", // Light grey
  ];

  return (
    <div style={{ marginTop: "20px", padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Products
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : products.length === 0 ? (
        <Alert severity="info">No products found.</Alert>
      ) : (
        <>
          <Grid container spacing={4}>
            {products.slice(startIndex, endIndex).map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <Card
                  sx={{
                    height: "100%",
                    backgroundColor: cardColors[index % cardColors.length],
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    sx={{ boxShadow: "2px 1px 2px lightpurple" }}
                    image={product.thumbnail}
                    alt={product.title}
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100px",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography gutterBottom variant="h6" component="div">
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${product.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              sx={{
                marginRight: "10px",
                transition: "background-color 0.3s, box-shadow 0.3s",
                "&:hover": {
                  backgroundColor: "#0056b3",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              sx={{
                transition: "background-color 0.3s, box-shadow 0.3s",
                "&:hover": {
                  backgroundColor: "#0056b3",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              Next
            </Button>
          </Box>
          <Typography
            style={{
              marginTop: "10px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Showing page {currentPage} of {totalPages}
          </Typography>
        </>
      )}
    </div>
  );
};

export default ProductList;
