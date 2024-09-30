import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://assignment-internship-1.onrender.com/api/products",
        {
          params,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const resetProducts = createAsyncThunk(
  "product/resetProducts",
  async () => {
    return [];
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    products: [],
    total: 0,
    skip: 0,
    limit: 10,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.skip = action.payload.skip;
        state.limit = action.payload.limit;
        state.error = "";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.total = 0;
        state.skip = 0;
        state.limit = 10;
        state.error = action.payload || "Failed to fetch products";
      })
      .addCase(resetProducts.fulfilled, (state, action) => {
        state.products = [];
        state.total = 0;
        state.skip = 0;
        state.limit = 10;
        state.error = "";
      });
  },
});

export default productSlice.reducer;
