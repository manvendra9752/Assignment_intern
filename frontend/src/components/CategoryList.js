import React, { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import { fetchProducts } from "../slices/productSlice";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledFormControl = styled(FormControl)({
  marginTop: "20px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ccc",
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      borderColor: "#6200ea",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6200ea",
    },
  },
});

const StyledSelect = styled(Select)({
  "&:hover": {
    backgroundColor: "lightpurple",
  },
});

const StyledMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

const StyledAlert = styled(Alert)({
  marginTop: "10px",
});
const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const categoryState = useSelector((state) => state.category);
  const { loading, categories, error } = categoryState;

  useEffect(() => {
    if (!categories || categories.length === 0) {
    }
  }, [dispatch, categories]);
  useEffect(() => {
    navigate("/");
  }, [navigate]);

  const params = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );

  const handleCategoryChange = useCallback(
    (event) => {
      const category = event.target.value;
      const params = queryString.parse(location.search);
      if (params.search) {
        console.log(params.search);
        delete params.search;
      }
      if (category === "") {
        delete params.category;
        delete params.page;
      } else {
        params.category = category;
        params.page = 1;

        dispatch(fetchProducts(params));
      }
      const newSearch = queryString.stringify(params);
      navigate(`?${newSearch}`);
    },
    [dispatch, navigate, location.search]
  );

  return (
    <StyledFormControl fullWidth variant="outlined">
      <InputLabel id="category-select-label">Category</InputLabel>
      {loading ? (
        <CircularProgress size={24} />
      ) : error ? (
        <StyledAlert severity="error">{error}</StyledAlert>
      ) : (
        <StyledSelect
          labelId="category-select-label"
          value={params.category || ""}
          onChange={handleCategoryChange}
          label="Category"
        >
          <StyledMenuItem value="">All Categories</StyledMenuItem>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((cat) => (
              <StyledMenuItem key={cat.slug} value={cat.slug}>
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </StyledMenuItem>
            ))
          ) : (
            <StyledMenuItem disabled>No Categories Available</StyledMenuItem>
          )}
        </StyledSelect>
      )}
    </StyledFormControl>
  );
};

export default CategoryList;
