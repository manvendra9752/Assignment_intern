import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { TextField, Button, Box } from "@mui/material";
import { fetchProducts } from "../slices/productSlice";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { search: query = "" } = queryString.parse(location.search) || "";

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const params = queryString.parse(location.search);
    if (!searchTerm) {
      delete params.search;
      delete params.page;
    }
    const newSearch = queryString.stringify(params);
    navigate(`?${newSearch}`);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = queryString.parse(location.search);
    console.log(params);
    if (params.category) {
      console.log(params.category);
      delete params.category;
    }

    if (searchTerm.trim() === "") {
      delete params.search;
      delete params.page;
    } else {
      params.search = searchTerm;
      params.page = 1;
      dispatch(fetchProducts(params));
    }
    const newSearch = queryString.stringify(params);
    navigate(`?${newSearch}`);
    setSearchTerm("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{ display: "flex", gap: 2, marginTop: 2 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        label="Search Products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ color: "voilet", padding: "10px 40px" }}
        disabled={searchTerm ? false : true}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
