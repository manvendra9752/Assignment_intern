import React, { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import { Container, Typography } from "@mui/material";
import { fetchCategories } from "./slices/categorySlice";
import { fetchProducts } from "./slices/productSlice";

function App() {
  const [resetSearchFlag, setResetSearchFlag] = useState(false);
  const dispatch = useDispatch();

  const resetSearch = () => {
    setResetSearchFlag(true);
    setTimeout(() => setResetSearchFlag(false), 0);
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingTop: "20px",
        paddingBottom: "20px",
        borderRadius: "15px",
        background:
          "linear-gradient(135deg, #f0f4ff, #f3e5f5, #ffe0e0, #e0f7fa, #f1f8e9)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
      }}
    >
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontFamily: "'Dancing Script', cursive",
          fontWeight: "bold",
          color: "#0056b3",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        Beautiful Product Explorer
      </Typography>
      <SearchBar onReset={resetSearchFlag} />
      <CategoryList resetSearch={resetSearch} />
      <ProductList />
    </Container>
  );
}

export default App;
