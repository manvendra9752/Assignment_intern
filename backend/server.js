const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Proxy to fetch categories
app.get("/api/categories", async (req, res) => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products/categories"
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
});

app.get("/api/products", async (req, res) => {
  const { category, limit, skip, search } = req.query;
  let url = "https://dummyjson.com/products/search";

  if (category) {
    url = `https://dummyjson.com/products/category/${encodeURIComponent(
      category
    )}`;
  }

  const params = {};
  if (limit) params.limit = limit;
  if (skip) params.skip = skip;
  if (search) params.q = search;
  try {
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
